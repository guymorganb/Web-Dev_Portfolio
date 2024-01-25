import React, { useState, useEffect, useReducer, forwardRef } from "react";
import { Stack, Flex, Grid, Select, HStack, Text, Box, Image, Checkbox } from '@chakra-ui/react' 
// import the context hook
import { useUserPreferenceContext } from './userContext'
import {reducer} from './reducers'
import {ADD_EXPERIENCE, ADD_MASSAGE_TYPE, ADD_INTENSITY, ADD_LOOKING_FOR, ADD_WHERESYOUR_PAIN} from './actions'
import { useLazyQuery } from '@apollo/client';
import {GET_SERVICES} from '../../utils/queries.jsx'
import { get, set } from 'idb-keyval';
import { transformData } from '../../utils/transformData.jsx'

export const MassageSelector = React.forwardRef(({ setTitle }, ref) => {
// const { loading, error, data } = useQuery(GET_SERVICES); // fetches data when component mounts
const [getServices, { loading, error, data }] = useLazyQuery(GET_SERVICES);
const [allServices, setAllServices] = useState([]); 
const [checkedOption, setCheckedOption] = useState(null);
const [selectedOptions, setSelectedOptions] = useState([]);

React.useEffect(() => {
    const fetchData = async () => {
        const storedServices = await get('servicesData');
        const lastFetchTime = await get('lastFetchTime');
        const currentTime = new Date().getTime();
// (currentTime - lastFetchTime <= 1 * 60 * 60 * 1000)
        if (storedServices && lastFetchTime && (currentTime - lastFetchTime <= 10 * 1000)) {
            // Data exists in IndexedDB and is less than an hour old
            setAllServices(storedServices);
        } else {
            getServices() // the call to GraphQL backend through lazyQuery
        }
    };
    fetchData();
}, []);

React.useEffect(() => {
    const fetchLastTime = async () => {
        if (data && data.services) {
            const transformedData = transformData(data.services);
            setAllServices(transformedData); // Update state with transformed data
            set('servicesData', transformedData); // Update IndexedDB with transformed data
            const currentTime = new Date().getTime();
            set('lastFetchTime', currentTime); // Update fetch time in IndexedDB
            const lastFetchTime = await get('lastFetchTime');
            console.log("Last Fetch Time:", lastFetchTime);
        }
    }
    fetchLastTime();
}, [data]);


console.log(allServices);
const initialState = useUserPreferenceContext();

// setting up the use reducer hook
const [state, dispatch] = useReducer(reducer, initialState);


// use effect dependency array is being used to call getRecomendations()
    useEffect(()=>{
        getRecommendations();
        getTitle();
    },[state])

    
    // function logic handling the changed state of the select box
    const getRecommendations = () => {
        console.log(state)
        // declare an array to push massageOption to
        let recommendedMassages = [];
        // get the value of the select box
        const experience = state.experience;
        const intensity = state.intensity
        const lookingFor = state.lookingFor
        const pain = state.wheresYourPain
        
      
        
        if (experience === 'No') { // No previous experience
            // ensure the array is empty
            recommendedMassages = [];
            // push to the array
            recommendedMassages.push(allServices[0]); // Swedish massage
            
            // set the state from the array contents
            setSelectedOptions(recommendedMassages);
        } 
        if (intensity === "Soft" && experience === 'No') { 
            recommendedMassages = [];
            recommendedMassages.push(allServices[0]); // Swedish massage
            recommendedMassages.push(allServices[4]); // Hot stones
        
            setSelectedOptions(recommendedMassages);
        }
        if (intensity === "Medium" && experience === 'No') { 
            recommendedMassages = [];
            recommendedMassages.push(allServices[0]); // Swedish massage
            recommendedMassages.push(allServices[1]); // Sports massage
            recommendedMassages.push(allServices[4]); // Hot stones
         
            setSelectedOptions(recommendedMassages);
        }     
        if (intensity === "Hard" && experience === 'No') { 
            recommendedMassages = [];
            recommendedMassages.push(allServices[1]); // Sports massage
            recommendedMassages.push(allServices[2]); // Deep Tissue
            recommendedMassages.push(allServices[3]); // Cupping
        
            setSelectedOptions(recommendedMassages);
        }
        if(experience === "Yes"){
            recommendedMassages = [];
            recommendedMassages.push(allServices[0]); // Swedish massage
            recommendedMassages.push(allServices[1]); // Sports massage
            recommendedMassages.push(allServices[4]); // Hot stones
            if(allServices.length >= 4){
                for(let i = 5; i < allServices.length; i++){ // added massages
                    recommendedMassages.push(allServices[i]);
                }
            }
         
            setSelectedOptions(recommendedMassages);
        }
        if(intensity === "Soft" && experience === "Yes"){
            recommendedMassages = [];
            recommendedMassages.push(allServices[0]); // Swedish massage
            recommendedMassages.push(allServices[1]); // Sports massage
         
            setSelectedOptions(recommendedMassages);
        }
        if(intensity === "Medium" && experience === "Yes"){
            recommendedMassages = [];
            recommendedMassages.push(allServices[0]); // Swedish massage
            recommendedMassages.push(allServices[1]); // Sports massage
            recommendedMassages.push(allServices[3]); // Cupping
       
            setSelectedOptions(recommendedMassages);
        }
        if(intensity === "Hard" && experience === "Yes"){
            recommendedMassages = [];
            recommendedMassages.push(allServices[1]); // Sports massage
            recommendedMassages.push(allServices[2]); // Deep Tissue
            recommendedMassages.push(allServices[3]); // Cupping
            recommendedMassages.push(allServices[4]); // Hot stones
          
            setSelectedOptions(recommendedMassages);
        }
        
    }
    // the function call on change of the select box
    const handleChange = (event) => {
        
        if(event.target.name == 'experience'){
            dispatch({ type: ADD_EXPERIENCE, payload: event.target.value})
            // setUserPreference(prev => ({
            //     ...prev, 
            //     experience: event.target.value
            // }));
        }
        if(event.target.name == 'intensity'){
            dispatch({ type: ADD_INTENSITY, payload: event.target.value})
            // setUserPreference(prev => ({
            //     ...prev, 
            //     intensity: event.target.value
            // }));
        }
        if(event.target.name == 'lookingFor'){
            dispatch({ type: ADD_LOOKING_FOR, payload: event.target.value})
            // setUserPreference(prev => ({
            //     ...prev, 
            //     lookingFor: event.target.value
            // }));
        }
        if(event.target.name == 'pain'){
            dispatch({ type: ADD_WHERESYOUR_PAIN, payload: event.target.value})
            // setUserPreference(prev => ({
            //     ...prev, 
            //     wheresYourPain: event.target.value
            // }));
        }
    }

    const handleCheckboxChange = (option) => {
        setCheckedOption(option.title);
        // Check by option name
        /// add a toggle for the checkboxes so only one is checked
       // if (checkedMassages.some(massage => massage.name === option.name)) {
           // setCheckedMassages(checked => checked.filter(item => item.name !== option.name));
        //} else {
         //   setCheckedMassages(checked => [...checked, option]);
        //}
        dispatch({ type: ADD_MASSAGE_TYPE, payload: option.name})
        // setUserPreference({
        //     ...userPreference,
        //     massageType: option.name
        // });
    };

    function getTitle() {
      let results;
      const cards = document.getElementsByClassName('card');
      const cardsArr = Array.from(cards);
      cardsArr.forEach((card) => {
        const s = card.querySelectorAll('.check');
        if (s[0].firstChild.checked) {
          const t = card.querySelectorAll('.title');
          results = t[0].innerText;
          setTitle(results);
        }
      })
    }

    return (
    <Flex align="center" justify="start" minHeight="100vh" direction="column" ref={ref} >
        <Stack width="1080px" height="150px" maxWidth="100%" background="#FFFFFF">
            <Text fontFamily="Noto Sans"
                lineHeight="1.43"
                fontWeight="regular"
                fontSize="28px"
                color="#000000"
                width="100%"
                height="1.5em"
                maxWidth="100%"
                textAlign="center">
                Massage Selector 
            </Text>
            <Text fontFamily="Inter"
                lineHeight="1.43"
                fontWeight="regular"
                fontSize="20px"
                color="#000000"
                width="100%"
                height="2em"
                maxWidth="100%"
                textAlign="center"
                marginBottom={1}>
            Select from the fields below and we'll recommend a massage tailored to your needs.
            </Text>
    <HStack spacing={8} display='flex' justify='center' marginTop={{ base: '10', sm: '4', md: '2', lg: '', xl:'' }}>
        <Select name="experience" onChange={handleChange} placeholder="Have you had a massage before?" size="sm" width="28%" height="32px" >
            <option value='No'>No</option>
            <option value='Yes'>Yes</option>
            
        </Select>
        <Select name="intensity" onChange={handleChange} placeholder="Intensity" size="sm" width="12%" height="32px" >
            <option value='Soft'>Soft</option>
            <option value='Medium'>Medium</option>
            <option value='Hard'>Hard</option>
            
        </Select>
        <Select name="lookingFor" onChange={handleChange} placeholder="What are you looking for?" size="sm" width="28%" height="32px" >
            <option value='Alleviate pain'>Alleviate pain</option>
            <option value='Increase energy'>Increase energy</option>
            <option value='Improve mood'>Improve mood</option>
            <option value='Promote relaxation'>Promote relaxation</option>
            <option value='Reduce anxiety'>Reduce anxiety</option>
            <option value='Release tension'>Release tension</option>
            
        </Select>
        <Select name="pain" onChange={handleChange}  placeholder="Where is your pain?" size="sm" width="22%" height="32px">
            <option value='Back'>Back</option>
            <option value='Chest'>Chest</option>
            <option value='Head'>Head</option>
            <option value='Legs'>Legs</option>
            <option value='Neck'>Neck</option>
            <option value='Shoulders'>Shoulders</option>
            
        </Select>
    </HStack>
        </Stack>
        <Box>
        <Grid 
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} 
            gap={6}> 
    {selectedOptions.map((option, index) => (
        <Box
            className="card" 
            margin={1} 
            key={index} 
            padding={4}
            borderRadius="8px"
            background="linear-gradient(145deg, #f5f5f5, #e1e1e1)"
            boxShadow="5px 5px 15px #d1d1d1, -5px -5px 15px #ffffff"
            transition="all 0.3s ease-in-out"
            _hover={{
                boxShadow: "2px 2px 5px #d1d1d1, -2px -2px 5px #ffffff"
            }}>
            <Flex 
                justifyContent="center" 
                alignItems="center" 
                height="150px">
                <Image  
                    boxSize={{ base: "75px", sm: "100px", md: "125px", lg: "125px", xl: "150px" }}
                    borderRadius="8px"
                    objectFit="cover"
                    
                    src={option.image}
                    alt={option.title}
                    transition="transform 0.3s ease-in-out"
                    _hover={{
                        transform: "scale(1.05)"
                    }}/>
            </Flex>
            <Text
                className="title" 
                fontWeight="bold"
                fontSize="1.25rem"
                mb="1rem">
                {option.title}
            </Text>
            <hr></hr>
            <Text 
                fontSize="0.9rem"
                mb="1rem">
                {option.description}
            </Text>
            <Text 
                borderTop="1px solid blue" 
                fontSize="0.85rem"
                color="#888"
                mb="1rem">
                {option.price}
            </Text>
            
            <Checkbox 
                className="check"
                mt={2}
                bg='gray.300'
                borderRadius='4'
                onChange={() => handleCheckboxChange(option)}
                isChecked={checkedOption === option.title}>
                Select
            </Checkbox>
                </Box>
            ))}
        </Grid>
        </Box>
        </Flex>
    )
})




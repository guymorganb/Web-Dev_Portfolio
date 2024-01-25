import React, {useState, useEffect} from "react";
import { Box, Flex, Text, Button, VStack, Image, HStack, Link, useDisclosure, Spinner, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { useQuery, useMutation } from "@apollo/client";
import { GET_SERVICES, GET_SERVICE_BY_ID } from "../../utils/queries.jsx";
import { transformData } from "../../utils/transformData.jsx";
import { animated, useSpring, useTrail } from 'react-spring';
import { AddUpdateService } from "./addUpdateServices.jsx";
import { UPDATE_SERVICE, ADD_SERVICE, DELETE_SERVICE } from "../../utils/mutations.jsx";
import AdminFooter from "./adminFooter.jsx";
import { GET_ME } from "../../utils/queries.jsx";
import decode from 'jwt-decode'
import Nav from "../Nav/Nav.jsx";
const ServiceBox = ({ id, title, description }) => {
    
    // const { data, loading, error } = useQuery(GET_ME);
    

    //   useEffect(() => {
    //       // If data is still loading, do nothing.
    //       if (loading) return;
    //       const token = localStorage.getItem('id_token');
    //       const decodedToken = token && decode(token);

    //       // No token in localStorage or token is expired.
    //       if (!token || (decodedToken && decodedToken.exp < (Date.now() / 1000))) {
    //           console.log("If statment")
    //           window.location.replace('/')
    //         //   throw render('/')
    //       }
    //     //    have a valid token, verify user data.
    //       if (data && decodedToken) {
    //           const isAuth = (decodedToken.data._id === data.me._id);
    //           const isAuth2 = (decodedToken.data.email === data.me.email);
              
    //           if (!isAuth || !isAuth2) {
    //             window.location.replace('/')
    //           }
    //       } else if(error) {
    //           console.error("Error fetching user:", error);
    //       }
    //   }, [data, loading, error]);

const { isOpen, onOpen, onClose } = useDisclosure();
const [updatedServiceId, setUpdatedServiceId] = useState(null);

// mutations
const [updateService, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_SERVICE);
const [deleteService, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_SERVICE);

// open the modal and pass the data attribute
const editService = async (element) => {
    setUpdatedServiceId({ element });
    onOpen(); // Open the modal
};

// handling delete side effects
useEffect(() => {
    if (deleteError) {
        console.error(deleteError.message);
    }
    if(deleteLoading){
        // do something for loading
    }
    }, [deleteError, deleteLoading]);

// handling update side effects
useEffect(() => {
    if (updateError) {
        console.error(updateError.message);
    }
    if(updateLoading){
        // do something for loading
    }
    }, [updateError, updateLoading]);

// used in modal passed as prop
const handleUpdateMutation = (dataId, title, description, min60, min90, imageUrl) => {
    updateService({ 
        variables: { 
            id: dataId, 
            title: title || "(no title)", 
            description: description || "(no desc)", 
            min60: min60 || "(no val)", 
            min90: min90 || "(no val)", 
            image: imageUrl || "(no img)"
        }}).then((response)=> {
            if (response.errors) {
            console.error("Error updating service: ", response.errors);
            response.errors.forEach((error) => {
                console.log(error.message);
            });
            }
        }).catch((err) => {
            console.error("Unknown error updating service: ", err); // Log Network Errors
        });
};
// used in modal passed as prop
const handleDeleteMutation = (dataId) => {
    deleteService({
        variables:{ id: dataId }
    }).then((response) => {
            if (response.errors) {
            console.error("Error deleting service: ", response.errors); // Log GraphQL Errors
            }
    }).catch((err) => {
            console.error("Unknown error: ", err); // Log Network Errors
    });
}

return (
    <>
        <Flex 
            bgColor="#d9d9d0" 
            w="85vw" 
            spacing={4}
            p={0} 
            boxShadow="xl"
            borderWidth="1px" 
            borderRadius="lg" 
            overflow="hidden"
            justifyContent="space-between"
            alignItems='center'>
            <Box 
                display='flex' 
                p={2} 
                flexDirection='column' >
                <Text 
                    fontFamily="Inter-Regular" 
                    fontSize="14px"
                    color="#000000"
                    whiteSpace="normal" 
                    textAlign="left"
                    pl={5}>
                        {title}
                </Text>
                        <hr></hr>
                <Text 
                    fontFamily="Inter-Regular" 
                    fontSize="10px" 
                    color="#000000" 
                    textAlign="center" 
                    overflow='hidden'>
                        {description}
                </Text>
            </Box>
            {/* Update button */}
            <Button 
                bgColor="#5e6d55" 
                w="8%"
                data-id={id}
                mr={2} 
                onClick={(e) => editService(e.currentTarget.getAttribute('data-id'))}
            >
                <Text 
                    fontFamily="Inter-Regular" 
                    fontSize="12px" 
                    color="#ffffff"
                >
                    Update
                </Text>
            </Button>
        </Flex>

        {/* AddUpdateService modal */}
        <AddUpdateService
            isOpen={isOpen}
            onClose={onClose}
            updatedService={updatedServiceId}
            updateMutation={handleUpdateMutation}
            deleteMutation={handleDeleteMutation}
        />
        {/* <Confetti active={confetti} config={confettiConfig} /> */}
    </>
);
};
////////////////////////////////
export const Services = () => {

const { isOpen, onOpen, onClose } = useDisclosure();
const [massageServices, setMassageServices] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const [addService, { loading: addLoading, error: addError }] = useMutation(ADD_SERVICE);

// handling mutation side effects
useEffect(() => {
if (addError) {
    console.error(addError.message);
}
if(addLoading){
    // do something for loading
}
}, [addError, addLoading]);

// addSrvice mutation
const addServiceMutation = (title, description, min60, min90, imageUrl )=>{
    try {
        // add the service
        addService({ 
            variables: { 
                title: title || "(no title)", 
                description: description || "(no desc)", 
                min60: min60 || "(no val)", 
                min90: min90 || "(no val)", 
                image: imageUrl || "(no img)"
            }}).then((response)=>{
                if (response.errors) {
                console.error("Error adding service: ", response.errors);
                response.errors.forEach((error) => {
                    console.log(error.message);
                });
                }
            }).catch((err) => {
                console.error("Unknown error addind service: ", err); // Log Network Errors
            });
    
        } catch (error) {
        console.error("Unknown error occurred while adding service: ", error);
        }
}
// query upon component mount
const {loading: servicesLoading, error: servicesError, data: servicesData} = useQuery(GET_SERVICES);

// Update services state when servicesData changes
useEffect(() => {
    if (servicesData && servicesData.services) {
        const transformedData = transformData(servicesData.services);
        setIsLoading(true);
        setTimeout(()=>{
            setIsLoading(false);
            setMassageServices(transformedData);
        }, 1750)
    }
}, [servicesData, servicesLoading]);

    // Animation
    const trail = useTrail(massageServices.length, {
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translatex(140px)' },
    delay: 200,
});
console.log(massageServices)
return (
    <>
    <Nav/>
     {isLoading ? (
        <Flex d="flex" justifyContent="center" alignItems="center" width="100vw" height="100vh">
            <Spinner 
              thickness="4px"
              speed="1.25s"
              emptyColor="gray.200"
              size="xl"
              color="green.500"
            />
        </Flex>
        ):(<Box bgColor="#ffffff" w="100%" d="flex" justifyContent="center" height='60vh'> 
        <Box textAlign='center' fontSize="34px" mt={15} mb={16}>Services</Box>
        <VStack bgColor="#ffffff" spacing={4} display='flex' justify='center' className="100">
            {trail.map((props, index) => (
                <animated.div style={props} key={massageServices[index].title}>
                    <ServiceBox 
                        title={massageServices[index].title} 
                        description={massageServices[index].description}
                        id={massageServices[index].id}
                        src={massageServices[index].image}   
                    />
                </animated.div>
            ))}
            <Box 
                w="100%" 
                p={4}
                boxShadow="xl" 
                borderRadius="lg" 
                overflow="hidden"
                display="flex" 
                justifyContent="center" 
                alignItems="center">
                <Button 
                    colorScheme="blue" 
                    onClick={onOpen}>
                    ADD
                </Button>
            </Box>
           <AdminFooter/>

        </VStack>
       
    </Box>
     )}
    <AddUpdateService
        isOpen={isOpen}
        addService={addServiceMutation}
        onClose={onClose}
        />
    </>
);
};

  

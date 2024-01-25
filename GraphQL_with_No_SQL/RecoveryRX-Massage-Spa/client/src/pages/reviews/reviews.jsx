import { Flex, Grid, Text, Box, Image, Checkbox } from '@chakra-ui/react' 
import React, {useState, useEffect} from "react";
import AdminFooter from '../admin/adminFooter';
import SignInFlows from './OAuthLogin';
import Nav from '../Nav/Nav';


const Reviews = () =>{
    
    const[businessReviews, setbusinessReviews] = useState();
    


    return(
        <>
        <Nav/>
        <SignInFlows/>
        <Flex>
        <Box>
    
        </Box>
        </Flex>
        <AdminFooter />
        </>
    )
}

export default Reviews
import React from "react";
import { Box, Text, HStack, VStack, Link, Image, Flex } from '@chakra-ui/react';
import { useLocation, Outlet} from 'react-router-dom';

const Nav = ({ onBookNowClick, ref }) => {
  const location = useLocation();

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  const onHomeRoute = location.pathname === '/';
  const onServicesRoute = location.pathname === '/services';
  const onBookingRoute = location.pathname === '/booking';
  const onReviewsRoute = location.pathname === '/reviews';

  return (
  <>
    <Box className="navContainer" width="100%" display="flex" justifyContent="center" >
      <VStack 
      padding={1} 
      borderRadius={4} 
      bg="white"
      maxWidth="1280px" 
      width="100%">
        <HStack width="100%" justifyContent="space-between" paddingX={{ base: '0', md: '8', lg: '12', xl: '16' }} alignItems="center" direction={{ base: "column", md: "row" }} >
          <HStack spacing={4}>
            <Image  
              boxSize={{ base: "0px",sm: "75px", md: "100px", lg: "100px" }}
              borderRadius={8}
              objectFit='cover'
              src='https://i.imgur.com/tTbzG1j.jpg'
              alt='Tree'
            />
            <Text
              fontFamily="Noto Sans"
              fontWeight="Regular"
              fontSize={{ base: "25px", md: "25px", lg: "32px" }}
              color="#000000"
              _hover={{ 
                boxShadow: '0 8px 10px rgba(0, 0, 0, 0.14), 0 6px 6px rgba(88, 144, 255, 0.2)',
                borderRadius: 4,
              }}>
                {onServicesRoute ? `RecoveryRx Massage ${formattedDate}`: `RecoveryRx Massage`}
            </Text>
          </HStack>
          <HStack spacing={4} >
          <Flex spacing={4} flexDirection={{ base: 'column', sm: 'column', md: "row" }} alignItems="center"> {location.pathname === '/' && 
              ['About', 'Services', 'Contact'].map(item => (
                <Text
                  key={item}
                  padding={{ base: '', sm: '1', md:'', lg: '3' }}
                  fontFamily="Noto Sans"
                  fontWeight="regular"
                  fontSize={{ base: "14px", md: "18px", lg: "20px" }}
                  _hover={{ 
                    boxShadow: '0 8px 10px rgba(0, 0, 0, 0.14), 0 6px 6px rgba(88, 144, 255, 0.2)',
                    borderRadius: 4,
                  }}>
                  <Link color='gray.500' href={`#${item}`} onClick={ onBookNowClick }>{item}</Link>
                </Text>
              ))}
            
              {onHomeRoute && 
              <Box
                as='button' height='40px' lineHeight='1.0'
                transition='all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)' border='1px' px='18px'
                borderRadius='8px' fontSize='16px' fontWeight='semibold'
                bg='#407a10' borderColor='#ccd0d5' color='#ffffff'
                boxShadow='inset 0px -8px 10px #00000033, inset 0px 4px 4px #ffffff80' _hover={{ 
                  boxShadow: '0 8px 10px rgba(0, 0, 0, 0.14), 0 6px 6px rgba(88, 144, 255, 0.2)'
                }} _active={{bg: '#edb664', transform: 'scale(0.98)', borderColor: '#bec3c9',
                  boxShadow: '0 2px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(88, 144, 255, 0.1)'}}> 
                <Link color='white.500' href="#" onClick={ onBookNowClick }>Book Now</Link>
              </Box>}

           {onServicesRoute && <Box
              as='button' height='40px' lineHeight='1.0'
              transition='all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)' border='1px' px='18px'
              borderRadius='8px' fontSize='16px' fontWeight='semibold'
              bg='#407a10' borderColor='#ccd0d5' color='#ffffff'
              boxShadow='inset 0px -8px 10px #00000033, inset 0px 4px 4px #ffffff80' _hover={{ 
                boxShadow: '0 8px 10px rgba(0, 0, 0, 0.14), 0 6px 6px rgba(88, 144, 255, 0.2)'
              }} _active={{bg: '#edb664', transform: 'scale(0.98)', borderColor: '#bec3c9',
                boxShadow: '0 2px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(88, 144, 255, 0.1)'}}> 
              <Link color='white.500' href="/booking" >My Appointments</Link>
            </Box>}

            { onServicesRoute && 
            <Box
              as='button' height='40px' lineHeight='1.0' m="2"
              transition='all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)' border='1px' px='18px'
              borderRadius='8px' fontSize='16px' fontWeight='semibold'
              bg='#407a10' borderColor='#ccd0d5' color='#ffffff'
              boxShadow='inset 0px -8px 10px #00000033, inset 0px 4px 4px #ffffff80' _hover={{ 
                boxShadow: '0 8px 10px rgba(0, 0, 0, 0.14), 0 6px 6px rgba(88, 144, 255, 0.2)'
              }} _active={{bg: '#edb664', transform: 'scale(0.98)', borderColor: '#bec3c9',
                boxShadow: '0 2px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(88, 144, 255, 0.1)'}}> 
              <Link color='white.500' href="/reviews" >My Reviews</Link>
            </Box>}

            {onServicesRoute && 
            <Box
              as='button' height='40px' lineHeight='1.0'
              transition='all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)' border='1px' px='18px'
              borderRadius='8px' fontSize='16px' fontWeight='semibold'
              bg='#407a10' borderColor='#ccd0d5' color='#ffffff'
              boxShadow='inset 0px -8px 10px #00000033, inset 0px 4px 4px #ffffff80' _hover={{ 
                boxShadow: '0 8px 10px rgba(0, 0, 0, 0.14), 0 6px 6px rgba(88, 144, 255, 0.2)'
              }} _active={{bg: '#edb664', transform: 'scale(0.98)', borderColor: '#bec3c9',
                boxShadow: '0 2px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(88, 144, 255, 0.1)'}}> 
              <Link color='white.500' href="/">Home</Link>
            </Box>}

            {onBookingRoute && 
            <Box
              as='button' height='40px' lineHeight='1.0'
              transition='all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)' border='1px' px='18px'
              borderRadius='8px' fontSize='16px' fontWeight='semibold'
              bg='#407a10' borderColor='#ccd0d5' color='#ffffff'
              boxShadow='inset 0px -8px 10px #00000033, inset 0px 4px 4px #ffffff80' _hover={{ 
                boxShadow: '0 8px 10px rgba(0, 0, 0, 0.14), 0 6px 6px rgba(88, 144, 255, 0.2)'
              }} _active={{bg: '#edb664', transform: 'scale(0.98)', borderColor: '#bec3c9',
                boxShadow: '0 2px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(88, 144, 255, 0.1)'}}> 
              <Link color='white.500' href="/services" >My Services</Link>
            </Box>}

            {onBookingRoute && 
            <Box
              as='button' height='40px' lineHeight='1.0' m="2"
              transition='all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)' border='1px' px='18px'
              borderRadius='8px' fontSize='16px' fontWeight='semibold'
              bg='#407a10' borderColor='#ccd0d5' color='#ffffff'
              boxShadow='inset 0px -8px 10px #00000033, inset 0px 4px 4px #ffffff80' _hover={{ 
                boxShadow: '0 8px 10px rgba(0, 0, 0, 0.14), 0 6px 6px rgba(88, 144, 255, 0.2)'
              }} _active={{bg: '#edb664', transform: 'scale(0.98)', borderColor: '#bec3c9',
                boxShadow: '0 2px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(88, 144, 255, 0.1)'}}> 
              <Link color='white.500' href="/reviews" >My Reviews</Link>
            </Box>}

            {onBookingRoute && 
            <Box
              as='button' height='40px' lineHeight='1.0'
              transition='all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)' border='1px' px='18px'
              borderRadius='8px' fontSize='16px' fontWeight='semibold'
              bg='#407a10' borderColor='#ccd0d5' color='#ffffff'
              boxShadow='inset 0px -8px 10px #00000033, inset 0px 4px 4px #ffffff80' _hover={{ 
                boxShadow: '0 8px 10px rgba(0, 0, 0, 0.14), 0 6px 6px rgba(88, 144, 255, 0.2)'
              }} _active={{bg: '#edb664', transform: 'scale(0.98)', borderColor: '#bec3c9',
                boxShadow: '0 2px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(88, 144, 255, 0.1)'}}> 
              <Link color='white.500' href="/">Home</Link>
            </Box>}

            {onReviewsRoute && <Box
              as='button' height='40px' lineHeight='1.0'
              transition='all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)' border='1px' px='18px'
              borderRadius='8px' fontSize='16px' fontWeight='semibold'
              bg='#407a10' borderColor='#ccd0d5' color='#ffffff'
              boxShadow='inset 0px -8px 10px #00000033, inset 0px 4px 4px #ffffff80' _hover={{ 
                boxShadow: '0 8px 10px rgba(0, 0, 0, 0.14), 0 6px 6px rgba(88, 144, 255, 0.2)'
              }} _active={{bg: '#edb664', transform: 'scale(0.98)', borderColor: '#bec3c9',
                boxShadow: '0 2px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(88, 144, 255, 0.1)'}}> 
              <Link color='white.500' href="/booking" >My Appointments</Link>
            </Box>}

            {onReviewsRoute && 
            <Box
              as='button' height='40px' lineHeight='1.0'
              transition='all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)' border='1px' px='18px'
              borderRadius='8px' fontSize='16px' fontWeight='semibold'
              bg='#407a10' borderColor='#ccd0d5' color='#ffffff'
              boxShadow='inset 0px -8px 10px #00000033, inset 0px 4px 4px #ffffff80' _hover={{ 
                boxShadow: '0 8px 10px rgba(0, 0, 0, 0.14), 0 6px 6px rgba(88, 144, 255, 0.2)'
              }} _active={{bg: '#edb664', transform: 'scale(0.98)', borderColor: '#bec3c9',
                boxShadow: '0 2px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(88, 144, 255, 0.1)'}}> 
              <Link color='white.500' href="/services" >My Services</Link>
            </Box>}

            {onReviewsRoute && 
            <Box
              as='button' height='40px' lineHeight='1.0'
              transition='all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)' border='1px' px='18px'
              borderRadius='8px' fontSize='16px' fontWeight='semibold'
              bg='#407a10' borderColor='#ccd0d5' color='#ffffff'
              boxShadow='inset 0px -8px 10px #00000033, inset 0px 4px 4px #ffffff80' _hover={{ 
                boxShadow: '0 8px 10px rgba(0, 0, 0, 0.14), 0 6px 6px rgba(88, 144, 255, 0.2)'
              }} _active={{bg: '#edb664', transform: 'scale(0.98)', borderColor: '#bec3c9',
                boxShadow: '0 2px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(88, 144, 255, 0.1)'}}> 
              <Link color='white.500' href="/">Home</Link>
            </Box>}
            
            </Flex>
          </HStack>
        </HStack>
        <Box bg='white.100' width='100%' marginBottom={3}>
          <hr></hr>
        </Box>
      </VStack>
    </Box>
  {/* <Outlet /> */}
</>
  );
};

export default Nav;

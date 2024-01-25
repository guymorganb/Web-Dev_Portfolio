import React from "react";
import { Stack, VStack, Box, Text, Image, Link } from '@chakra-ui/react'
import myImage from '../../assets/pexels-ryutaro-tsukata-5473223-1.png'
import myImage2 from '../../assets/1-1.png'


const Hero = ({ onBookNowClick }) => {
  return (
  <Box className="navContainer">
  <Stack >
    <Box position="relative"> 
    {/* Position relative here to accomodate for position absolute in child container */}
    <Image
      borderRadius={8}
      objectFit='cover'
      src={myImage}
      alt='Massage Therapist'
      w='100%'
      />
    <Box>
      <Text
      fontFamily="EB Garamond"
      fontWeight="bold"
      fontSize={{ base: "12px", sm: "18px", md: "22px", lg: "24px", xl:'26px' , "2xl":'26px' }}
      color="#ffffff"
      width='90%'
      right='6%'
      textAlign="center"
      position="absolute"
      top="2%"
      textShadow="1px 1px 1px rgba(255, 255, 255, 0.8), -1px -1px 1px rgba(0, 0, 0, 0.2),4px 4px 5px rgba(0, 0, 0, 0.5),1px 1px 2px rgba(0, 0, 0, 0.1)" // 3D letterpress
      padding={1}
      >
        Welcome to Recovery Rx Massage, where healing and relaxation come together
        to help you achieve optimal well-being. <br></br>  We understand the toll that
        everyday stress, injuries, and physical ailments can take on your body and
        mind. That's why our mission is to provide you with personalized massage
        therapy treatments that promote recovery, relieve tension, and rejuvenate
        your body.
      </Text>
      </Box>
        <Box
          as='button'
          position="absolute" // parent needs position: relative
          top={{ base: "80%",sm: "80%", md: "50%", lg: "50%"}}  // positioning below the text
          left="50%" // centers the button horizontally
          transform="translateX(-50%)" // for centering vertically
          height='40px'
          lineHeight='1.0'
          transition='all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
          border='1px'
          px='18px'
          borderRadius='8px'
          fontSize='16px'
          fontWeight='semibold'
          bg='#407a10'
          borderColor='#ccd0d5'
          color='#ffffff'
          boxShadow='inset 0px -8px 10px #00000033, inset 0px 4px 4px #ffffff80'
          onClick={ onBookNowClick }
          _hover={{ 
              boxShadow: '0 8px 10px rgba(0, 0, 0, 0.14), 0 6px 6px rgba(88, 144, 255, 0.2)'
          }}
          _active={{
              bg: '#edb664',
              transform: 'scale(0.98)',
              borderColor: '#bec3c9',
              boxShadow: '0 2px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(88, 144, 255, 0.1)'
          }}>
          <Link color='white.500' href='#'>Book Now</Link>
        </Box>
    </Box>
    <Box width="75px" height="10%" />
    <VStack>
    <Box>
      <Image  
        boxSize={{ base: "75px",sm: "100px", md: "125px", lg: "125px", xl:'150px' }}
        borderRadius={8}
        objectFit='cover'
        src={myImage2}
        alt='Lotus Flower'/>
    </Box>
    <Text
      fontFamily="Noto Sans"
      lineHeight="1.0"
      fontWeight="bold"
      fontSize={{ base: "20px", sm: '26px', md: "30px", lg: "34px", xl:'40' }}
      color="#000000"
      width="640px"
      height="100%"
      maxWidth="100%"
      textAlign="center">
      Our Services
    </Text>
    <Text
      fontFamily="Noto Sans"
      lineHeight="1.0"
      fontWeight="displayregular"
      fontSize={{ base: "14px", sm: '16px', md: "20px", lg: "22px" }}
      color="#000000"
      width="1102px"
      height='100%'
      maxWidth="80%"
      textAlign="center"
      marginBottom='5%'>
      Our range of massage techniques includes deep tissue, Swedish, sports
      massage, and cupping. Whatever your preference, our expert therapists will
      use their knowledge and expertise to deliver a massage that targets your
      specific areas of concern and leaves you feeling invigorated and relaxed.
    </Text>
    </VStack>
  </Stack>
  </Box>
  )
  }

export default Hero;
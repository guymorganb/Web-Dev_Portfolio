import React from "react";
import { Box, Text } from "@chakra-ui/react";

function Title() {
  return (
    <div>
    <Box>
      <Text 
        textAlign={[ 'left', 'center' ]}
        fontSize={{ base: '2em', md: '4em', lg: '6em' }}
      >
        Book your massage
      </Text>
      <Text
        textAlign={[ 'left', 'center' ]}
        w={'50%'}
        mx={'auto'}
      >
        Ready to experience the ultimate relaxation and rejuvenation? Don't wait any longer—book your massage with us 
        today and embark on a journey to improved well-being. Our skilled therapists are eager to tailor a personalized 
        treatment to address your specific needs and leave you feeling revitalized. Take the first step towards a 
        healthier, happier you and schedule your appointment now!
      </Text>
    </Box>
    </div>
  );
}

export default Title;
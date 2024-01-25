import React from "react";
import { Box, Text } from "@chakra-ui/react";

function Confirmation () {
  return (
    <div>
    <Box
      py={'2em'}
      w={{ sm: "95%", md: "85%", xl: "75%" }}
      mx={'auto'}
      >
        <Text
        fontSize={{ sm: "1em", md: "1.5em", xl: "2em" }}
        py={'1em'}
        >
          Step 3: Confirmation
        </Text>
        <Box
        textAlign={'center'}
        backgroundColor={'#fbdebb'}
        borderRadius={'1em'}
        py={'10em'}
        px={'15em'}
        color={'black'}
        >
          <Text
          fontSize={{ sm: "1em", md: "1.50em", xl: "2em" }}
          pb={'2em'}
          >
            <b>Thank you for submitting your request!</b>
          </Text>
          <Text
          fontSize={{ sm: "1em", md: "1.25em", xl: "1.50em" }}
          >
            One of our specialists will reach out to you shortly to confirm your appointment and collect some additional 
            information prior to your visit.
          </Text>
        </Box>
    </Box>
    </div>
  )
}

export default Confirmation;
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import GenerateCalendar from "../../utils/GenerateCalendar";

function Calendar({setSelectedDate}) {
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
          Step 1: Select a Date
        </Text>
        <GenerateCalendar setSelectedDate={setSelectedDate} theme={'frontEnd'}/>
      </Box>
    </div>
  );
}

export default Calendar;

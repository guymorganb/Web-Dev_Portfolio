import Title from "./Title";
import Calendar from "./Calendar";
import AboutCustomer from "./AboutCustomer";
import Confirmation from "./Confirmation";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

function Booking({title}) {
  const [selectedDate, setSelectedDate] = useState('');
  const [formSuccessfullySubmitted, setFormSuccessfullySubmitted] = useState(false);
  return ( 
    <div>
      <Box
      bg='#5e6d55'
      color='#ffffff'
      py={'2em'}
      >
        <Title />
        {
          (!formSuccessfullySubmitted) ? (
            <>
              <Calendar setSelectedDate={setSelectedDate}/>
              <AboutCustomer title={title} selectedDate={selectedDate} setFormSuccessfullySubmitted={setFormSuccessfullySubmitted}/>
            </>
          ) : (
            <Confirmation />
          )
        }
      </Box>
    </div>
  );
}

export default Booking;
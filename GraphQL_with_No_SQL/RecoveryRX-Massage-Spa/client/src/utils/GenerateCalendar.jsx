import React, { useState } from "react";
import calendar from 'calendar-js';
import { Box, Text, SimpleGrid, Button, Tooltip, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, useDisclosure} from "@chakra-ui/react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const d = new Date();
const monthNumber = d.getMonth();
const y = d.getFullYear();
let selected, lastSelected, selectedDate;

function GenerateCalendar({setSelectedDate, theme, appointments, confirm}) {
  let colorObj;
  if(theme == 'frontEnd') {
    colorObj = {
      bgColor: '#fbdebb',
      col: 'white',
      colSch: 'blackAlpha',
      var: 'ghost',
      selCol: '#5e6d55',
      lasCol: 'white'
    }
  } else if(theme == 'backEnd') {
    colorObj = {
      bgColor: 'grey',
      col: 'black',
      colSch: 'blackAlpha',
      var: 'ghost',
      selCol: 'white',
      lasCol: 'black',
    }
    console.log('Admin pulled' + appointments);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  let appCol;
  (confirm) ? appCol = 'SpringGreen' : appCol='yellow'

  const [monthIndex, setMonthIndex] = useState(monthNumber);
  const [yearNumber, setYearNumber] = useState(y);
  const cal = calendar().of(yearNumber, monthIndex);
  const weeks = cal.calendar;
  const { month } = cal;
  const { year } = cal;
  let items = [];
  weeks.forEach(element => {
    items.push(...element);
  });
  let { weekdaysAbbr } = cal;
  const [drawerText, setDrawerText] = useState('');

  return (
    <div>
      <Box
      textAlign={'center'}
      backgroundColor={colorObj.bgColor}
      borderRadius={'1em'}
      p={'4em'}
      >
      <SimpleGrid 
      columns={3} 
      spacing={'2em'}
      py={'1em'}
      >
        <Box>
          <SimpleGrid 
          columns={4}
          >
            <Box>
              <Button
              color={colorObj.col}
              colorScheme={colorObj.colSch}
              variant={colorObj.var}
              fontSize={{ sm: "1em", md: "1.5em", xl: "2em" }}
              onClick={() => {
                if (monthIndex === 0) {
                  setMonthIndex(11);
                  setYearNumber(yearNumber - 1);
                } else {
                  setMonthIndex(monthIndex - 1)
                }
                lastSelected.style.color = colorObj.lasCol;
                selected = undefined;
                console.log(selected);
                }
                }
              >
                <SlArrowLeft />
              </Button>
            </Box>
            <Box>
              <Button
              color={colorObj.col}
              colorScheme={colorObj.colSch}
              variant={colorObj.var}
              fontSize={{ sm: "1em", md: "1.5em", xl: "2em" }}
              onClick={() => {
                if (monthIndex === 11) {
                  setMonthIndex(0);
                  setYearNumber(yearNumber + 1);
                } else {
                  setMonthIndex(monthIndex + 1)
                }
                lastSelected.style.color = colorObj.lasCol;
                selected = undefined;
                console.log(selected);
                }}
              >
                <SlArrowRight />
              </Button>
            </Box>
            <Box>

            </Box>
          </SimpleGrid>
        </Box>
        <Box>
          <Text
            fontSize={{ sm: "1.5em", md: "2.5em", xl: "3em" }}
          >
            {month}
          </Text>
        </Box>
        <Box>
        <Text
          fontSize={{ sm: "1.5em", md: "2.5em", xl: "3em" }}
        >
          {year}
        </Text>
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={7} spacing={'2em'} py={'1em'} fontSize={{ sm: "1em", md: "1.5em", xl: "2em" }}>
      {weekdaysAbbr.map((item,index)=>{
        return <Box key={index}>{item}</Box>
      })}
      </SimpleGrid>
      <SimpleGrid columns={7} spacing={'2em'} fontSize={{ sm: "1em", md: "1.5em", xl: "2em" }}>
      {items.map((item,index)=>{
        if (item === 0) {
          item = '';
          return <Box key={index}>
                {item}
          </Box>;
        }
        let appointmentFound = false;
        let toolTipAppointment = '';

        if(theme === 'backEnd') {
          const itemDay = Number(item);
          const itemDate = new Date(`${monthIndex+1}/${itemDay}/${yearNumber}`);
          appointments.forEach((appointment) => {
            const appDate = new Date(appointment.date);
            if(!(itemDate > appDate) && !(itemDate < appDate)) {
              appointmentFound = true;
              toolTipAppointment += `Time: -${appointment.firstName}-${appointment.phone}\n-${appointment.email}\n`
            }
          });
        }
        return (theme === 'frontEnd') ? (
          (<button 
          key={index}
          onClick={(event) => {
            if(!lastSelected) {
              selected = event.target;
              selected.style.color = colorObj.selCol;
              lastSelected = selected;
              selectedDate = new Date(yearNumber, monthIndex, Number(selected.innerText));
              setSelectedDate(selectedDate.toLocaleDateString());
            } else if(lastSelected) {
              lastSelected.style.color = colorObj.lasCol;
              selected = event.target;
              selected.style.color = colorObj.selCol;
              lastSelected = selected;
              selectedDate = new Date(yearNumber, monthIndex, Number(selected.innerText));
              setSelectedDate(selectedDate.toLocaleDateString());
            }
          }}>
            {item}
        </button>)
        ) : (
          (appointmentFound) ? (
            (
              <div key={index}>
                <button 
                  ref={btnRef} 
                  onClick={(event) => {
                    onOpen();
                    setDrawerText(event.target.parentNode.value);
                  }} 
                  key={index}
                  onMouseEnter={(event) => {
                    if(!lastSelected) {
                      selected = event.target;
                      selected.style.color = colorObj.selCol;
                      lastSelected = selected;
                    } else if(lastSelected) {
                      lastSelected.style.color = colorObj.lasCol;
                      selected = event.target;
                      selected.style.color = colorObj.selCol;
                      lastSelected = selected;
                    }
                  }}
                  onMouseLeave={() => {
                    lastSelected = undefined;
                    selected.style.color = appCol;
                  }}
                  value={toolTipAppointment}>
                  <Text color={appCol}>
                    {item}
                  </Text>
                </button>
                <Drawer
                  isOpen={isOpen}
                  placement='right'
                  onClose={onClose}
                  finalFocusRef={btnRef}
                >
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                      {drawerText}
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </div>
            )
          ) : (
            (<button 
          key={index}
          onMouseEnter={(event) => {
            if(!lastSelected) {
              selected = event.target;
              selected.style.color = colorObj.selCol;
              lastSelected = selected;
            } else if(lastSelected) {
              lastSelected.style.color = colorObj.lasCol;
              selected = event.target;
              selected.style.color = colorObj.selCol;
              lastSelected = selected;
            }
          }}>
          {item}
        </button>)
          )
        )
      })}
      </SimpleGrid>
      </Box>
    </div>
  );
}

export default GenerateCalendar;

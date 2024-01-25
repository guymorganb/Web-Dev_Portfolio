import React, {useState, useEffect} from "react";
import { Box, Text, FormControl, FormErrorMessage, Input, Select, Button} from "@chakra-ui/react";
import axios from 'axios';
import { ADD_APPOINTMENT } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

function AboutCustomer({title, selectedDate, setFormSuccessfullySubmitted}) {
  const nameRegex = /[a-zA-Z]{3,}/;
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [emailError, setEmailError] = useState(false);

  const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const [phoneError, setPhoneError] = useState(false);
  const [data, setData] = useState({});

  const timeFrame = document.getElementById('timeframe');
  const timeWindow = document.getElementById('timewindow');
  const [tFrame, setTFrame] = useState('');

  const [addAppointment, {error}] = useMutation(ADD_APPOINTMENT);

  const _60minAppointments = [
    '9:00a - 10:00a',
    '10:00a - 11:00a',
    '11:00a - 12:00p',
    '12:00p - 1:00p',
    '1:00p - 2:00p',
    '2:00p - 3:00p',
    '3:00p - 4:00p',
    '4:00p - 5:00p',
    '5:00p - 6:00p',
    '6:00p - 7:00p',
    '7:00p - 8:00p',
    '8:00p - 9:00p',
  ];

  const _90minAppointments = [
    '9:00a - 10:30a',
    '10:30a - 12:00p',
    '12:00p - 1:30p',
    '1:30p - 3:00p',
    '3:00p - 4:30p',
    '4:30p - 6:00p',
    '6:00p - 7:30p',
    '7:30p - 9:00p',
  ];

  function handleFNameInput(event) {
    const result = nameRegex.test(event.target.value);
    (!result) ? setFirstNameError(true) : setFirstNameError(false);
  }

  function handleLNameInput(event) {
    const result = nameRegex.test(event.target.value);
    (!result) ? setLastNameError(true) : setLastNameError(false);
  }

  function handleEmailInput(event) {
    const result = emailRegex.test(event.target.value);
    (!result) ? setEmailError(true) : setEmailError(false);
  }

  function handlePhoneInput(event) {
    const result = phoneRegex.test(event.target.value);
    (!result) ? setPhoneError(true) : setPhoneError(false);
  }

  async function uploadAppointment(form) {
    try {
      await addAppointment({
        variables: { 
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          date: form.date,
          massage: form.massage,
          cupping: form.cupping,
          contactMethod: form.contactMethod,
          timeWindow: form.timeWindow
         },
      });
    } catch (err) {
      console.error(err);
    }
   }

  function submitData(event) {
    if (event) {
      let completeForm = false;
      let formCount = 0;
      let formItems = document.getElementsByClassName('form-item');
      let formArr = Array.from(formItems);
      console.log('setData called');
      formArr.forEach((item) => {
        if(item.value) {
          formCount++;
        }
      })
      if (formCount === 9) {
        console.log('Form is complete');
        if(!firstNameError && !lastNameError && !emailError && !phoneError) {
          console.log('No errors');
          console.log('Ready to send data');
          completeForm = true;
          const dataArr =[];
          formArr.forEach((item) => {
            (item.name === 'cupping') ? (
              (item.value === 'yes') ? (
                dataArr.push([item.name, true])
              ) : (
                dataArr.push([item.name, false])
              )
            ) : (
              dataArr.push([item.name, item.value])
            )
          });
          const obj = Object.fromEntries(dataArr);
          console.log(obj);
          setFormSuccessfullySubmitted(true);
          uploadAppointment(obj);
          if (completeForm) {
            axios.post('/api', {
              email: obj.email,
            })
              .then(res => res.data)
              .then(d => setData(d))
              .then(() => console.log(data));
          }
        }
      }
    }
  }

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
          Step 2: Tell Us About Yourself
        </Text>
        <Box
        textAlign={'center'}
        backgroundColor={'#fbdebb'}
        borderRadius={'1em'}
        py={'10em'}
        px={'10em'}
        >
          <Text
          pb={'1.5em'}
          color={'black'}
          fontSize={{ sm: "1em", md: "1.25em", xl: "1.5em" }}
          >
            Please give us some information about yourself so we help get your appointment setup.
          </Text>
          <FormControl
          color={'black'}
          pb={'1.5em'}
          isInvalid={firstNameError}
          >
            <Input type='text' placeholder="First Name" name='firstName' backgroundColor={'white'} onChange={handleFNameInput} className="form-item"/>
            {!firstNameError ? (
              <div></div>
            ) : (
              <FormErrorMessage>Invalid Name</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
          color={'black'}
          pb={'1.5em'}
          isInvalid={lastNameError}
          >
            <Input type='text' placeholder="Last Name" name='lastName' backgroundColor={'white'} onChange={handleLNameInput} className="form-item"/>
            {!lastNameError ? (
              <div></div>
            ) : (
              <FormErrorMessage>Invalid Name</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
          color={'black'}
          pb={'1.5em'}
          isInvalid={emailError}
          >
            <Input type='email' placeholder="Email" name='email' backgroundColor={'white'} onChange={handleEmailInput} className="form-item"/>
            {!emailError ? (
              <div></div>
            ) : (
              <FormErrorMessage>Invalid Email Address</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
          color={'black'}
          pb={'1.5em'}
          isInvalid={phoneError}
          >
            <Input type='tel' placeholder="Phone Number" name='phone' backgroundColor={'white'} onChange={handlePhoneInput} className="form-item"/>
            {!phoneError ? (
              <div></div>
            ) : (
              <FormErrorMessage>Invalid Phone Number</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
          color={'black'}
          pb={'1.5em'}
          >
            <Input 
              type='text' 
              placeholder="Please Select a Date from above" 
              name='date'
              backgroundColor={'white'} 
              isDisabled={true}
              value={selectedDate}
              className="form-item"
            />
          </FormControl>
          <FormControl
          color={'black'}
          pb={'1.5em'}
          onChange={() => {
            if (timeFrame.value !== '') {
              setTFrame(timeFrame.value);
            } else {
              setTFrame('');
            }
          }}
          >
            <Select id={'timeframe'} placeholder="Please select a time frame?" name='timeframe' backgroundColor={'white'}>
              <option value='60'>60 min</option>
              <option value='90'>90 min</option>
            </Select>
            {
              (tFrame) ? (
                (tFrame == '60') ? (
                  <Select disabled={false} id={'timewindow'} placeholder="Please select a time window?" name='timeWindow' backgroundColor={'white'} className='form-item'>
                    {
                      _60minAppointments.map((_60min) => {
                        return <option key={_60min} value={_60min}>{_60min}</option>
                      })
                    }
                  </Select>
                ) : (
                  <Select disabled={false} id={'timewindow'} placeholder="Please select a time window?" name='timeWindow' backgroundColor={'white'} className='form-item'>
                    {
                      _90minAppointments.map((_90min) => {
                        return <option key={_90min} value={_90min}>{_90min}</option>
                      })
                    }
                  </Select>
                )
              ) : (
                <Select disabled={true} id={'timewindow'} placeholder="Please select an option above." name='timeWindow' backgroundColor={'white'}>
                </Select>
              )
            }
          </FormControl>
          <FormControl
          color={'black'}
          pb={'1.5em'}
          >
            <Input 
              type='text' 
              placeholder="Please Select a Massage From Above" 
              name='massage'
              backgroundColor={'white'} 
              isDisabled={true}
              value={title}
              className="form-item"
            />
          </FormControl>
          <FormControl
          color={'black'}
          pb={'1.5em'}
          >
            <Select placeholder="Would you like to add cupping to your massage?" name='cupping' backgroundColor={'white'} className="form-item">
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </Select>
          </FormControl>
          <FormControl
          color={'black'}
          pb={'1.5em'}
          >
            <Select placeholder="Preferred Method of Contact?" name='contactMethod' backgroundColor={'white'} className="form-item">
              <option value='email'>Email</option>
              <option value='text'>Text</option>
              <option value='call'>Call</option>
            </Select>
          </FormControl>
          <Button backgroundColor={'#5e6d55'} color={'white'} onClick={submitData}>Submit</Button>
        </Box>
      </Box>
    </div>
  )
}

export default AboutCustomer;
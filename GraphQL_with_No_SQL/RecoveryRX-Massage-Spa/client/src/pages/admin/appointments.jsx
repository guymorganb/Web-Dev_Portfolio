import React, { useState }from "react";
import { useQuery, useMutation } from '@apollo/client';
import { GET_UNCONFIRMED_APPOINTMENTS } from "../../utils/queries";
import { UPDATE_APPOINTMENT, DELETE_APPOINTMENT } from "../../utils/mutations";
import Nav from "../Nav/Nav";
import AdminFooter from "./adminFooter";
import { 
  Box,
  Text,
  Grid,
  GridItem,
  Button,
  Stack,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  VStack,
  HStack,
  Link,
  Image,
  Flex
} from "@chakra-ui/react";
import GenerateCalendar from "../../utils/GenerateCalendar";

function Appointments() {
  const [confirm, setConfirm] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();  

  const { loading, data } = useQuery(GET_UNCONFIRMED_APPOINTMENTS, {
    variables: { confirm: confirm},
  });

  const [updateAppointment, {error}] = useMutation(UPDATE_APPOINTMENT);
  const [deleteAppointment, {err}] = useMutation(DELETE_APPOINTMENT);

 async function confirmAppointment(event) {
  try {
    await updateAppointment({
      variables: { _id: event.target.id, confirm: true },
    });
    document.location.reload();
  } catch (err) {
    console.error(err);
  }
 }

 async function rejectAppointment(event) {
  try {
    await deleteAppointment({
      variables: { _id: event.target.id },
    });
    document.location.reload();
  } catch (err) {
    console.error(err);
  }
 }

  const appointments = data?.unconfirmedAppointments || [];
  console.log(appointments);
  return (
    <>
  <Flex direction="column" minH="100vh">
     <Nav/>
      <Modal isOpen={isOpen} onClose={onClose} size={'6xl'}>
        <ModalContent>
          <ModalHeader>Calendar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <GenerateCalendar setSelectedDate={undefined} theme={'backEnd'} appointments={appointments} confirm={confirm}/>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box flex="1" py={'2em'} w={{ sm: "99%", md: "95%", xl: "90%" }} mx={'auto'}> 
        <Grid
          templateColumns='repeat(5, 1fr)'
          w={'95%'}
          mx={'auto'}
        >
          <GridItem colSpan={4}>
            <Text
              fontSize={{ sm: "1.5em", md: "2.em", xl: "2.5em" }}
            >
              Upcoming Appointments
            </Text>
          </GridItem>
          <GridItem colSpan={1} alignSelf={'center'} justifySelf={'end'}>
            <Stack spacing={4} direction='row' align='center'>
                <Button 
                  colorScheme='teal' 
                  size={{ sm: "xs", md: "sm", xl: "md" }}
                  onClick={() => {
                    setConfirm(false);
                  }}>
                  Unconfirmed
                </Button>
                <Button 
                  colorScheme='teal' 
                  size={{ sm: "xs", md: "sm", xl: "md" }}
                  onClick={() => {
                    setConfirm(true);
                  }}>
                  Confirmed
                </Button>
                <Button 
                  colorScheme='teal' 
                  size={{ sm: "xs", md: "sm", xl: "md" }}
                  onClick={onOpen}
                  >
                  Calendar
                </Button>
              </Stack>
          </GridItem>
        </Grid>
        {
          (appointments.length !== 0) ? (
            appointments.map((obj, index) => {
            console.log('index is ' + index);
            const { _id, firstName, lastName, date, phone, email, massage} = obj;
            return <Box
              borderRadius={'1em'}
              border='1px'
              borderColor='gray.200'
              my={'1em'}
              key={index}
              >
                <Grid
                  templateColumns='repeat(5, 1fr)'
                  w={'95%'}
                  mx={'auto'}
                >
                  <GridItem colSpan={4}>
                    <Text
                      fontSize={{ sm: "1em", md: "1.5em", xl: "2em" }}
                    >
                      {
                        `${firstName}, ${lastName}`
                      }
                    </Text>
                    <Text
                      fontSize={{ sm: "1em", md: "1.15em", xl: "1.3em" }}
                    >
                      {
                        `${date} | ${phone} | ${email} | ${massage}`
                      }
                    </Text>
                  </GridItem>
                  <GridItem colSpan={1} alignSelf={'center'} justifySelf={'end'}>
                  {
                    obj.confirm ? (
                      <Stack spacing={4} direction='row' align='center'>
                        <Button colorScheme='blue' size={{ sm: "xs", md: "sm", xl: "md" }}>
                          Confirmed
                        </Button>
                      </Stack>
                    ) : (
                      <Stack spacing={4} direction='row' align='center'>
                        <Button 
                          id={_id}
                          colorScheme='green' 
                          variant='outline' 
                          size={{ sm: "xs", md: "sm", xl: "md" }}
                          onClick={confirmAppointment}
                        >
                          Confirm
                        </Button>
                        <Button 
                          id={_id}
                          colorScheme='red' 
                          variant='outline' 
                          size={{ sm: "xs", md: "sm", xl: "md" }}
                          onClick={rejectAppointment}
                        >
                          Reject
                        </Button>
                      </Stack>
                    )
                  }
                  </GridItem>
                </Grid>
              </Box>
          })
          ) : (
            <div>
              <Box
                py={'2em'}
                w={{ sm: "95%", md: "90%", xl: "85%" }}
                mx={'auto'}
                >
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
                      <b>There is no data to display!</b>
                    </Text>
                    <Text
                    fontSize={{ sm: "1em", md: "1.25em", xl: "1.50em" }}
                    >
                      There is no data to display. This may be because all appointments have been resolved or there is an 
                      error with pulling from the database.
                    </Text>
                  </Box>
              </Box>
              </div>
          )
        }
      </Box>
      <AdminFooter />
    </Flex>
    </>
  );
}

export default Appointments;
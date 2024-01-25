import React, { useState} from "react";
import Confetti from 'react-dom-confetti';

import {
  Box,
  Text,
  Button,
  Input,
  Textarea,
  HStack,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

export const AddUpdateService = ({ isOpen, onClose, updatedService, addService, updateMutation, deleteMutation}) => {
  
const [confetti, setConfetti] = useState(false);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [imageUrl, setImageUrl] = useState("");
const [showTextBox, setShowTextBox] = useState(false);
const [buttonText, setButtonText] = useState("Click to expand");
const [min60, setMin60] = useState("");
const [min90, setMin90] = useState("");
const [deleteButtonText, setDeleteButtonText] = useState("Delete")
const [saveButtonText, setSaveButtonText] = useState("Save")
const [clickCount, setClickCount] = useState(0);
const confettiConfig = { angle: 90, spread: 190, startVelocity: 30, elementCount: 1170, decay: 0.91, duration: 3000, origin: { x: 0.5, y: 1 } };


const handleImageURL = () => {
setShowTextBox(!showTextBox);
setButtonText(showTextBox ? "Click to expand" : "Hide");
};

const handleSave = async (dataId) => {
  // passing: imageUrl, description, title, min60, min90, dataId
  if(dataId != null) {
    try {
      // update the service
      setTimeout(()=>{
        updateMutation(dataId, title, description, min60, min90, imageUrl)
    }, 2000)
    } catch (error) {
      console.error("Error occurred while updating service: ", error);
    }
  } // end: if (dataId != null)
  else {
    try {
      // add the service
      addService(title, description, min60, min90, imageUrl )
      setTimeout(()=>{
        window.location.reload()
      },2250)
    } catch (error) {
      console.error("Unknown error occurred while adding service: ", error);
    }
  }
};

const handleDelete = (dataId) => {
  // delete the service
  try{
    deleteMutation(dataId)
    setTimeout(()=>{
      window.location.reload()
  },2250)
  }catch(error){
    console.error("Error occurred while deleting service: ", error);
    alert(error)
  }
};

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
      {updatedService ? (<ModalHeader>Update Service</ModalHeader>) : (<ModalHeader>Add Service</ModalHeader>)}
        <ModalCloseButton />
        <ModalBody>
          <Box
            w="100%"
            p={5}
            boxShadow="xl"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Input
              placeholder="Title"
              mb={4}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <Textarea
              placeholder="Description"
              mb={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {showTextBox && (
              <HStack>
                <Input
                placeholder="Add Image URL"
                mb={14}
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <VStack>
                <Input
                placeholder="60min Price"
                mb={1}
                value={min60}
                onChange={(e) => setMin60(e.target.value)}
              />
                <Input
                placeholder="90min price"
                mb={1}
                value={min90}
                onChange={(e) => setMin90(e.target.value)}
              />
              </VStack>
              </HStack>
            )}
            <HStack justifyContent="space-between">
              <Button
                bgColor="#476c30e6"
                w="160px"
                h="53px"
                mb="15%"
                onClick={handleImageURL}
              >
                <Text
                  fontFamily="Inter-Regular"
                  fontSize="16px"
                  color="#ffffff"
                >
                  {buttonText}
                </Text>
              </Button>
              <Box mt="15%">
                {showTextBox && (
                  <Button m={3} 
                  colorScheme="blue"
                  data-id={updatedService?.element}
                  onClick={(e)=>{
                    const newClickCount = clickCount + 1;
                    setClickCount(newClickCount);
                  if (newClickCount === 1) {
                    setSaveButtonText("Confirm Save?"); 
                  } else if (newClickCount === 2) {
                    handleSave(e.currentTarget.getAttribute('data-id')) 
                    // close the modal and reset the button text here
                    onClose(); // onClose passed through props from parent 
                    setSaveButtonText("Save");
                    setClickCount(0);  // reset the click count
                    setConfetti(true); // blow out confetti
                    setTimeout(() => {
                      setConfetti(false);
                    }, 2000)
                  }}}
                  >
                   {saveButtonText}
                  </Button>
                  // delete button
                )}{updatedService && (
                <Button
                data-id={updatedService?.element}
                colorScheme="blue" 
                onClick={e => {
                    const newClickCount = clickCount + 1;
                    setClickCount(newClickCount);
                  if (newClickCount === 1) {
                    setDeleteButtonText("Confirm Delete?"); 
                  } else if (newClickCount === 2) {
                    handleDelete(e.currentTarget.getAttribute('data-id'));
                    // close the modal and reset the button text here
                    onClose(); // onClose passed through props from parent 
                    setDeleteButtonText("Delete");
                    setClickCount(0);  // reset the click count
                    setConfetti(true); // blow confetti
                    setTimeout(() => {
                      setConfetti(false);
                    }, 2000)
                    }}}
                >
                  {deleteButtonText}
                </Button>
                )}
              </Box>
            </HStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
    <Confetti active={confetti} config={confettiConfig} />
    </>
  )
}

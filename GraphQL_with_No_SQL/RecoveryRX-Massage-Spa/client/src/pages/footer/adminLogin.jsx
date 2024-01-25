import React, { useState, useEffect} from "react";
import { useMutation } from '@apollo/client'
import {LOGIN_USER} from '../../utils/mutations'

import {
  Box,
  Text,
  Button,
  Input,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel
} from "@chakra-ui/react";
export const AdminLogin = ({ isOpen, onClose }) => {

  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loginUser, { loading: updateLoading, error: updateError }] = useMutation(LOGIN_USER);
  const[errorMessage, setErrorMessage] = useState("");

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  function handleEmailInput(event) {
    const result = emailRegex.test(event.target.value);
    (!result) ? (setEmailError(true)) : (
      setEmailError(false),
      setEmail(event.target.value)
    );
  }

  const handleLogin = async () => {
    // Here, you can handle the login logic
    
    if(email && password){
      try{
        const { data } = await loginUser({
          variables : { 
            email: email,
            password: password
        } 
        }) 
        const { token } = data.loginUser;  // This assumes your GraphQL query returns a 'loginUser' field with a 'token' and 'user'.
        localStorage.setItem('id_token', token)
        window.location.replace('/services') // send the logged in user to "/"
      }catch (e) {
        // login failure, throw an alert
        setErrorMessage(e.message)
        setShowAlert(true);
      }
    } else{
      console.log("No user data captured")
    }
    //console.log("Logging in with", email, password);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Admin Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="email" mb={4} isInvalid={emailError}>
            <FormLabel>Email</FormLabel>
            <Input type='email' placeholder="Email" onChange={handleEmailInput}/>
            {!emailError ? (
              <div></div>
            ) : (
              <FormErrorMessage>Invalid Email Address</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="password" isInvalid={errorMessage}>
          <FormLabel>Password</FormLabel>
            <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {!errorMessage ? (
              <div></div>
              ) : (
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={handleLogin}>
            Log in
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

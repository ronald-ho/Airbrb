import React from 'react';
import register from '../api/auth/register';
import { Box, Button, Flex, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import Popup from '../components/Popup';

function Register () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [showPopup, setShowPopup] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setShowPopup(true);
      return;
    }

    try {
      await register(email, password, name);
      // Handle successful registration here (e.g., redirect to login page)
    } catch (error) {
      setError(error.message);
      setShowPopup(true);
    }
  };

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box p={8} width="50%" borderWidth={1} borderRadius={25} boxShadow="lg" bg="white">
        <VStack spacing={4}>
          <h1>Register</h1>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" value={name} onChange={handleChange(setName)}/>
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={handleChange(setEmail)}/>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={handleChange(setPassword)}/>
          </FormControl>
          <FormControl id="confirm-password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" value={confirmPassword} onChange={handleChange(setConfirmPassword)}/>
          </FormControl>
          <Button type="submit" colorScheme="blue" onClick={handleSubmit}>
            Register
          </Button>
        </VStack>
      </Box>
      {showPopup && (
        <Popup title="Error" body={error} primaryButtonText="OK" onClose={handleClosePopup}/>
      )}
    </Flex>
  );
}

export default Register;

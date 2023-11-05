import React from 'react';
import login from '../api/auth/login';
import { Box, Button, Flex, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import Popup from '../components/Popup';

function Login () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [showPopup, setShowPopup] = React.useState(false);

  const handleSubmit = async () => {
    try {
      await login(email, password);
      localStorage.setItem('email', email);
    } catch (error) {
      setError(error.message);
      setShowPopup(true);
    }
  }

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box p={8} width="50%" borderWidth={1} borderRadius={25} boxShadow="lg" bg="white">
        <VStack spacing={4}>
          <h1>Login</h1>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={handleChange(setEmail)}/>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={handleChange(setPassword)}/>
          </FormControl>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Login
          </Button>
        </VStack>
      </Box>
      {showPopup && (
        <Popup title="Error" body={error} primaryButtonText="OK" onClose={setShowPopup(false)}/>
      )}
    </Flex>
  );
}

export default Login;

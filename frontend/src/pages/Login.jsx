import React, { useContext } from 'react';
import login from '../api/auth/login';
import { Button, FormControl, FormLabel, Input, useToast, VStack } from '@chakra-ui/react';
import Popup from '../components/Popup';
import CenteredBox from '../components/CenteredBox';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';

function Login () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [showPopup, setShowPopup] = React.useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { logIn } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      await login(email, password);
      logIn();
      localStorage.setItem('email', email);
      navigate('/');
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      setError(error.message);
      setShowPopup(true);
    }
  }

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  }

  return (
    <CenteredBox>
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
        <Link to="/register">Register</Link>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Login
        </Button>
      </VStack>
      {showPopup && (
        <Popup title="Error" body={error} primaryButtonText="OK" onClose={() => setShowPopup(false)}
               onConfirm={() => setShowPopup(false)}/>
      )}
    </CenteredBox>
  );
}

export default Login;

import React from 'react';
import register from '../api/auth/register';
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import Popup from '../components/Popup';
import CenteredBox from '../components/CenteredBox';
import { useNavigate } from 'react-router-dom';

function Register () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [showPopup, setShowPopup] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setShowPopup(true);
      return;
    }

    try {
      await register(email, password, name);
      navigate('/login');
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
    <CenteredBox>
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
      {showPopup && (
        <Popup title="Error" body={error} primaryButtonText="OK" onClose={handleClosePopup}/>
      )}
    </CenteredBox>
  );
}

export default Register;

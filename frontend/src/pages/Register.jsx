import React from 'react';
import register from '../api/auth/register';
import { Button, FormControl, FormLabel, Input, useToast, VStack } from '@chakra-ui/react';
import Popup from '../components/Popup';
import CenteredBox from '../components/CenteredBox';
import { useNavigate } from 'react-router-dom';

/**
 * This component represents the registration form.
 * It allows users to enter their name, email, password, and confirm password to register.
 * If the passwords do not match or if there's an error during registration, it displays an error popup.
 */
function Register () {
  // State variables to store form input values and error messages.
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [showPopup, setShowPopup] = React.useState(false);

  // React Router's navigation hook.
  const navigate = useNavigate();

  // Chakra UI's toast notification hook.
  const toast = useToast();

  // Function to handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match.
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setShowPopup(true);
      return;
    }

    try {
      // Call the registration API.
      await register(email, password, name);
      // Redirect to the login page after successful registration.
      navigate('/login');
      // Show a success toast notification.
      toast({
        title: 'Registration successful, please login',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // Handle registration error by displaying an error message in a popup.
      setError(error.message);
      setShowPopup(true);
    }
  };

  // Function to handle input field changes.
  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  return (
    <CenteredBox>
      <VStack spacing={4}>
        <h1>Register</h1>
        {/* Form controls for name, email, password, and confirm password */}
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
        {/* Button to submit the form */}
        <Button type="submit" colorScheme="blue" onClick={handleSubmit}>
          Register
        </Button>
      </VStack>
      {/* Popup component to display errors */}
      {showPopup && (
        <Popup title="Error" body={error} primaryButtonText="OK" onClose={() => setShowPopup(false)}
               onConfirm={() => setShowPopup(false)}/>
      )}
    </CenteredBox>
  );
}

export default Register;

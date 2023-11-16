import { Button, FormControl, FormLabel, Input, useToast, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login from '../api/auth/login';
import { AuthContext } from '../components/AuthProvider';
import CenteredBox from '../components/CenteredBox';
import Popup from '../components/Popup';

/**
 * Login component for user authentication.
 */
function Login () {
  // State variables for email, password, error, and popup visibility
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [showPopup, setShowPopup] = React.useState(false);

  // Access the navigate and toast functions
  const navigate = useNavigate();
  const toast = useToast();

  // Access the logIn function from the AuthContext
  const { logIn } = useContext(AuthContext);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Attempt to log in with email and password
      await login(email, password);

      // If successful, log in the user and set email in localStorage
      logIn();
      localStorage.setItem('email', email);

      // Redirect to the home page and display a success toast
      navigate('/');
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // If there's an error, set the error message and show the popup
      setError(error.message);
      setShowPopup(true);
    }
  };

  // Helper function to update state variables
  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  return (
    <CenteredBox>
      <VStack spacing={4}>
        {/* Heading */}
        <h1>Login</h1>

        {/* Email input field */}
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={handleChange(setEmail)}/>
        </FormControl>

        {/* Password input field */}
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={handleChange(setPassword)}/>
        </FormControl>

        {/* Link to register */}
        <Link to="/register">Register</Link>

        {/* Login button */}
        <Button type="submit" colorScheme="blue" onClick={handleSubmit}>
          Login
        </Button>
      </VStack>

      {/* Popup for displaying errors */}
      {showPopup && (
        <Popup
          title="Error"
          body={error}
          primaryButtonText="OK"
          onClose={() => setShowPopup(false)}
          onConfirm={() => setShowPopup(false)}
        />
      )}
    </CenteredBox>
  );
}

export default Login;

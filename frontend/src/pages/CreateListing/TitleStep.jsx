import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './ListingContext';
import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import FormInput from '../../components/FormInput';

const TitleStep = ({ onSubmit, onBack }) => {
  const { listingData } = useContext(ListingContext);
  const [title, setTitle] = useState(listingData.title || '');

  useEffect(() => {
    setTitle(listingData.title || '');
  }, [listingData.title]);

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const handleNext = (event) => {
    event.preventDefault();
    onSubmit({ title });
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box p={8} width="50%" borderWidth={1} borderRadius={25} boxShadow="lg" bg="white">
        <VStack spacing={4}>
          <h1>Choose a Title for your Airbrb!</h1>
          <FormInput name="title" label="Title" type="text" value={title} onChange={handleInputChange}/>
        </VStack>
        <Flex justify="space-between" mt={4}>
          <Button colorScheme="gray" onClick={onBack}>Back</Button>
          <Button colorScheme="blue" onClick={handleNext}>Next</Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default TitleStep;

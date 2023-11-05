import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './ListingContext';
import { Box, Button, Flex, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

const BathroomsStep = ({ onSubmit, onBack }) => {
  const { listingData } = useContext(ListingContext);
  const [bathrooms, setBathrooms] = useState(listingData.bathrooms || '');

  useEffect(() => {
    setBathrooms(listingData.bathrooms || '');
  }, [listingData.bathrooms]);

  const handleNext = (event) => {
    event.preventDefault();
    onSubmit({ bathrooms });
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box p={8} width="50%" borderWidth={1} borderRadius={25} boxShadow="lg" bg="white">
        <VStack spacing={4}>
          <h1>Bathrooms</h1>
          <FormControl id="bathrooms" isRequired>
            <FormLabel>Bathrooms</FormLabel>
            <Input type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}/>
          </FormControl>
        </VStack>
        <Flex justify="space-between" mt={4}>
          <Button colorScheme="gray" onClick={onBack}>Back</Button>
          <Button colorScheme="blue" onClick={handleNext}>Next</Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export default BathroomsStep

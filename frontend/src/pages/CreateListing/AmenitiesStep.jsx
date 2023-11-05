import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './ListingContext';
import { Box, Button, Flex, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

const AmenitiesStep = ({ onSubmit, onBack, handleSubmit }) => {
  const { listingData } = useContext(ListingContext);
  const [amenitiesInput, setAmenitiesInput] = useState(listingData.amenities?.join(', ') || '');

  useEffect(() => {
    setAmenitiesInput(listingData.amenities?.join(', ') || '');
  }, [listingData.amenities]);

  const handleAmenitiesSubmit = (event) => {
    event.preventDefault();
    const amenitiesArray = amenitiesInput.split(',').map(item => item.trim());
    onSubmit({ amenities: amenitiesArray });
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box p={8} width="50%" borderWidth={1} borderRadius={25} boxShadow="lg" bg="white">
        <VStack spacing={4}>
          <h1>Amenities</h1>
          <FormControl id="amenities" isRequired>
            <FormLabel>Amenities</FormLabel>
            <Input type="text" value={amenitiesInput} onChange={(e) => setAmenitiesInput(e.target.value)}
                   placeholder="Enter amenities separated by commas"/>
          </FormControl>
        </VStack>
        <Flex justify="space-between" mt={4}>
          <Button colorScheme="gray" onClick={onBack}>Back</Button>
          <Button colorScheme="blue" onClick={handleAmenitiesSubmit}>Submit</Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export default AmenitiesStep;

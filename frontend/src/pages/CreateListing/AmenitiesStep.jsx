import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './ListingContext';
import { Box, Button, Flex, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

const AmenitiesStep = ({ onSubmit, onBack }) => {
  const { listingData } = useContext(ListingContext);
  const [amenities, setAmenities] = useState(listingData.amenities || '');

  useEffect(() => {
    setAmenities(listingData.amenities || '');
  }, [listingData.amenities]);

  const handleNext = (event) => {
    event.preventDefault();
    onSubmit({ amenities });
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box p={8} width="50%" borderWidth={1} borderRadius={25} boxShadow="lg" bg="white">
        <VStack spacing={4}>
          <h1>Amenities</h1>
          <FormControl id="amenities" isRequired>
            <FormLabel>Amenities</FormLabel>
            <Input type="text" value={amenities} onChange={(e) => setAmenities(e.target.value)}/>
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

export default AmenitiesStep

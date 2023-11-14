import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './ListingContext';
import { Button, Flex, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import CenteredBox from '../../components/CenteredBox';

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
    <CenteredBox>
      <VStack spacing={4}>
        <h1>Amenities</h1>
        <FormControl id="amenities" isRequired>
          <FormLabel>Amenities</FormLabel>
          <Input type="text" value={amenitiesInput} onChange={(event) => setAmenitiesInput(event.target.value)}
                 placeholder="Enter amenities separated by commas"/>
        </FormControl>
      </VStack>
      <Flex justify="space-between" mt={4}>
        <Button colorScheme="gray" onClick={onBack}>Back</Button>
        <Button colorScheme="blue" onClick={handleAmenitiesSubmit} disabled={!amenitiesInput.trim()}>Submit</Button>
      </Flex>
    </CenteredBox>
  );
}

export default AmenitiesStep;

import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './ListingContext';
import { Button, Flex, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import CenteredBox from '../../components/CenteredBox';

/**
 * AmenitiesStep component represents the step in the listing creation process
 * where the user enters amenities for the listing.
 * @param {function} onSubmit - Callback function to submit the amenities data.
 * @param {function} onBack - Callback function to navigate back to the previous step.
 * @param {function} handleSubmit - Callback function to handle the final submission.
 */
const AmenitiesStep = ({ onSubmit, onBack, handleSubmit }) => {
  // Access listing data from the context
  const { listingData } = useContext(ListingContext);

  // Initialize and manage the amenitiesInput state
  const [amenitiesInput, setAmenitiesInput] = useState(listingData.amenities?.join(', ') || '');

  // Update the amenitiesInput state when listingData.amenities changes
  useEffect(() => {
    setAmenitiesInput(listingData.amenities?.join(', ') || '');
  }, [listingData.amenities]);

  // Handle the submission of amenities
  const handleAmenitiesSubmit = (event) => {
    event.preventDefault();

    // Split the input into an array of amenities, removing leading and trailing spaces
    const amenitiesArray = amenitiesInput.split(',').map(item => item.trim());

    // Trigger the onSubmit callback with the amenities data
    onSubmit({ amenities: amenitiesArray });
  };

  return (
    <CenteredBox>
      <VStack spacing={4}>
        <h1>Amenities</h1>

        {/* Form control for entering amenities */}
        <FormControl id="amenities" isRequired>
          <FormLabel>Amenities</FormLabel>
          <Input
            type="text"
            value={amenitiesInput}
            onChange={(event) => setAmenitiesInput(event.target.value)}
            placeholder="Enter amenities separated by commas"
          />
        </FormControl>
      </VStack>

      {/* Render "Back" and "Submit" buttons for navigation */}
      <Flex justify="space-between" mt={4}>
        <Button colorScheme="gray" onClick={onBack}>Back</Button>
        <Button colorScheme="blue" onClick={handleAmenitiesSubmit} disabled={!amenitiesInput.trim()}>Submit</Button>
      </Flex>
    </CenteredBox>
  );
}

export default AmenitiesStep;

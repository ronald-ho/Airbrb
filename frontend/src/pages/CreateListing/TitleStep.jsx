import { Button, Flex, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import CenteredBox from '../../components/CenteredBox';
import FormInput from '../../components/FormInput';
import { ListingContext } from './ListingContext';

/**
 * TitleStep component represents the step in the listing creation process
 * where the user chooses a title for their listing.
 * @param {function} onSubmit - Callback function to submit the title data.
 */
const TitleStep = ({ onSubmit }) => {
  // Access listing data from the context
  const { listingData } = useContext(ListingContext);

  // Initialize and manage the title state
  const [title, setTitle] = useState(listingData.title || '');

  // Update the title state when listingData.title changes
  useEffect(() => {
    setTitle(listingData.title || '');
  }, [listingData.title]);

  // Handle input changes and update the title state
  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  // Handle the "Next" button click and trigger the onSubmit callback
  const handleNext = (event) => {
    event.preventDefault();
    onSubmit({ title });
  };

  return (
    <CenteredBox>
      <VStack spacing={4}>
        <h1>Choose a Title for your Airbnb!</h1>

        {/* Render a FormInput component for entering the title */}
        <FormInput name='title' label='Title' type='text' value={title} onChange={handleInputChange}/>
      </VStack>

      {/* Render a "Next" button to proceed to the next step */}
      <Flex justify='flex-end' mt={4}>
        <Button colorScheme='blue' onClick={handleNext} disabled={!title.trim()}>Next</Button>
      </Flex>
    </CenteredBox>
  );
};

export default TitleStep;

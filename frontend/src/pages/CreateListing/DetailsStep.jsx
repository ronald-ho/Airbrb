import React, { useContext } from 'react';
import { ListingContext } from './ListingContext';
import { Button, Flex, useNumberInput } from '@chakra-ui/react';
import DetailsInputField from '../../components/DetailsInputField';
import CenteredBox from '../../components/CenteredBox';

/**
 * Custom hook to create a number input with specific configuration.
 * @param {number} defaultValue - The default value for the number input.
 * @returns {object} - Number input configuration.
 */
function useCustomNumberInput (defaultValue) {
  return useNumberInput({
    step: 1,
    defaultValue: defaultValue || 0,
    min: 1,
  });
}

/**
 * DetailsStep component represents the step in the listing creation process
 * where the user enters details such as bedrooms, beds, and bathrooms for the listing.
 * @param {function} onSubmit - Callback function to submit the details data.
 * @param {function} onBack - Callback function to navigate back to the previous step.
 */
const DetailsStep = ({ onSubmit, onBack }) => {
  // Access listing data from the context
  const { listingData } = useContext(ListingContext);

  // Create number input configurations for bedrooms, beds, and bathrooms
  const bedroomsInput = useCustomNumberInput(listingData.bedrooms);
  const bedsInput = useCustomNumberInput(listingData.beds);
  const bathroomsInput = useCustomNumberInput(listingData.bathrooms);

  // Function to handle submission
  const handleNext = (event) => {
    event.preventDefault();
    onSubmit({
      bedrooms: bedroomsInput.getInputProps().value,
      beds: bedsInput.getInputProps().value,
      bathrooms: bathroomsInput.getInputProps().value,
    });
  };

  return (
    <CenteredBox>
      <h1>Details</h1>

      {/* Render DetailsInputField components for entering details */}
      <Flex flexDirection="column" spacing={4}>
        <DetailsInputField title="Bedrooms" numberInput={bedroomsInput}/>
        <DetailsInputField title="Beds" numberInput={bedsInput}/>
        <DetailsInputField title="Bathrooms" numberInput={bathroomsInput}/>
      </Flex>

      {/* Render "Back" and "Next" buttons for navigation */}
      <Flex justify="space-between" mt={4}>
        <Button colorScheme="gray" onClick={onBack}>Back</Button>
        <Button colorScheme="blue" onClick={handleNext}>Next</Button>
      </Flex>
    </CenteredBox>
  );
};

export default DetailsStep;

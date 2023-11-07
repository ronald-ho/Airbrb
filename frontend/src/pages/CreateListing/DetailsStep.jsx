import React, { useContext } from 'react';
import { ListingContext } from './ListingContext';
import { Button, Flex, useNumberInput, VStack } from '@chakra-ui/react';
import DetailsInputField from '../../components/DetailsInputField';
import CenteredBox from '../../components/CenteredBox';

function useCustomNumberInput (defaultValue) {
  return useNumberInput({
    step: 1,
    defaultValue: defaultValue || 0,
    min: 0,
  });
}

const DetailsStep = ({ onSubmit, onBack }) => {
  const { listingData } = useContext(ListingContext);

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
    <CenteredBox customStyles={{ minW: '500px' }}>
      <VStack spacing={4}>
        <h1>Details</h1>
        <DetailsInputField title="Bedrooms" numberInput={bedroomsInput}/>
        <DetailsInputField title="Beds" numberInput={bedsInput}/>
        <DetailsInputField title="Bathrooms" numberInput={bathroomsInput}/>
      </VStack>
      <Flex justify="space-between" mt={4}>
        <Button colorScheme="gray" onClick={onBack}>Back</Button>
        <Button colorScheme="blue" onClick={handleNext}>Next</Button>
      </Flex>
    </CenteredBox>
  );
};

export default DetailsStep;

import React, { useContext } from 'react';
import { ListingContext } from './ListingContext';
import { Box, Button, Flex, useNumberInput, VStack } from '@chakra-ui/react';
import DetailsInputField from '../../components/DetailsInputField';

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
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box p={8} width="50%" borderWidth={1} borderRadius={25} boxShadow="lg" bg="white">
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
      </Box>
    </Flex>
  );
};

export default DetailsStep;

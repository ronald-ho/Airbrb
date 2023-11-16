import { Button, Flex, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './ListingContext';
import FormInput from '../../components/FormInput';
import CenteredBox from '../../components/CenteredBox';

/**
 * PriceStep component represents the step in the listing creation process
 * where the user enters the price per night for their listing.
 * @param {function} onSubmit - Callback function to submit the price data.
 * @param {function} onBack - Callback function to navigate back to the previous step.
 */
const PriceStep = ({ onSubmit, onBack }) => {
  // Access listing data from the context
  const { listingData } = useContext(ListingContext);

  // Initialize and manage the price state
  const [price, setPrice] = useState(listingData.price || '');

  // Update the price state when listingData.price changes
  useEffect(() => {
    setPrice(listingData.price || '');
  }, [listingData.price]);

  // Handle input changes and update the price state
  const handleInputChange = (event) => {
    setPrice(event.target.value);
  };

  // Handle the "Next" button click and trigger the onSubmit callback
  const handleNext = (event) => {
    event.preventDefault();

    // Parse the price as an integer before submitting
    onSubmit({ price: parseInt(price) });
  };

  return (
    <CenteredBox>
      <VStack spacing={4}>
        <h1>Price</h1>

        {/* Render a FormInput component for entering the price */}
        <FormInput name="price" label="Price per night" type="number" value={price} onChange={handleInputChange}/>
      </VStack>

      {/* Render "Back" and "Next" buttons for navigation */}
      <Flex justify="space-between" mt={4}>
        <Button colorScheme="gray" onClick={onBack}>Back</Button>
        <Button colorScheme="blue" onClick={handleNext} disabled={!price}>Next</Button>
      </Flex>
    </CenteredBox>
  )
}

export default PriceStep

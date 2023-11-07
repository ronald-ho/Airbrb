import { Button, Flex, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './ListingContext';
import FormInput from '../../components/FormInput';
import CenteredBox from '../../components/CenteredBox';

const PriceStep = ({ onSubmit, onBack }) => {
  const { listingData } = useContext(ListingContext);
  const [price, setPrice] = useState(listingData.price || '');

  useEffect(() => {
    setPrice(listingData.price || '');
  }, [listingData.price]);

  const handleInputChange = (event) => {
    setPrice(event.target.value);
  };

  const handleNext = (event) => {
    event.preventDefault();
    onSubmit({ price: parseInt(price) });
  };

  return (
    <CenteredBox>
      <VStack spacing={4}>
        <h1>Price</h1>
        <FormInput name="price" label="Price per night" type="number" value={price} onChange={handleInputChange}/>
      </VStack>
      <Flex justify="space-between" mt={4}>
        <Button colorScheme="gray" onClick={onBack}>Back</Button>
        <Button colorScheme="blue" onClick={handleNext} disabled={!price.trim()}>Next</Button>
      </Flex>
    </CenteredBox>
  )
}

export default PriceStep

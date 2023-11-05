import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './ListingContext';
import FormInput from '../../components/FormInput';

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
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box p={8} width="50%" borderWidth={1} borderRadius={25} boxShadow="lg" bg="white">
        <VStack spacing={4}>
          <h1>Price</h1>
          <FormInput name="price" label="Price" type="number" value={price} onChange={handleInputChange}/>
        </VStack>
        <Flex justify="space-between" mt={4}>
          <Button colorScheme="gray" onClick={onBack}>Back</Button>
          <Button colorScheme="blue" onClick={handleNext}>Next</Button>
        </Flex>
      </Box>
    </Flex>
  )
}

export default PriceStep

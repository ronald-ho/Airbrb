import { Box, Button, Flex, Image, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './ListingContext';
import houseIcon from '../../assets/house.png'
import apartmentIcon from '../../assets/apartment.png';

const PropertyTypeStep = ({ onSubmit, onBack }) => {
  const { listingData } = useContext(ListingContext);
  const [propertyType, setPropertyType] = useState(listingData.propertyType || '');

  useEffect(() => {
    setPropertyType(listingData.propertyType || '');
  }, [listingData.propertyType]);

  const handleNext = (event) => {
    event.preventDefault();
    onSubmit({ propertyType });
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box p={8} width="50%" borderWidth={1} borderRadius={25} boxShadow="lg" bg="white">
        <VStack spacing={4}>
          <h1>Property Type</h1>
          <Flex justify="space-around" width="100%">
            <VStack spacing={4}>
              <Image src={houseIcon} boxSize="150px" cursor="pointer" onClick={() => setPropertyType('House')}
                     border={propertyType === 'House' ? '1px solid black' : 'none'}
                     borderRadius="lg"/>
              <h1>House</h1>
            </VStack>
            <VStack spacing={4}>
              <Image src={apartmentIcon} boxSize="150px" cursor="pointer" onClick={() => setPropertyType('Apartment')}
                     border={propertyType === 'Apartment' ? '1px solid black' : 'none'}
                     borderRadius="lg"/>
              <h1>Apartment</h1>
            </VStack>
          </Flex>
        </VStack>
        <Flex justify="space-between" mt={4}>
          <Button colorScheme="gray" onClick={onBack}>Back</Button>
          <Button colorScheme="blue" onClick={handleNext}>Next</Button>
        </Flex>
      </Box>
    </Flex>
  )
}

export default PropertyTypeStep;

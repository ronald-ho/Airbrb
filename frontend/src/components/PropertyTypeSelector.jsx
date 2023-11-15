import React from 'react';
import { Flex, Image, VStack } from '@chakra-ui/react';
import houseIcon from '../assets/house.png'
import apartmentIcon from '../assets/apartment.png';

const PropertyTypeSelector = ({ propertyType, onChange }) => {
  return (
    <Flex justify="space-around" width="100%">
      <VStack spacing={4}>
        <Image
          src={houseIcon}
          boxSize="150px"
          cursor="pointer"
          onClick={() => onChange('House')}
          border={propertyType === 'House' ? '1px solid black' : 'none'}
          borderRadius="lg"
          alt="House"/>
        <h1>House</h1>
      </VStack>
      <VStack spacing={4}>
        <Image
          src={apartmentIcon}
          boxSize="150px"
          cursor="pointer"
          onClick={() => onChange('Apartment')}
          border={propertyType === 'Apartment' ? '1px solid black' : 'none'}
          borderRadius="lg"
          alt="Apartment"/>
        <h1>Apartment</h1>
      </VStack>
    </Flex>
  );
};

export default PropertyTypeSelector;

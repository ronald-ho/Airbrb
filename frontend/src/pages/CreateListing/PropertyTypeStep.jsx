import { Button, Flex, Image, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './ListingContext';
import houseIcon from '../../assets/house.png'
import apartmentIcon from '../../assets/apartment.png';
import CenteredBox from '../../components/CenteredBox';

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
    <CenteredBox>
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
        <Button colorScheme="blue" onClick={handleNext} disabled={!propertyType}>Next</Button>
      </Flex>
    </CenteredBox>
  )
}

export default PropertyTypeStep;

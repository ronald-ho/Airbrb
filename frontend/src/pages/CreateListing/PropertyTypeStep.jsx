import { Button, Flex, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './ListingContext';
import CenteredBox from '../../components/CenteredBox';
import PropertyTypeSelector from '../../components/PropertyTypeSelector';

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
    <CenteredBox customStyles={{ minW: '500px' }}>
      <VStack spacing={4}>
        <h1>Property Type</h1>
        <PropertyTypeSelector
          propertyType={propertyType}
          onChange={setPropertyType}
        />
      </VStack>
      <Flex justify=" space-between " mt={4}>
        <Button colorScheme="gray" onClick={onBack}>Back</Button>
        <Button colorScheme="blue" onClick={handleNext} disabled={!propertyType}>Next</Button>
      </Flex>
    </CenteredBox>
  )
}

export default PropertyTypeStep;

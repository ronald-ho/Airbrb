import { Button, Flex, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import CenteredBox from '../../components/CenteredBox';
import PropertyTypeSelector from '../../components/PropertyTypeSelector';
import { ListingContext } from './ListingContext';

/**
 * PropertyTypeStep component represents the step in the listing creation process
 * where the user selects the type of property for their listing.
 * @param {function} onSubmit - Callback function to submit the property type data.
 * @param {function} onBack - Callback function to navigate back to the previous step.
 */
const PropertyTypeStep = ({
  onSubmit,
  onBack
}) => {
  // Access listing data from the context
  const { listingData } = useContext(ListingContext);

  // Initialize and manage the propertyType state
  const [propertyType, setPropertyType] = useState(listingData.propertyType || '');

  // Update the propertyType state when listingData.propertyType changes
  useEffect(() => {
    setPropertyType(listingData.propertyType || '');
  }, [listingData.propertyType]);

  // Handle the "Next" button click and trigger the onSubmit callback
  const handleNext = (event) => {
    event.preventDefault();
    onSubmit({ propertyType });
  };

  return (
    <CenteredBox>
      <VStack spacing={4}>
        <h1>Property Type</h1>

        {/* Render the PropertyTypeSelector component for selecting property type */}
        <PropertyTypeSelector
          propertyType={propertyType}
          onChange={setPropertyType}
        />
      </VStack>

      {/* Render "Back" and "Next" buttons for navigation */}
      <Flex justify='space-between' mt={4}>
        <Button colorScheme='gray' onClick={onBack}>Back</Button>
        <Button colorScheme='blue' onClick={handleNext} disabled={!propertyType}>Next</Button>
      </Flex>
    </CenteredBox>
  )
}

export default PropertyTypeStep;

import { Button, Flex } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import CenteredBox from '../../components/CenteredBox';
import NumberInputFieldCustom from '../../components/NumberInputFieldCustom';
import { ListingContext } from './ListingContext';

const DetailsStep = ({
  onSubmit,
  onBack
}) => {
  const { listingData } = useContext(ListingContext);

  // State for bedrooms, beds, and bathrooms
  const [bedrooms, setBedrooms] = useState(listingData.bedrooms || 0);
  const [beds, setBeds] = useState(listingData.beds || 0);
  const [bathrooms, setBathrooms] = useState(listingData.bathrooms || 0);

  const handleNext = (event) => {
    event.preventDefault();
    onSubmit({
      bedrooms,
      beds,
      bathrooms
    });
  };

  return (
    <CenteredBox>
      <h1>Details</h1>
      <Flex flexDirection='column' spacing={4}>
        <NumberInputFieldCustom title='Bedrooms' value={bedrooms} onChange={setBedrooms}/>
        <NumberInputFieldCustom title='Beds' value={beds} onChange={setBeds}/>
        <NumberInputFieldCustom title='Bathrooms' value={bathrooms} onChange={setBathrooms}/>
      </Flex>
      <Flex justify='space-between' mt={4}>
        <Button colorScheme='gray' onClick={onBack}>Back</Button>
        <Button colorScheme='blue' onClick={handleNext}>Next</Button>
      </Flex>
    </CenteredBox>
  );
};

export default DetailsStep;

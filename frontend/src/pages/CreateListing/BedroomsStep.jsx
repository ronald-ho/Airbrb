import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './ListingContext';
import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import BedroomForm from '../../components/BedroomFrom';
import FormInput from '../../components/FormInput';

const BedroomsStep = ({ onSubmit, onBack }) => {
  const { listingData } = useContext(ListingContext);
  const [bedroomCount, setBedroomCount] = useState(listingData.bedrooms?.length || '');
  const [bedrooms, setBedrooms] = useState(listingData.bedrooms || []);

  useEffect(() => {
    setBedroomCount(listingData.bedrooms?.length || '');
    setBedrooms(listingData.bedrooms || []);
  }, [listingData.bedrooms]);

  const handleBedroomCountChange = (event) => {
    const newCount = parseInt(event.target.value);
    setBedroomCount(newCount);
    setBedrooms(Array(newCount).fill({ bedCount: '', bedType: '' }));
  };

  const handleBedroomChange = (index, key, value) => {
    const updatedBedrooms = [...bedrooms];
    updatedBedrooms[index] = { ...updatedBedrooms[index], [key]: value };
    setBedrooms(updatedBedrooms);
  };

  const handleNext = (event) => {
    event.preventDefault();
    onSubmit({ bedrooms });
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box p={8} width="50%" borderWidth={1} borderRadius={25} boxShadow="lg" bg="white">
        <VStack spacing={4}>
          <h1>Bedrooms</h1>
          <FormInput name="bedroomCount" label="Number of Bedrooms" type="number" value={bedroomCount}
                     onChange={handleBedroomCountChange}/>
          {bedrooms.map((bedroom, index) => (
            <BedroomForm key={index} index={index} bedroom={bedroom} handleBedroomChange={handleBedroomChange}/>
          ))}
        </VStack>
        <Flex justify="space-between" mt={4}>
          <Button colorScheme="gray" onClick={onBack}>Back</Button>
          <Button colorScheme="blue" onClick={handleNext}>Next</Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export default BedroomsStep

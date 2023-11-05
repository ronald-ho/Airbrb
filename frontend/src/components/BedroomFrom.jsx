import React from 'react';
import { FormControl, FormLabel, Input, Select, VStack } from '@chakra-ui/react';

const BedroomForm = ({ index, bedroom, handleBedroomChange }) => {
  return (
    <VStack key={index} spacing={4}>
      <FormControl id={`beds-${index}`} isRequired>
        <FormLabel>{`Bedroom ${index + 1} - Number of Beds`}</FormLabel>
        <Input type="number" value={bedroom.bedCount}
               onChange={(e) => handleBedroomChange(index, 'bedCount', parseInt(e.target.value))}/>
      </FormControl>
      <FormControl id={`bedType-${index}`} isRequired>
        <FormLabel>{`Bedroom ${index + 1} - Bed Type`}</FormLabel>
        <Select value={bedroom.bedType} onChange={(event) => handleBedroomChange(index, 'bedType', event.target.value)}>
          <option value="">Select Bed Type</option>
          <option value="king">King</option>
          <option value="queen">Queen</option>
          <option value="single">Single</option>
        </Select>
      </FormControl>
    </VStack>
  );
};

export default BedroomForm;

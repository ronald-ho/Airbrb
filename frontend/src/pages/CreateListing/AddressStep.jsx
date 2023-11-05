import React, { useContext, useEffect, useState } from 'react';
import { Button, Flex, VStack } from '@chakra-ui/react';
import AddressDto from '../../dto/AddressDto';
import { ListingContext } from './ListingContext';
import FormInput from '../../components/FormInput';
import CenteredBox from '../../components/CenteredBox';

const AddressStep = ({ onSubmit, onBack }) => {
  const { listingData } = useContext(ListingContext);

  const [address, setAddress] = useState({
    number: listingData.address?.number || '',
    street: listingData.address?.street || '',
    city: listingData.address?.city || '',
    state: listingData.address?.state || '',
    postcode: listingData.address?.postcode || '',
    country: listingData.address?.country || ''
  });

  useEffect(() => {
    setAddress(prevAddress => ({ ...prevAddress, ...listingData.address }));
  }, [listingData.address]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevFields) => ({
      ...prevFields,
      [name]: value
    }));
  };

  const handleNext = (event) => {
    event.preventDefault();
    const addressDto = new AddressDto(
      address.number,
      address.street,
      address.city,
      address.state,
      address.postcode,
      address.country
    );
    onSubmit({ address: addressDto });
  };

  return (
    <CenteredBox>
      <VStack spacing={4}>
        <h1>Address</h1>
        <FormInput name="number" label="Number" type="text" value={address.number} onChange={handleInputChange}/>
        <FormInput name="street" label="Street" type="text" value={address.street} onChange={handleInputChange}/>
        <FormInput name="city" label="City" type="text" value={address.city} onChange={handleInputChange}/>
        <FormInput name="state" label="State" type="text" value={address.state} onChange={handleInputChange}/>
        <FormInput name="postcode" label="Post Code" type="text" value={address.postcode}
                   onChange={handleInputChange}/>
        <FormInput name="country" label="Country" type="text" value={address.country} onChange={handleInputChange}/>
      </VStack>
      <Flex justify="space-between" mt={4}>
        <Button colorScheme="gray" onClick={onBack}>Back</Button>
        <Button colorScheme="blue" onClick={handleNext}>Next</Button>
      </Flex>
    </CenteredBox>
  );
};

export default AddressStep;

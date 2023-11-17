import { Button, Flex, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import CenteredBox from '../../components/CenteredBox';
import FormInput from '../../components/FormInput';
import { ListingContext } from './ListingContext';

/**
 * AddressStep component represents the step in the listing creation process
 * where the user enters address details for their listing.
 * @param {function} onSubmit - Callback function to submit the address data.
 * @param {function} onBack - Callback function to navigate back to the previous step.
 */
const AddressStep = ({
  onSubmit,
  onBack
}) => {
  // Access listing data from the context
  const { listingData } = useContext(ListingContext);

  // Initialize and manage the address state
  const [address, setAddress] = useState({
    number: listingData.address?.number || '',
    street: listingData.address?.street || '',
    city: listingData.address?.city || '',
    state: listingData.address?.state || '',
    postcode: listingData.address?.postcode || '',
    country: listingData.address?.country || ''
  });

  // Update the address state when listingData.address changes
  useEffect(() => {
    setAddress(prevAddress => ({ ...prevAddress, ...listingData.address }));
  }, [listingData.address]);

  // Handle input changes and update the address state
  const handleInputChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setAddress((prevFields) => ({
      ...prevFields,
      [name]: value
    }));
  };

  // Check if all address fields are filled
  const areAllFieldsFilled = () => {
    return Object.values(address).every(value => value.trim() !== '');
  };

  // Handle the "Next" button click and trigger the onSubmit callback
  const handleNext = (event) => {
    event.preventDefault();
    onSubmit({ address });
  };

  return (
    <CenteredBox>
      <VStack spacing={4}>
        <h1>Address</h1>

        {/* Render FormInput components for address fields */}
        <FormInput name='number' label='Number' type='text' value={address.number} onChange={handleInputChange}/>
        <FormInput name='street' label='Street' type='text' value={address.street} onChange={handleInputChange}/>
        <FormInput name='city' label='City' type='text' value={address.city} onChange={handleInputChange}/>
        <FormInput name='state' label='State' type='text' value={address.state} onChange={handleInputChange}/>
        <FormInput name='postcode' label='Post Code' type='text' value={address.postcode} onChange={handleInputChange}/>
        <FormInput name='country' label='Country' type='text' value={address.country} onChange={handleInputChange}/>
      </VStack>

      {/* Render "Back" and "Next" buttons for navigation */}
      <Flex justify='space-between' mt={4}>
        <Button colorScheme='gray' onClick={onBack}>Back</Button>
        <Button colorScheme='blue' onClick={handleNext} disabled={!areAllFieldsFilled()}>Next</Button>
      </Flex>
    </CenteredBox>
  );
};

export default AddressStep;

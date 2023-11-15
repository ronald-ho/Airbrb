import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './ListingContext';
import { Button, Flex, VStack } from '@chakra-ui/react';
import FormInput from '../../components/FormInput';
import CenteredBox from '../../components/CenteredBox';

const TitleStep = ({ onSubmit }) => {
  const { listingData } = useContext(ListingContext);
  const [title, setTitle] = useState(listingData.title || '');

  useEffect(() => {
    setTitle(listingData.title || '');
  }, [listingData.title]);

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const handleNext = (event) => {
    event.preventDefault();
    onSubmit({ title });
  };

  return (
    <CenteredBox>
      <VStack spacing={4}>
        <h1>Choose a Title for your Airbrb!</h1>
        <FormInput name="title" label="Title" type="text" value={title} onChange={handleInputChange}/>
      </VStack>
      <Flex justify="flex-end" mt={4}>
        <Button colorScheme="blue" onClick={handleNext} disabled={!title.trim()}>Next</Button>
      </Flex>
    </CenteredBox>
  );
};

export default TitleStep;

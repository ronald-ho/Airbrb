import { Button, Flex, FormControl, FormLabel, Image, Input, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './ListingContext';
import CenteredBox from '../../components/CenteredBox';

const ThumbnailStep = ({ onSubmit, onBack }) => {
  const { listingData } = useContext(ListingContext);
  const [thumbnail, setThumbnail] = useState(listingData.thumbnail || '');
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  useEffect(() => {
    setThumbnail(listingData.thumbnail || '');
    setThumbnailPreview(listingData.thumbnail || '');
  }, [listingData.thumbnail]);

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setThumbnail(base64String);
        setThumbnailPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = (event) => {
    event.preventDefault();
    onSubmit({ thumbnail });
  };

  return (
    <CenteredBox customStyles={{ minW: '500px' }}>
      <VStack spacing={4}>
        <h1>Thumbnail</h1>
        {thumbnailPreview && (
          <Image src={thumbnailPreview} alt="Thumbnail preview" maxWidth="50vw"/>
        )}
        <FormControl id="thumbnail" isRequired>
          <FormLabel>Thumbnail</FormLabel>
          <Input type="file" accept="image/*" onChange={handleThumbnailChange}/>
        </FormControl>
      </VStack>
      <Flex justify="space-between" mt={4}>
        <Button colorScheme="gray" onClick={onBack}>Back</Button>
        <Button colorScheme="blue" onClick={handleNext} disabled={!thumbnail}>Next</Button>
      </Flex>
    </CenteredBox>
  )
}

export default ThumbnailStep

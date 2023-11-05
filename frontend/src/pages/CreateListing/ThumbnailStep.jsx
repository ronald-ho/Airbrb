import { Box, Button, Flex, FormControl, FormLabel, Image, Input, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './ListingContext';

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
      const fileURL = URL.createObjectURL(file);
      setThumbnail(fileURL);
      setThumbnailPreview(fileURL);
    }
  };

  const handleNext = (event) => {
    event.preventDefault();
    onSubmit({ thumbnail });
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box p={8} width="50%" borderWidth={1} borderRadius={25} boxShadow="lg" bg="white">
        <VStack spacing={4}>
          <h1>Thumbnail</h1>
          {thumbnailPreview && (
            <Image src={thumbnailPreview} alt="Thumbnail preview" maxWidth="100%"/>
          )}
          <FormControl id="thumbnail" isRequired>
            <FormLabel>Thumbnail</FormLabel>
            <Input type="file" accept="image/*" onChange={handleThumbnailChange}/>
          </FormControl>
        </VStack>
        <Flex justify="space-between" mt={4}>
          <Button colorScheme="gray" onClick={onBack}>Back</Button>
          <Button colorScheme="blue" onClick={handleNext}>Next</Button>
        </Flex>
      </Box>
    </Flex>
  )
}

export default ThumbnailStep

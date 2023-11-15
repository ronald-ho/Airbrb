import { Button, Flex, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './ListingContext';
import CenteredBox from '../../components/CenteredBox';
import ThumbnailPreview from '../../components/ThumbnailPreview';

ThumbnailPreview.propTypes = {};
const ThumbnailStep = ({ onSubmit, onBack }) => {
  const { listingData } = useContext(ListingContext);
  const [thumbnail, setThumbnail] = useState(listingData.thumbnail || '');
  const [youtubeURL, setYoutubeURL] = useState(listingData.thumbnail || '');

  useEffect(() => {
    setThumbnail(listingData.thumbnail || '');
  }, [listingData.thumbnail]);

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setThumbnail(base64String);
        setYoutubeURL('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleYoutubeURLChange = (event) => {
    setYoutubeURL(event.target.value);
    setThumbnail('');
  };

  const handleNext = (event) => {
    event.preventDefault();
    const thumbnailData = youtubeURL || thumbnail;
    onSubmit({ thumbnail: thumbnailData });
  };

  return (
    <CenteredBox>
      <VStack spacing={4}>
        <h1>Thumbnail</h1>
        <ThumbnailPreview url={listingData.thumbnail}/>
        <FormControl isRequired>
          <FormLabel>Thumbnail</FormLabel>
          <Input type="file" accept="image/*" onChange={handleThumbnailChange}/>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>YouTube URL</FormLabel>
          <Input type="url" value={youtubeURL} onChange={handleYoutubeURLChange} placeholder="Enter YouTube URL"/>
        </FormControl>
      </VStack>
      <Flex justify="space-between" mt={4}>
        <Button colorScheme="gray" onClick={onBack}>Back</Button>
        <Button colorScheme="blue" onClick={handleNext} disabled={!thumbnail && !youtubeURL}>Next</Button>
      </Flex>
    </CenteredBox>
  )
}

export default ThumbnailStep

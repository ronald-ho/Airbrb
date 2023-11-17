import { Button, Flex, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import CenteredBox from '../../components/CenteredBox';
import ThumbnailPreview from '../../components/ThumbnailPreview';
import { ListingContext } from './ListingContext';

/**
 * ThumbnailStep component represents the step in the listing creation process
 * where the user can choose a thumbnail image or provide a YouTube URL for the listing.
 * @param {function} onSubmit - Callback function to submit the thumbnail data.
 * @param {function} onBack - Callback function to navigate back to the previous step.
 */
const ThumbnailStep = ({ onSubmit, onBack }) => {
  // Access listing data from the context
  const { listingData } = useContext(ListingContext);

  // Initialize and manage the thumbnail, YouTube URL, and thumbnailPreview states
  const [thumbnail, setThumbnail] = useState(listingData.thumbnail || '');
  const [youtubeURL, setYoutubeURL] = useState(listingData.thumbnail || '');
  const [thumbnailPreview, setThumbnailPreview] = useState(listingData.thumbnail || '');

  // Update the thumbnail state when listingData.thumbnail changes
  useEffect(() => {
    setThumbnail(listingData.thumbnail || '');
  }, [listingData.thumbnail]);

  // Handle thumbnail file input change
  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setThumbnail(base64String);
        setThumbnailPreview(base64String);
        setYoutubeURL('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleYoutubeURLChange = (event) => {
    setYoutubeURL(event.target.value);
    setThumbnailPreview(event.target.value);
    setThumbnail('');
  };

  // Handle the "Next" button click and trigger the onSubmit callback
  const handleNext = (event) => {
    event.preventDefault();

    // Determine the thumbnail data to submit (either from file or YouTube URL)
    const thumbnailData = youtubeURL || thumbnail;
    onSubmit({ thumbnail: thumbnailData });
  };

  return (
    <CenteredBox>
      <VStack spacing={4}>
        <h1>Thumbnail</h1>

        {/* Render a ThumbnailPreview component to display the chosen thumbnail or YouTube video preview */}
        <ThumbnailPreview url={thumbnailPreview}/>

        {/* Input for selecting a thumbnail image file */}
        <FormControl isRequired>
          <FormLabel>Thumbnail</FormLabel>
          <Input type="file" accept="image/*" onChange={handleThumbnailChange}/>
        </FormControl>

        {/* Input for entering a YouTube URL */}
        <FormControl>
          <FormLabel>YouTube URL</FormLabel>
          <Input type="url" value={youtubeURL} onChange={handleYoutubeURLChange} placeholder="Enter YouTube URL"/>
        </FormControl>
      </VStack>

      {/* Render "Back" and "Next" buttons for navigation */}
      <Flex justify="space-between" mt={4}>
        <Button colorScheme="gray" onClick={onBack}>Back</Button>
        <Button colorScheme="blue" onClick={handleNext} disabled={!thumbnail && !youtubeURL}>Next</Button>
      </Flex>
    </CenteredBox>
  )
}

export default ThumbnailStep

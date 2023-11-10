import React from 'react';
import { Box, Image, IconButton, AspectRatio } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

function ImageCarousel ({ thumbnail, allImages, index, handlePrev, handleNext }) {
  return (
    <Box position='relative'>
    <IconButton
      position='absolute'
      top='50%'
      transform="translateY(-50%)"
      icon={<ArrowLeftIcon />}
      onClick={handlePrev}
      zIndex={100} // Button randomly disappeared after using aspect ratio
    />
    <AspectRatio ratio={4 / 3}>
      <Image src={!allImages ? thumbnail : allImages[index]} width='100%' />
    </AspectRatio>
    <IconButton
      position='absolute'
      top='50%'
      right='0'
      transform="translateY(-50%)"
      icon={<ArrowRightIcon />}
      onClick={handleNext}
    />
  </Box>
  );
}

export default ImageCarousel;

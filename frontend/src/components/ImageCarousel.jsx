import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { AspectRatio, Box, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import ThumbnailPreview from './ThumbnailPreview';

function ImageCarousel ({ allImages }) {
  const [style, setStyle] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const toggleStyle = () => {
    // If there are no extra images, don't show button
    if (allImages.length > 1) setStyle(!style);
  }

  const handlePrev = (event) => {
    event.preventDefault();
    setImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = (event) => {
    event.preventDefault();
    setImageIndex((next) => (next === allImages.length - 1 ? 0 : next + 1));
  };

  return (
    <Box
      position='relative'
      onMouseEnter={toggleStyle}
      onMouseLeave={toggleStyle}
      zIndex={0}
    >
      <IconButton
        position='absolute'
        top='50%'
        left='1'
        transform='translateY(-50%)'
        isRound='true'
        size='sm'
        display={style ? 'block' : 'none'}
        icon={<ArrowLeftIcon/>}
        onClick={handlePrev}
        zIndex={250}
        aria-label='Previous Image'
      />
      <Box rounded='lg' overflow='hidden'>
        <AspectRatio ratio={4 / 3}>
          <ThumbnailPreview url={allImages[imageIndex]} alt={`Image ${imageIndex}`}/>
        </AspectRatio>
      </Box>
      <IconButton
        position='absolute'
        top='50%'
        right='1'
        transform='translateY(-50%)'
        isRound='true'
        size='sm'
        display={style ? 'block' : 'none'}
        icon={<ArrowRightIcon/>}
        onClick={handleNext}
        zIndex={250}
        aria-label='Next Image'
      />
    </Box>
  );
}

export default ImageCarousel;

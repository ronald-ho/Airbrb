import React, { useState } from 'react';
import { Box, Image, IconButton, AspectRatio } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

function ImageCarousel ({ allImages }) {
  const [style, setStyle] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const toggleStyle = () => {
    // If there are no extra images, don't show button
    if (allImages.length > 1) setStyle(!style);
  }

  const handlePrev = () => {
    setImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setImageIndex((next) => (next === allImages.length - 1 ? 0 : next + 1));
  };

  return (
    <Box
      position='relative'
      onMouseEnter={toggleStyle}
      onMouseLeave={toggleStyle}
    >
      <IconButton
        position='absolute'
        top='50%'
        left='1'
        transform="translateY(-50%)"
        isRound='true'
        size='sm'
        display={ style ? 'block' : 'none' }
        icon={<ArrowLeftIcon />}
        onClick={handlePrev}
        zIndex={100}
        aria-label='Previous Image'
      />
      <AspectRatio ratio={4 / 3}>
        <Image src={allImages[imageIndex]} width='100%' alt={`Image ${imageIndex}`} />
      </AspectRatio>
      <IconButton
        position='absolute'
        top='50%'
        right='1'
        transform="translateY(-50%)"
        isRound='true'
        size='sm'
        display={ style ? 'block' : 'none' }
        icon={<ArrowRightIcon />}
        onClick={handleNext}
        aria-label='Next Image'
      />
    </Box>
  );
}

export default ImageCarousel;

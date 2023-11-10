import React, { useState } from 'react';
import { Box, Image, IconButton, AspectRatio } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

function ImageCarousel ({ thumbnail, allImages, index, handlePrev, handleNext }) {
  const [style, setStyle] = useState(false);

  const toggleStyle = () => {
    setStyle(!style);
  }

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
      />
      <AspectRatio ratio={4 / 3}>
        <Image src={!allImages ? thumbnail : allImages[index]} width='100%' />
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
      />
    </Box>
  );
}

export default ImageCarousel;

import { StarIcon } from '@chakra-ui/icons';
import React from 'react';

function StarRating ({ rating }) {
  return (
    Array(5).fill('')
      .map((_, i) => (
        <StarIcon
          key={i}
          color={i < rating ? 'black.400' : 'gray.300'}
        />
      ))
  )
}

export default StarRating;

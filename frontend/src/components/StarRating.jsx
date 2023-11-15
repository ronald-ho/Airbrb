import React from 'react';
import { StarIcon } from '@chakra-ui/icons';

function StarRating ({ rating }) {
  return (
    Array(5).fill('')
      .map((_, i) => (
        <StarIcon
          key={i}
          color={i < rating ? 'black.400' : 'gray.300'}
          aria-label={`Rating of ${rating} stars`}
        />
      ))
  )
}

export default StarRating;

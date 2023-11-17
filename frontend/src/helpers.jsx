// Helper function to calculate average review for listing
import { AspectRatio, Badge, Box, Flex, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import ThumbnailPreview from './components/ThumbnailPreview';

const averageRating = (reviews) => {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return 0;
  }

  let totalRatings = 0;

  for (const review of reviews) {
    totalRatings += Number(review.rating);
  }

  const res = reviews.length ? totalRatings / reviews.length : 0;

  return Math.round(res * 10) / 10;
};

// Converts address json to a string
const addressToString = (address) => {
  return `${address.number} ${address.street}, ${address.city}, ${address.state}`
}

export { averageRating, addressToString };

const Ajv = require('ajv');
export const customAjv = new Ajv({ allErrors: true });

customAjv.addFormat('base64image', {
  type: 'string',
  validate: (data) => {
    if (typeof data !== 'string') return false;
    const regex = /^data:image\/(png|jpeg|jpg);base64,/;
    return regex.test(data);
  }
});

customAjv.addFormat('youtubeUrl', {
  type: 'string',
  validate: (data) => {
    if (typeof data !== 'string') return false;
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+(&[\w-]+)*$/;
    return youtubeRegex.test(data);
  }
});

export const listingSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    address: {
      type: 'object',
      properties: {
        number: { type: 'string' },
        street: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        postcode: { type: 'string' },
        country: { type: 'string' }
      },
      required: ['number', 'street', 'city', 'state', 'postcode', 'country']
    },
    price: {
      type: 'number'
    },
    thumbnail: {
      oneOf: [
        {
          type: 'string',
          format: 'base64image'
        },
        {
          type: 'string',
          format: 'youtubeUrl'
        }
      ]
    },
    metadata: {
      type: 'object',
      properties: {
        propertyType: { type: 'string' },
        bathrooms: { type: 'integer' },
        bedrooms: { type: 'integer' },
        beds: { type: 'integer' },
        amenities: {
          type: 'array',
          items: { type: 'string' }
        },
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'base64image'
          }
        }
      },
      required: ['propertyType', 'bathrooms', 'bedrooms', 'beds', 'amenities', 'images']
    }
  },
  required: ['title', 'address', 'price', 'thumbnail', 'metadata']
}

export const formatOptionLabel = (option) => (
  <Flex align='center'>
    <Box boxSize='60px' mr='10px'>
      <AspectRatio ratio={1}>
        <ThumbnailPreview url={option.photo}/>
      </AspectRatio>
    </Box>
    <HStack justify='space-between' w='100%'>
      <Box>
        <Text fontWeight='semibold' isTruncated>
          {option.label}
        </Text>
        <Badge borderRadius='md' px='2' mr='1'>
          {option.metadata.propertyType}
        </Badge>
      </Box>
      <Box>
        <Box>
          ${option.price}/night
        </Box>
        <Box color='gray.600' fontSize='xs'>
          {option.metadata.bedrooms} BEDS &bull; {option.metadata.bathrooms} BATHS
        </Box>
      </Box>
    </HStack>
  </Flex>
);

export const customSelectStyles = {
  control: (baseStyles) => ({
    ...baseStyles,
    minWidth: '70vw',
    maxWidth: '80vw',
    minHeight: '40px',
    borderRadius: '15px',
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 2000
  }),
};

export const statusColourSchemes = {
  accepted: 'green',
  declined: 'red',
  default: 'gray',
};

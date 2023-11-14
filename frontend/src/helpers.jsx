// Helper function to calculate average review for listing
import { Badge, Box, Flex, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';

const averageRating = (reviews) => {
  let totalRatings = 0;

  for (const review of reviews) {
    totalRatings += Number(review.rating);
  }

  return Math.round((totalRatings / reviews.length) * 10) / 10;
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
    const regex = /^data:image\/(png|jpeg|jpg);base64,/;
    return regex.test(data);
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
      type: 'string',
      format: 'base64image'
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
  <Flex align="center">
    <Image src={option.photo} alt={option.label} boxSize="60px" mr="10px" rounded="xl"/>
    <HStack justify="space-between" w="100%">
      <Box>
        <Text fontWeight="semibold" isTruncated>
          {option.label}
        </Text>
        <Badge borderRadius="md" px="2" mr="1">
          {option.metadata.propertyType}
        </Badge>
      </Box>
      <Box>
        <Box>
          ${option.price}/night
        </Box>
        <Box color="gray.600" fontSize="xs">
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

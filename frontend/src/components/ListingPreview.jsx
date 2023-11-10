import React from 'react';
import { AspectRatio, Badge, Box, Flex, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { averageRating } from '../helpers';
import StarRating from './StarRating';

function ListingPreview (listing, url) {
  // Get review information
  const avgRating = averageRating(listing.reviews);

  // Get metadata for listing
  const metadata = listing.metadata;

  return (
    <Link to={url}>
      <Box>
        <AspectRatio ratio={4 / 3}>
          <Image src={listing.thumbnail} objectFit='contain' />
        </AspectRatio>

        <Box p='1'>
          <Flex>
            <Badge borderRadius='md' px='2' mr='1'>
              {metadata.propertyType}
            </Badge>
            {
              listing.bookingStatus && listing.bookingStatus !== 'zzz'
                ? (<Badge borderRadius='md' px='2' colorScheme='red'>
                  {listing.bookingStatus}
                </Badge>)
                : null
            }
          </Flex>
          <Box
            color='gray.600'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            ml='1'
          >
            {metadata.bedrooms} BEDS &bull; {metadata.bathrooms} BATHS
          </Box>

          <Box
            mt='1'
            fontWeight='semibold'
            lineHeight='tight'
            isTruncated
          >
            {listing.title}
          </Box>

          <Box>
            ${listing.price}
            <Box as='span' color='gray.600' fontSize='sm'>
              /night
            </Box>
          </Box>

          <Flex mt='2' alignItems='center'>
            <StarRating rating={avgRating} />
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              {listing.reviews.length} reviews
            </Box>
          </Flex>
        </Box>
      </Box>
    </Link>
  )
}

export default ListingPreview;

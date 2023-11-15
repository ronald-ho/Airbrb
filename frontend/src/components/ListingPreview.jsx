import React from 'react';
import { AspectRatio, Badge, Box, Flex, Link } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom';
import { averageRating } from '../helpers';
import StarRating from './StarRating';
import ThumbnailPreview from './ThumbnailPreview';

function ListingPreview (listing, url) {
  // Get review information
  const avgRating = averageRating(listing.reviews);

  // Get metadata for listing
  const metadata = listing.metadata;

  console.log('listing', listing)
  console.log('metadata', metadata)

  return (
    <Link as={ReactLink} to={url}>
      <Box rounded='lg' overflow='hidden'>
        <AspectRatio ratio={4 / 3}>
          <ThumbnailPreview url={listing.thumbnail}/>
        </AspectRatio>
      </Box>
      <Box p='1'>
        <Flex>
          <Badge borderRadius='md' px='2' mr='1'>
            {metadata.propertyType}
          </Badge>
          {
            listing.bookingStatus && listing.bookingStatus !== 'zzz'
              ? (
                <Badge
                  borderRadius='md'
                  px='2'
                  colorScheme={listing.bookingStatus === 'accepted' ? 'green' : 'red'}
                >
                  {listing.bookingStatus}
                </Badge>
                )
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
          <StarRating rating={avgRating}/>
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            {listing.reviews.length} reviews
          </Box>
        </Flex>
      </Box>
    </Link>
  )
}

export default ListingPreview;

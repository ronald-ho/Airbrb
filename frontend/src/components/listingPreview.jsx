import React from 'react';
import { Badge, Box, Image } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

<<<<<<< HEAD
function ListingPreview (listing) {
  // Get review information
=======
function listingPreview (listing) {
>>>>>>> 22ee39101905cf5f83eb0336abfd6120ffe835c6
  let totalRatings = 0;

  for (const review of listing.reviews) {
    totalRatings += review.rating;
  }

  const avgRating = totalRatings / listing.reviews.length;

  // Get metadata for listing
  const metadata = listing.metadata;

  return (
<<<<<<< HEAD
    <Link to={`/listing/${listing.listingId}`}>
      <Box>
        <Image src={listing.thumbnail} />
        <Box p='6'>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
              {metadata.propertyType}
            </Badge>
            {
              listing.bookingStatus && listing.bookingStatus !== 'zzz'
                ? (<Badge borderRadius='full' px='2' colorScheme='red'>
                  {listing.bookingStatus}
                </Badge>)
                : null
            }
          </Box>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            {metadata.bedrooms} beds &bull; {metadata.bathrooms} baths
=======
    <Box>
      <Image src={listing.thumbnail}/>
      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            {metadata.propertyType}
          </Badge>
          {
            listing.bookingStatus && listing.bookingStatus !== 'zzz'
              ? (<Badge borderRadius='full' px='2' colorScheme='red'>
                {listing.bookingStatus}
              </Badge>)
              : null
          }
        </Box>
        <Box
          color='gray.500'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='xs'
          textTransform='uppercase'
          ml='2'
        >
          {metadata.bedrooms.length} beds &bull; {metadata.bathrooms} baths
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          isTruncated
        >
          {listing.title}
        </Box>

        <Box>
          ${listing.price}
          <Box as='span' color='gray.600' fontSize='sm'>
            / wk
>>>>>>> 22ee39101905cf5f83eb0336abfd6120ffe835c6
          </Box>

          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
          >
            {listing.title}
          </Box>

          <Box>
            ${listing.price}
            <Box as='span' color='gray.600' fontSize='sm'>
              / wk
            </Box>
          </Box>

          <Box display='flex' mt='2' alignItems='center'>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < avgRating ? 'teal.500' : 'gray.300'}
                />
              ))}
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              {listing.reviews.length} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export default ListingPreview;

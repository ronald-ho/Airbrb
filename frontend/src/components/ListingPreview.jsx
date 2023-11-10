/* eslint-disable */

import React, { useState } from 'react';
import { AspectRatio, Badge, Box, Image, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { averageRating } from '../helpers';
import ImageCarousel from './ImageCarousel';

function ListingPreview (listing, url) {
  // Get review information
  const avgRating = averageRating(listing.reviews);

  // Get metadata for listing
  const metadata = listing.metadata;

  // // Image Carousel
  // const allImages = [listing.thumbnail, ...metadata.images];
  // // let imageIndex = 0
  // const [imageIndex, setImageIndex] = useState(0);

  // const handlePrev = () => {
  //   setImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  //   // if (imageIndex === 0) {
  //   //   imageIndex = allImages.length - 1;
  //   // } else {
  //   //   imageIndex -= 1;
  //   // }
  // };

  // const handleNext = () => {
  //   setImageIndex((next) => (next === allImages.length - 1 ? 0 : next + 1));
  //   // if (imageIndex === allImages.length) {
  //   //   imageIndex = 0;
  //   // } else {
  //   //   imageIndex += 1;
  //   // }    
  // };

  return (
    <Link to={url}>
      <Box>
        <AspectRatio ratio={4 / 3}>
          <Image src={listing.thumbnail} objectFit='contain' />
        </AspectRatio>        
        
        {/* <ImageCarousel
          thumbnail={listing.thumbnail}
          allImages={allImages}
          index={imageIndex}
          handlePrev={handlePrev}
          handleNext={handleNext}
        /> */}
        <Box p='1'>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='md' px='2'>
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
            ml='1'
          >
            {metadata.bedrooms} beds &bull; {metadata.bathrooms} baths
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

          <Box display='flex' mt='2' alignItems='center'>
            {Array(5).fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < avgRating ? 'black' : 'gray.300'}
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

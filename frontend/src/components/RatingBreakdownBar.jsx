import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  useDisclosure
} from '@chakra-ui/react'
import React from 'react';
import StarRating from './StarRating';

function RatingBreakdownBar ({ listing, rating }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = (event) => {
    event.preventDefault();
    onOpen(event);
  }

  const getBreakdown = (reviews, rating) => {
    let count = 0;

    for (const review of reviews) {
      if (Number(review.rating) === rating) {
        count += 1;
      }
    }

    const percent = reviews.length ? Math.round((count / reviews.length) * 100) : 0;

    return ([count, percent]);
  }

  const [totalReviews, percent] = getBreakdown(listing.reviews, rating);

  return (
    <Box>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        as='button'
        onClick={handleOpen}
        width='100%'
      >
        <Box width='20%'>{rating} Stars</Box>
        <Progress flexShrink='0' value={percent} width='45%' mx='1' colorScheme='blackAlpha'/>
        <Box width='35%' fontSize='sm'>{percent}%/{totalReviews} reviews</Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>{rating} Star Reviews</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            {listing.reviews.map((review, index) => (
              Number(review.rating) === rating
                ? <Box key={index}>
                  <Box aria-label={`Rating of ${review.rating} stars`}>
                    <StarRating rating={review.rating}/>
                  </Box>
                  {review.message}
                </Box>
                : null
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default RatingBreakdownBar;

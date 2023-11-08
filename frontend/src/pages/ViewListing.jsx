/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getListing } from '../api/listings/actions';
import { Box, Button, Container, FormControl, FormLabel, Image, ListItem, Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, useDisclosure, Stack, Text, UnorderedList, Textarea, Select } from '@chakra-ui/react';
import { averageRating, addressToString } from '../helpers';
import { StarIcon } from '@chakra-ui/icons';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import { createNewBooking } from '../api/booking/actions';
import { reviewListing } from '../api/listings/review';
import { getAllBookings } from '../api/booking';

function ViewListing () {
  const { data } = useParams();

  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState([undefined, undefined]);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(null);
  const [updateReviews, setUpdateReviews] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure()

  let avgRating;
  let metadata;
  let price;

  const parsedData = JSON.parse(data);

  useEffect(() => {
    const fetchListing = async () => {
      const listingResponse = await getListing(parsedData.listingId);

      if (listingResponse.success) {
        setListingData(listingResponse.data.listing);
        setLoading(false);
        console.log('changed loading', loading);
      }
    }

    fetchListing();
  }, []);

  if (loading) {
    return (
      <Box>Loading</Box>
    );
  } else {
    avgRating = averageRating(listingData.reviews);
    metadata = listingData.metadata;

    // Get prices by night or stay
    if (parsedData.floorDate && parsedData.ceilDate) {
      const floorDate = new Date(parsedData.floorDate);
      const ceilDate = new Date(parsedData.ceilDate);

      const days = Math.floor((ceilDate - floorDate) / (1000 * 60 * 60 * 24));

      price = days * listingData.price;

      // Also populate booking dates
      if (selectedDates[0] === undefined && selectedDates[1] === undefined) {
        setSelectedDates([floorDate, ceilDate]);
      }
    } else {
      price = listingData.price;
    }
  }

  const sendBookingRequest = async () => {
    const days = Math.floor((selectedDates[1] - selectedDates[0]) / (1000 * 60 * 60 * 24));

    const body = {
      totalPrice: days * listingData.price,
      dateRange: selectedDates,
    }

    const bookingResponse = await createNewBooking(parsedData.listingId, body);

    if (bookingResponse.bookingId) {
      onOpen();
    }
  };

  const handleReviewTextChange = (e) => setReviewText(e.target.value);
  const handleRatingChange = (e) => setReviewRating(e.target.value);

  const submitReview = async () => {
    console.log(reviewText);
    console.log(reviewRating);
    // Get all bookings for listing and check if user has made an accepted booking
    const allBookingsResponse = await getAllBookings();

    let bookingId;
    if (allBookingsResponse.success) {
      console.log('bookings', allBookingsResponse.data.bookings);
      for (const booking of allBookingsResponse.data.bookings) {
        console.log(booking.owner, booking.status);
        if (booking.owner === localStorage.getItem('email') && booking.status === 'accepted') {
          bookingId = booking.id;
          break;
        }
      }
    }

    if (!bookingId) {
      console.log('user has not made any accepted bookings');
      return;
    }

    console.log(bookingId);

    
    const body = {
      review: {
        rating: reviewRating,
        message: reviewText,
      }
    };

    const reviewResponse = await reviewListing(parsedData.listingId, bookingId, body);
    console.log(reviewResponse);
    listingData.reviews.push(body.review);
    setUpdateReviews(!updateReviews);
  }

  return (
    <Container>
      <Box>{listingData.title}</Box>
      <Stack>
        <Box display='flex'>
          <StarIcon />
          <Text>{avgRating}</Text>
        </Box>
        <Box>{addressToString(listingData.address)}</Box>
      </Stack>
      <Box>
        <Image src={listingData.thumbnail} />
      </Box>
      <Box>
        <Text>{metadata.propertyType}</Text>
        <Text>{metadata.bedrooms} bedrooms / {metadata.beds} beds / {metadata.bathrooms} baths</Text>
      </Box>
      <Box>
        <Text>What this place offers</Text>
        <UnorderedList>
          {metadata.amenities.map((amenity, index) => (
            <ListItem key={index}>{amenity}</ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Box display='flex' flexDirection='column'>
        <Text>Reviews</Text>
        {
          localStorage.getItem('token')
            ? <Box>
              <Text>Leave a review</Text>
              {/* {Array(5)
                .fill('')
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < avgRating ? 'teal.500' : 'gray.300'}
                  />
                ))}               */}
                <Select onChange={handleRatingChange} defaultValue='none'>
                  <option value='none'>None</option>
                  <option value='1'>1 Star</option>
                  <option value='2'>2 Star</option>
                  <option value='3'>3 Star</option>
                  <option value='4'>4 Star</option>
                  <option value='5'>5 Star</option>
                </Select>                
                

                <Textarea placeholder='Write a review' value={reviewText} onChange={handleReviewTextChange}></Textarea>
                <Button onClick={submitReview}>Submit Review</Button>
              </Box>
            : null
        }
        {listingData.reviews.map((review, index) => (
          <Box key={index}>
            {review.rating} {review.message}
          </Box>
        ))}
      </Box>
      <Box>
        <Text>${price}{(parsedData.floorDate && parsedData.ceilDate) ? '/stay' : '/night'}</Text>
      </Box>
      <Box>
        <Text>Request to book</Text>
        <FormControl>
          <FormLabel>Dates</FormLabel>
          <RangeDatepicker
            selectedDates={selectedDates}
            onDateChange={setSelectedDates}
          />
        </FormControl>
        <Button onClick={sendBookingRequest}>Request to book</Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>        
          <ModalBody>
            Booking Confirmed!
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default ViewListing;

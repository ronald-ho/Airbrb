import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getListing } from '../api/listings/actions';
import {
  Badge,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  ListItem,
  Select,
  Stack,
  StackDivider,
  Text,
  Textarea,
  UnorderedList,
  useToast
} from '@chakra-ui/react';
import { addressToString, averageRating } from '../helpers';
import { StarIcon } from '@chakra-ui/icons';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import { createNewBooking } from '../api/booking/actions';
import { reviewListing } from '../api/listings/review';
import { getAllBookings } from '../api/booking';
import ImageCarousel from '../components/ImageCarousel';
import StarRating from '../components/StarRating';
import { AuthContext } from '../components/AuthProvider';

function ViewListing () {
  // URL Information
  const { data } = useParams();
  const parsedData = JSON.parse(data);
  const toast = useToast();

  // Initial load for listing data
  useEffect(() => {
    const fetchListing = async () => {
      const listingResponse = await getListing(parsedData.listingId);

      if (listingResponse.success) {
        setListingData(listingResponse.data.listing);
        setLoading(false);
      }
    }

    fetchListing();
  }, []);

  // Display Data
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState([undefined, undefined]);

  let avgRating;
  let metadata;
  let price;

  // Hooks to support review functionality
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(null);
  const [updateReviews, setUpdateReviews] = useState(false);

  // Image Carousel
  const [allImages, setAllImages] = useState(null);

  const { isLoggedIn } = useContext(AuthContext);

  if (loading) {
    return (
      <Box>Loading</Box>
    );
  } else {
    avgRating = averageRating(listingData.reviews);
    metadata = listingData.metadata;

    if (!allImages) {
      setAllImages([listingData.thumbnail, ...metadata.images]);
    }

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
    // if selectedDates is empty
    if (selectedDates[0] === undefined || selectedDates[1] === undefined) {
      toast({
        title: "Can't submit booking.",
        description: 'Please select a date range',
        status: 'error',
        duration: 3000,
        variant: 'subtle',
        isClosable: true,
      });
      return;
    }

    if (!isLoggedIn) {
      toast({
        title: "Can't submit booking.",
        description: 'Please log in to submit a booking',
        status: 'error',
        duration: 3000,
        variant: 'subtle',
        isClosable: true,
      });
      return;
    }

    const days = Math.floor((selectedDates[1] - selectedDates[0]) / (1000 * 60 * 60 * 24));

    const body = {
      totalPrice: days * listingData.price,
      dateRange: selectedDates,
    }
    try {
      const bookingResponse = await createNewBooking(parsedData.listingId, body);

      if (bookingResponse.bookingId) {
        toast({
          title: 'Booking submitted.',
          status: 'success',
          duration: 3000,
          variant: 'subtle',
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Can't submit booking.",
        description: error.message,
        status: 'error',
        duration: 3000,
        variant: 'subtle',
        isClosable: true,
      });
    }
  };

  // Review Functions
  const handleReviewTextChange = (e) => setReviewText(e.target.value);
  const handleRatingChange = (e) => setReviewRating(e.target.value);

  const submitReview = async () => {
    // Get all bookings for listing and check if user has made an accepted booking
    const allBookingsResponse = await getAllBookings();

    let bookingId;
    if (allBookingsResponse.success) {
      for (const booking of allBookingsResponse.data.bookings) {
        if (booking.owner === localStorage.getItem('email') &&
          booking.status === 'accepted' &&
          booking.listingId === parsedData.listingId
        ) {
          bookingId = booking.id;
          break;
        }
      }
    }

    if (!bookingId) {
      toast({
        title: "Can't submit review.",
        description: 'You have not made any accepted bookings for this listing',
        status: 'error',
        variant: 'subtle',
        isClosable: true,
      });
    }

    const body = {
      review: {
        rating: reviewRating,
        message: reviewText,
      }
    };

    const reviewResponse = await reviewListing(parsedData.listingId, bookingId, body);
    if (reviewResponse.success) {
      // Update list of reviews immediately
      listingData.reviews.push(body.review);
      setUpdateReviews(!updateReviews);
    }
  }

  return (
    <Container px={1}>
      <Heading fontSize='3xl'>{listingData.title}</Heading>
      <Stack>
        <Box display='flex' alignItems='center'>
          <StarIcon aria-label='Star'/>
          <Text px={1}>
            {avgRating || 'No reviews'}
          </Text>
        </Box>
        <Text>{addressToString(listingData.address)}</Text>
      </Stack>
      <ImageCarousel allImages={allImages}/>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent='space-between'
        my='3'
      >
        <Box>
          <Badge fontSize='xl' my='1' borderRadius='md'>{metadata.propertyType}</Badge>
          <Text textTransform='uppercase'
                fontSize='sm'>{metadata.bedrooms} bedrooms &bull; {metadata.beds} beds &bull; {metadata.bathrooms} baths</Text>
          <Heading fontSize='lg' my='1'>Amenities</Heading>
          <UnorderedList pl={6}>
            {metadata.amenities.map((amenity, index) => (
              <ListItem key={index}>{amenity}</ListItem>
            ))}
          </UnorderedList>
        </Box>
        <Stack
          borderWidth={1}
          borderRadius={20}
          width={{ base: '100%', md: '50%' }}
          p={3}
          bg={'white'}
        >
          <Heading fontSize='3xl'>${price}
            <Box as='span' color='gray.600'
                 fontSize='2xl'>{(parsedData.floorDate && parsedData.ceilDate) ? '/stay' : '/night'}</Box>
          </Heading>
          <FormControl>
            <FormLabel>Confirm Dates</FormLabel>
            <RangeDatepicker
              selectedDates={selectedDates}
              onDateChange={setSelectedDates}
            />
          </FormControl>
          <Button onClick={sendBookingRequest} width='100%' colorScheme='red'>Request to book</Button>
        </Stack>
      </Stack>

      <Box display='flex' flexDirection='column'>
        <Heading fontSize='xl'>Reviews</Heading>
        {
          isLoggedIn
            ? <Stack spacing={1}>
              <Heading fontWeight='semibold' fontSize='md' py='1'>Leave a review</Heading>
              <Select onChange={handleRatingChange} defaultValue='none'>
                <option value='none'>Select Rating</option>
                <option value='1'>1 Star</option>
                <option value='2'>2 Star</option>
                <option value='3'>3 Star</option>
                <option value='4'>4 Star</option>
                <option value='5'>5 Star</option>
              </Select>

              <Textarea placeholder='Write a review' value={reviewText} onChange={handleReviewTextChange}></Textarea>
              <Button onClick={submitReview} colorScheme='red'>Submit Review</Button>
            </Stack>
            : <Text>There are no reviews currently</Text>
        }
        <Stack spacing={3} divider={<StackDivider/>}>
          <Box></Box>
          {listingData.reviews.map((review, index) => (
            <Box key={index}>
              <Box>
                <StarRating rating={review.rating}/>
              </Box>
              {review.message}
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>
  );
}

export default ViewListing;

/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getListing } from '../api/listings/actions';
import { Box, Button, Container, FormControl, FormLabel, Image, ListItem, Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, useDisclosure, Stack, Text, UnorderedList } from '@chakra-ui/react';
import { averageRating, addressToString } from '../helpers';
import { StarIcon } from '@chakra-ui/icons';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import { createNewBooking } from '../api/booking/actions';

function ViewListing () {
  const { data } = useParams();

  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState([undefined, undefined]);
  const [confirmModal, setConfirmModal] = useState(false);

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
      setConfirmModal(true);
      console.log('confirmed');
    }
  };

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

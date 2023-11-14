import React, { useEffect, useState } from 'react';
import { getAllBookingDetails } from '../api/booking';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { getAllListingDetailsByUser } from '../api/listings';
import { AbsoluteCenter, Badge, Box, Button, ButtonGroup, Center, Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import { customSelectStyles, formatOptionLabel, statusColourSchemes } from '../helpers';
import moment from 'moment/moment';
import { acceptBooking, declineBooking, deleteBooking } from '../api/booking/actions';

function BookingHistory () {
  const { listingId } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listingBookings, setListingBookings] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listings = await getAllListingDetailsByUser();
        setListings(listings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Listings:', listings);
    if (listingId) {
      setLoading(true);
      const fetchBookings = async () => {
        try {
          const response = await getAllBookingDetails(listingId);
          setListingBookings(response);
          setLoading(false);
          console.log('LISTING BOOKINGS', listingBookings)
        } catch (error) {
          console.error('Error fetching bookings', error);
        }
      }
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    setLoading(false);
  }, [listingBookings]);

  const handleListingChange = async (option) => {
    if (option) {
      setSelectedOption(option);
      // Update the URL without navigating
      window.history.pushState({}, '', `/booking-history/${option.value}`);
      // Manually trigger data fetching
      await fetchDataForListing(option.value);
    }
  };

  const fetchDataForListing = async (id) => {
    setLoading(true);
    try {
      const response = await getAllBookingDetails(id);
      setListingBookings(response);
      console.log('listingBookings', listingBookings)
    } catch (error) {
      console.error('Error fetching bookings ', error);
    }
  };

  const formatDate = (milliseconds) => {
    const date = new Date(milliseconds);
    return moment(date).format('Do of MMMM YYYY');
  };

  if (loading) {
    return (
      <AbsoluteCenter>
        <Spinner/>
      </AbsoluteCenter>
    )
  }

  const handleBookingAction = async (action, bookingId) => {
    try {
      await action(bookingId);
      await fetchDataForListing(selectedOption.value);
    } catch (error) {
      console.error(`Error handling booking action: ${action.name}`, error);
    }
  };

  if (loading) return null;

  return (
    <Flex flexDirection="column" maxHeight="100vh">
      <Select
        className="basic-single"
        options={
          listings.filter(listing => listing.published).map(listing => ({
            value: listing.id,
            label: listing.title,
            photo: listing.thumbnail,
            metadata: listing.metadata,
            price: listing.price
          }))}
        formatOptionLabel={formatOptionLabel}
        onChange={handleListingChange}
        styles={customSelectStyles}
        defaultValue={selectedOption}
      />

      <Flex flexDirection="column">
        {selectedOption && (
          <>
            <Center>
              <VStack>
                <Text fontSize="xl">Listing Details:</Text>
                <Text>Online Duration: {listingBookings.onlineDuration}</Text>
                <Text>Days Booked This Year: {listingBookings.daysBookedThisYear}</Text>
                <Text>Profit This Year: ${listingBookings.profitThisYear}</Text>
              </VStack>
            </Center>

            <Flex flexDirection="column" overflowY="auto" maxHeight="73vh">
              {listingBookings.detailedBookings.length > 0
                ? (
                    listingBookings.detailedBookings.map(booking => (
                    <Flex flexDirection="row" align="center" justify="space-between" key={booking.id} p={2}
                          borderWidth="1px" minWidth="80vw">
                      <Box>
                        <Badge colorScheme={statusColourSchemes[booking.status] || statusColourSchemes.default}>
                          {booking.status}
                        </Badge>
                        <Text>{booking.dateRange.map(date => formatDate(date)).join(' - ')}</Text>
                        <Text>Total Price: ${booking.totalPrice}</Text>
                      </Box>
                      <Box>
                      </Box>
                      {booking.status === 'pending' && (
                        <ButtonGroup spacing="2">
                          <Button colorScheme="green" size="sm"
                                  onClick={() => handleBookingAction(acceptBooking, booking.id)}>Accept</Button>
                          <Button colorScheme="red" size="sm"
                                  onClick={() => handleBookingAction(declineBooking, booking.id)}>Deny</Button>
                          <Button colorScheme="gray" size="sm"
                                  onClick={() => handleBookingAction(deleteBooking, booking.id)}>Delete</Button>
                        </ButtonGroup>
                      )}
                    </Flex>
                    ))
                  )
                : (
                  <Center>
                    <Text fontSize="xl" color="gray.500">Currently there are no bookings.</Text>
                  </Center>
                  )}
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  )
}

export default BookingHistory;

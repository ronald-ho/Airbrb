import React, { useEffect, useState } from 'react';
import { getAllBookingDetails } from '../api/booking';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { getAllListingDetailsByUser } from '../api/listings';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { customSelectStyles, formatOptionLabel } from '../helpers';

function BookingHistory () {
  const { listingId } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listingBookings, setListingBookings] = useState([]);
  const navigate = useNavigate();
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
        } catch (error) {
          console.error('Error fetching bookings', error);
        }
      }
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [listingId]);

  useEffect(() => {
    setLoading(false);
    console.log('listings', listingBookings);
  }, [listingBookings]);

  const handleListingChange = (option) => {
    if (option) {
      setSelectedOption(option)
      navigate(`/booking-history/${option.value}`);
    }
  };

  const formatDuration = (duration) => {
    const parts = [];

    if (duration.years > 0) {
      parts.push(duration.years + (duration.years === 1 ? ' year' : ' years'));
    }

    if (duration.months > 0) {
      parts.push(duration.months + (duration.months === 1 ? ' month' : ' months'));
    }

    if (duration.days > 0) {
      parts.push(duration.days + (duration.days === 1 ? ' day' : ' days'));
    }

    if (duration.hours > 0) {
      parts.push(duration.hours + (duration.hours === 1 ? ' hour' : ' hours'));
    }

    return parts.length > 0 ? parts.join(', ') : 'Less than an hour';
  }

  if (loading) return null;

  return (
    <Flex flexDirection="column">
      <Select
        className="basic-single"
        options={listings.map(listing => ({
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

      <VStack>
        {selectedOption && (
          <>
            <Text fontSize="xl">Listing Details:</Text>
            <Text>Online Duration: {formatDuration(listingBookings.onlineDuration)}</Text>
            <Text>Days Booked This Year: {listingBookings.daysBookedThisYear}</Text>
            <Text>Profit This Year: ${listingBookings.profitThisYear}</Text>
            <Text fontSize="xl">Booking History:</Text>
            {listingBookings.detailedBookings.map(booking => (
              <Box key={booking.id} p={2} borderWidth="1px">
                <Text>Date Range: {booking.dateRange.toString()}</Text>
                <Text>Total Price: ${booking.totalPrice}</Text>
                <Text>Status: {booking.status}</Text>
              </Box>
            ))}
          </>
        )}
      </VStack>
    </Flex>
  )
}

export default BookingHistory;

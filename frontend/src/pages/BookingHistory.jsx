import React, { useEffect, useState } from 'react';
import { getAllBookingDetails } from '../api/booking';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { getAllListingDetailsByUser } from '../api/listings';
import { Badge, Box, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';

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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: '600px',
      fontSize: '16px',
    }),
    option: (provided, state) => ({
      ...provided,
      padding: '20px',
      fontSize: '16px',
    }),
  };

  const formatOptionLabel = (option) => (
    <Flex align="center">
      <Image src={option.photo} alt={option.label} boxSize="60px" mr="10px" rounded="lg"/>
      <HStack justify="space-between" w="100%">
        <Box>
          <Text fontWeight="semibold" isTruncated>
            {option.label}
          </Text>
          <Badge borderRadius="md" px="2" mr="1">
            {option.metadata.propertyType}
          </Badge>
        </Box>
        <Box>
          <Box>
            ${option.price}/night
          </Box>
          <Box color="gray.600" fontSize="xs">
            {option.metadata.bedrooms} BEDS &bull; {option.metadata.bathrooms} BATHS
          </Box>
        </Box>
      </HStack>
    </Flex>
  );

  if (loading) return null;

  return (
    <VStack>
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
        styles={customStyles}
        defaultValue={selectedOption}
      />

      {/* Render booking details */}
    </VStack>
  )
}

export default BookingHistory;

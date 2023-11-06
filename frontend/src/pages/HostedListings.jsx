import React, { useEffect, useState } from 'react';
import { getAllListingDetailsByUser } from '../api/listings';
import listingPreview from '../components/listingPreview';
import { Box, Flex } from '@chakra-ui/react';

function HostedListings () {
  const [listings, setListings] = useState([]);

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

  return (
    <Flex justify="center" minH="100vh">
      <h1>Hosted Listings</h1>
      <Box>
        {listings.map(listing => (
          <Box key={listing.id}>{listingPreview(listing)}</Box>
        ))}
      </Box>
    </Flex>
  )
}

export default HostedListings;

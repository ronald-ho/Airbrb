import { Button, Flex, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllListingDetailsByUser } from '../api/listings';
import listingPreview from '../components/ListingPreview';

/**
 * HostedListings component displays a user's hosted listings.
 */
function HostedListings () {
  // State variables to store listings and login status
  const [listings, setListings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Fetch user's listings
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

  if (!isLoggedIn) {
    // Display a message if the user is not logged in
    return (
      <Flex justify="center" align="center" minH="90vh">
        <Text fontSize="lg">Please login or create an account to view your listings.</Text>
      </Flex>
    );
  }

  return (
    <Flex justify="center" minH="90vh">
      <VStack>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
          width='100%'
          gap='3'
        >
          {listings.map((listing, index) => (
            <GridItem
              width={{ base: '300px', sm: '200px', md: '225px' }}
              key={index}
            >
              {/* Display listing previews */}
              {listingPreview(listing, `/my-listings/edit/${listing.id}`)}
            </GridItem>
          ))}
        </Grid>
        {/* Links for additional functionality */}
        <Link to="/my-listings/profits">
          <Button
            position="fixed"
            bottom="1rem"
            left="2rem"
            backgroundColor="yellow.500"
            color="white"
            borderRadius="full"
            paddingX="4"
            paddingY="2"
            _hover={{ backgroundColor: 'yellow.600' }}
          >
            Profits graph
          </Button>
        </Link>
        <Link to="/booking-history" state={{ listing: listings }}>
          <Button
            position="fixed"
            bottom="7rem"
            right="2rem"
            backgroundColor="blue.500"
            color="white"
            borderRadius="full"
            paddingX="4"
            paddingY="2"
            _hover={{ backgroundColor: 'blue.600' }}
          >
            My Bookings
          </Button>
        </Link>
        <Link to="/publish-listing" state={{ listing: listings }}>
          <Button
            position="fixed"
            bottom="4rem"
            right="2rem"
            backgroundColor="purple.500"
            color="white"
            borderRadius="full"
            paddingX="4"
            paddingY="2"
            _hover={{ backgroundColor: 'purple.600' }}
          >
            Publish a Listing
          </Button>
        </Link>
        <Link to="/create-listing">
          <Button
            position="fixed"
            bottom="1rem"
            right="2rem"
            backgroundColor="teal.500"
            color="white"
            borderRadius="full"
            paddingX="4"
            paddingY="2"
            _hover={{ backgroundColor: 'teal.600' }}
          >
            Create New Listing
          </Button>
        </Link>
      </VStack>
    </Flex>
  );
}

export default HostedListings;

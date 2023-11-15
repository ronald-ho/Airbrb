import React, { useEffect, useState } from 'react';
import { getAllListingDetailsByUser } from '../api/listings';
import listingPreview from '../components/ListingPreview';
import { Button, Flex, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function HostedListings () {
  const [listings, setListings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

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
            >{listingPreview(listing, `/my-listings/edit/${listing.id}`)}</GridItem>
          ))}
        </Grid>
        <Link to="/my-listings/profits">
          <Button
            position="fixed"
            bottom="2rem"
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
            bottom="8rem"
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
            bottom="5rem"
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
            bottom="2rem"
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
  )
}

export default HostedListings;

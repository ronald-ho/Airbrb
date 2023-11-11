import React, { useEffect, useState } from 'react';
import { getAllListingDetailsByUser } from '../api/listings';
import listingPreview from '../components/ListingPreview';
import { Button, Flex, Grid, GridItem, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function HostedListings () {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listings = await getAllListingDetailsByUser();
        setListings(listings);
        console.log(listings)
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, []);

  return (

    <Flex justify="center" minH="100vh">
      <VStack>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap='3'
        >
          {listings.map((listing, index) => (
            <GridItem key={index}>{listingPreview(listing, `/my-listings/edit/${listing.id}`)}</GridItem>
          ))}
        </Grid>
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

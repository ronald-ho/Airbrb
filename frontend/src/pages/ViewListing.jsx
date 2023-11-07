import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getListing } from '../api/listings/actions';
import { Box, Container, Stack, Text } from '@chakra-ui/layout';
import { averageRating, addressToString } from '../helpers';
import { StarIcon } from '@chakra-ui/icons';

function ViewListing () {
  const { id } = useParams();
  console.log(id);

  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      const listingResponse = await getListing(id);

      if (listingResponse.success) {
        setListingData(listingResponse.data.listing);
        setLoading(false);
      }
    }

    fetchListing();
  }, []);

  const avgRating = averageRating(listingData.reviews);
  console.log(loading);

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
      {/* {
        !loading
          ? <Box>{listingData.title}</Box><Box>{avgRating}</Box>
          : null
      } */}
    </Container>
    // <div>
    //   <h1>View Listing</h1>
    // </div>
  );
}

export default ViewListing;

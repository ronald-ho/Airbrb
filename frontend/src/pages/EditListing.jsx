import React, { useEffect, useState } from 'react';
import { getListing } from '../api/listings/actions';
import { Flex, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

function EditListing () {
  const { listingId } = useParams();
  const [setListing] = useState(null);
  const [setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await getListing(listingId);
        if (response.success) {
          setListing(response.data.listing);
          console.log(response.data.listing)
        } else {
          setError(response.error || 'Error fetching listing');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchListing();
  }, [listingId]);

  return (
    <Flex justify="center" minH="100vh">
      <VStack>

      </VStack>
    </Flex>
  );
}

export default EditListing;

/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { getAllListings } from '../api/listings';
import { Container, Flex, Box } from '@chakra-ui/react';
import listingPreview from '../components/listingPreview';
import { getListing } from '../api/listings/actions';
import { getAllBookings } from '../api/booking';

function AllListings () {
  // Get listings data
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get bookings data
  const [bookings, setBookings] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.token) {
          const bookingsResponse = await getAllBookings();
          
          if (!bookingsResponse.success) {
            console.error('Error fetching bookings:', error);
            return null;
          }

          let bookingsDict = {};

          for (const booking of bookingsResponse.data.bookings) {
            console.log('booking', booking);
            bookingsDict[booking.listingId] = booking.status;
          }

          setBookings(bookingsDict);
        }
        
        const listingsResponse = await getAllListings();

        if (!listingsResponse.success) {
          console.error('Error fetching listings:', error);
          return null;
        }

        // Fetch details for each property in the listings
        const propertyDetails = await Promise.all(
          listingsResponse.data.listings.map(async (property) => {
            // Make a separate API call to get details for each property
            const propertyResponse = await getListing(property.id);

            if (propertyResponse.success) {
              const propertyData = propertyResponse.data.listing;
              console.log(bookings, property.id);
              if (property.id in bookings) {
                propertyData.bookingStatus = bookings[property.id];  
              } else {
                propertyData.bookingStatus = 'zzz';
              }

              console.log('property', propertyData.bookingStatus);
              return propertyData;
            } else {
              // Handle error if the details fetch fails for a property
              console.error('Error fetching details for property:', property.id);
              return null;
            }
          })
        );

        console.log(propertyDetails);
        propertyDetails.sort((a, b) => {     
          // Sort by booking status first - accepted, pending, and not booked (zzz)
          if (a.bookingStatus > b.bookingStatus) return 1;
          if (a.bookingStatus < b.bookingStatus) return -1;
      
          // If not booked, sort in ascending alphabetical order
          if (a.title > b.title) return 1;
          if (a.title < b.title) return -1;
      
          return 0;
        });

        setListings(propertyDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <div>
        <h1>All Listings</h1>
      </div>
      <Flex>
        {!loading && listings.map((listing) => (
          <Box key={listing.id}>{listingPreview(listing)}</Box>
        ))}
      </Flex>
    </Container>
  )
}

export default AllListings;

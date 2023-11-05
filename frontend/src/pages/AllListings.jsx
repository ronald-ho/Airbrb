import React, { useEffect, useState } from 'react';
import { getAllListings } from '../api/listings';
import { Container, Flex, Box } from '@chakra-ui/react';
import ListingPreview from '../components/ListingPreview';
import { SearchBar, InputBar } from '../components/SearchBar';
import { getListing } from '../api/listings/actions';
import { getAllBookings } from '../api/booking';

function AllListings () {
  // Get listings data
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get bookings data
  const [bookings, setBookings] = useState({});

  // Display filters
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(true);

  const handleSearchClick = () => {
    // Toggle the visibility state when SearchBar is clicked
    setIsFiltersVisible(!isFiltersVisible);
    setIsSearchVisible(false);
  };

  const handleSubmitClick = () => {
    // api call for info
    console.log('handle');
  }

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        console.log(localStorage.token);
        if (localStorage.token) {
          const bookingsResponse = await getAllBookings();

          if (!bookingsResponse.success) {
            console.error('Error fetching bookings');
            return null;
          }

          const bookingsDict = {};

          for (const booking of bookingsResponse.data.bookings) {
            console.log('booking', booking);
            bookingsDict[booking.listingId] = booking.status;
          }

          setBookings(bookingsDict);
          console.log('end', bookings)
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(localStorage.token);
        // if (localStorage.token) {
        //   const bookingsResponse = await getAllBookings();

        //   if (!bookingsResponse.success) {
        //     console.error('Error fetching bookings');
        //     return null;
        //   }

        //   const bookingsDict = {};

        //   for (const booking of bookingsResponse.data.bookings) {
        //     console.log('booking', booking);
        //     bookingsDict[booking.listingId] = booking.status;
        //   }

        //   setBookings(bookingsDict);
        //   console.log('end', bookings)
        // }

        const listingsResponse = await getAllListings();

        if (!listingsResponse.success) {
          console.error('Error fetching listings');
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

        propertyDetails.filter((listing) => {
          console.log(listing.title.toLowerCase().includes('new'));
          return (
            listing.title.toLowerCase().includes('new')
          );
        })

        setListings(propertyDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, [bookings]);

  // listings.filter((listing) => {
  //   return (
  //     listing.title.toLowerCase().includes('new')
  //   )
  // })

  return (
    <Container>
      <div>
        <h1>All Listings</h1>
      </div>
      {/* Navbar will go here */}
      <Box>
        {
          isSearchVisible
            ? <SearchBar onClickHandler={handleSearchClick} />
            : <InputBar onClickHandler={handleSubmitClick} />
        }

        <Box display={isFiltersVisible ? 'block' : 'none'}>
          Filters
        </Box>
      </Box>

      <Flex>
        {
        !loading
          ? listings.map((listing, index) => (
            <Box key={index}>{ListingPreview(listing)}</Box>
          ))
          : null
        }
        {/* {!loading && listings.map((listing) => (
          <Box key={listing.id}>{listingPreview(listing)}</Box>
        ))} */}
      </Flex>
    </Container>
  )
}

export default AllListings;

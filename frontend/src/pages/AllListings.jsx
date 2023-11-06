import React, { useEffect, useState } from 'react';
import { getAllListings } from '../api/listings';
import { Container, Flex, Box, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, Text, RangeSliderThumb } from '@chakra-ui/react';
import ListingPreview from '../components/ListingPreview';
import { SearchBar, InputBar } from '../components/SearchBar';
import { getListing } from '../api/listings/actions';
import { getAllBookings } from '../api/booking';

function AllListings () {
  // Get listings data
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  // We keep a filtered listings separate so we don't need to find complete list every time
  const [filteredListings, setFilteredListings] = useState(null);

  // Get bookings data
  const [bookings, setBookings] = useState({});

  // Display filters
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(true);

  // Get filter inputs
  const defaultBedrooms = [0, 8];
  const [bedroomFilter, setBedroomFilter] = useState(defaultBedrooms);
  const defaultPrices = [0, 10000]
  const [priceFilter, setPriceFilter] = useState(defaultPrices);

  // Search filters
  // const [filters, setFilters] = useState(null);

  const handleSearchClick = () => {
    // Toggle the visibility state when SearchBar is clicked
    setIsFiltersVisible(!isFiltersVisible);
    setIsSearchVisible(false);
  };

  const handleSubmitClick = (searchInput) => {
    // setFilters(searchInput);
    // console.log(filters);
    // api call for info
    console.log('inputbar', searchInput);

    // Determine ranges for bedrooms
    let floorBedroom;
    let ceilBedroom;

    // We need to check if bedroom filters are being used by comparing against default
    if (bedroomFilter.every((value, index) => value === defaultBedrooms[index])) {
      floorBedroom = undefined;
      ceilBedroom = undefined;
    } else {
      floorBedroom = bedroomFilter[0];
      ceilBedroom = bedroomFilter[1]
    }

    // Determine ranges for prices
    let floorPrice;
    let ceilPrice;
    // We need to check if price filters are being used by comparing against default
    if (priceFilter.every((value, index) => value === defaultPrices[index])) {
      floorPrice = undefined;
      ceilPrice = undefined;
    } else {
      floorPrice = priceFilter[0];
      ceilPrice = priceFilter[1]
    }

    const newFiltered = listings.filter((listing) => {
      // console.log('filter', listing.title.toLowerCase().includes(searchInput.textSearch));
      const filterByFloorBedroom = floorBedroom === undefined || listing.bedrooms >= floorBedroom;
      const filterByCeilBedroom = ceilBedroom === undefined || listing.bedrooms <= ceilBedroom;

      const filterByFloorPrice = floorPrice === undefined || listing.price >= floorPrice;
      const filterByCeilPrice = ceilPrice === undefined || listing.price <= ceilPrice;
      console.log(filterByFloorBedroom, filterByCeilBedroom, filterByFloorPrice, filterByCeilPrice);
      return (
        listing.title.toLowerCase().includes(searchInput.textSearch) &&
          filterByFloorBedroom &&
          filterByCeilBedroom &&
          filterByFloorPrice &&
          filterByCeilPrice
      );
    });

    setFilteredListings(newFiltered);
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

        setListings(propertyDetails);
        setFilteredListings(propertyDetails);
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

  // const handleFocus = () => {
  //   setIsFiltersVisible(true);
  //   setIsSearchVisible(false);
  //   console.log('focus');
  // }

  const handleFocusOut = (event) => {
    const searchArea = document.getElementById('search-bar');
    if (searchArea.contains(event.target)) {
      console.log('inside');
      setIsFiltersVisible(true);
      setIsSearchVisible(false);
    } else {
      console.log('outside');
      setIsFiltersVisible(false);
      setIsSearchVisible(true);
    }
  }

  return (
    <Container onMouseDown={event => handleFocusOut(event)}>
      <div>
        <h1>All Listings</h1>
      </div>
      {/* Navbar will go here */}
      {/* <Box id='search-bar' onFocus={handleFocus}> */}
      <Box id='search-bar'>
        {
          isSearchVisible
            ? <SearchBar onClickHandler={handleSearchClick} />
            : <InputBar onClickHandler={handleSubmitClick} />
        }

        <Box display={isFiltersVisible ? 'block' : 'none'}>
          <Box>
            <Text>Bedrooms</Text>
            <Box display='flex'>
              {bedroomFilter[0]} - {bedroomFilter[1]}
            </Box>
            <RangeSlider defaultValue={[0, 8]} min={0} max={8} step={1} onChange={(val) => setBedroomFilter(val)}>
              <RangeSliderTrack bg='red.100'>
                <RangeSliderFilledTrack bg='tomato' />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={6} index={0} />
              <RangeSliderThumb boxSize={6} index={1} />
            </RangeSlider>
          </Box>
          <Box>
            <Text>Price</Text>
            <Box display='flex'>
              {priceFilter[0]} - {priceFilter[1]}
            </Box>
            <RangeSlider defaultValue={[0, 10000]} min={0} max={10000} step={1} onChange={(val) => setPriceFilter(val)}>
              <RangeSliderTrack bg='red.100'>
                <RangeSliderFilledTrack bg='tomato' />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={6} index={0} />
              <RangeSliderThumb boxSize={6} index={1} />
            </RangeSlider>
          </Box>
          <Box>
            <Text>Reviews</Text>
          </Box>
        </Box>
      </Box>

      <Flex>
        {
        !loading
          ? filteredListings.map((listing, index) => (
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

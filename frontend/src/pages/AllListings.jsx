import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  Select,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getAllBookings } from '../api/booking';
import { getAllListings } from '../api/listings';
import { getListing } from '../api/listings/actions';
import ListingPreview from '../components/ListingPreview';
import QuantitySelector from '../components/QuantitySelector';
import { InputBar, SearchBar } from '../components/SearchBar';
import { averageRating } from '../helpers';

function AllListings () {
  // Get listings data
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // We keep a filtered listings separate so we don't need to find complete list every time
  const [filteredListings, setFilteredListings] = useState([]);

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

  // Get date search inputs and also passes search dates into listing previews
  const [searchDates, setSearchDates] = useState([undefined, undefined]);

  // Get text search inputs
  const [searchText, setSearchText] = useState('');

  // Handle sort review selector
  const [sortReviews, setSortReviews] = useState('none');

  const handleSelectReviews = (e) => setSortReviews(e.target.value);

  const handleSearchClick = () => {
    // Toggle the visibility state when SearchBar is clicked
    setIsFiltersVisible(!isFiltersVisible);
    setIsSearchVisible(false);
  };

  const updateTextAndDate = (searchFilters) => {
    // Determine ranges for dates
    const floorDate = searchFilters.dateSearch[0];
    const ceilDate = searchFilters.dateSearch[1];

    if (floorDate !== undefined || ceilDate !== undefined) {
      setSearchDates([floorDate, ceilDate]);
    }

    setSearchText(searchFilters.textSearch);
  }

  const handleSubmitClick = () => {
    // Helper function to check if listing availabilities meet search
    const isAvailable = (start, end, availabilities) => {
      for (const [s, e] of availabilities) {
        const sParsed = new Date(s);
        const eParsed = new Date(e);

        if (start >= sParsed && end <= eParsed) {
          return 1;
        }
      }

      return 0;
    }

    // Determine ranges for dates
    const floorDate = searchDates[0];
    const ceilDate = searchDates[1];

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
      const metadata = listing.metadata;

      const filterDate = floorDate === undefined || ceilDate === undefined || isAvailable(floorDate, ceilDate, listing.availability);

      const filterByFloorBedroom = floorBedroom === undefined || metadata.bedrooms >= floorBedroom;
      const filterByCeilBedroom = ceilBedroom === undefined || metadata.bedrooms <= ceilBedroom;

      const filterByFloorPrice = floorPrice === undefined || listing.price >= floorPrice;
      const filterByCeilPrice = ceilPrice === undefined || listing.price <= ceilPrice;

      // Calculate average rating and add to listing
      listing.avgRating = averageRating(listing.reviews);

      return (
        (listing.title.toLowerCase().includes(searchText) ||
          listing.address.city.toLowerCase().includes(searchText)) &&
        filterDate &&
        filterByFloorBedroom &&
        filterByCeilBedroom &&
        filterByFloorPrice &&
        filterByCeilPrice
      );
    });

    // Sort reviews if selected
    const simpleCompare = (a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    }

    let sortedListings = newFiltered;
    if (sortReviews === 'ascending') {
      sortedListings = newFiltered.sort((a, b) => simpleCompare(a.avgRating, b.avgRating));
    } else if (sortReviews === 'descending') {
      sortedListings = newFiltered.sort((b, a) => simpleCompare(a.avgRating, b.avgRating));
    }

    if (floorDate !== undefined || ceilDate !== undefined) {
      setSearchDates([floorDate, ceilDate]);
    }

    setFilteredListings(sortedListings);
  }

  // First get bookings that will be used to sort all listings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (localStorage.getItem('token')) {
          const bookingsResponse = await getAllBookings();

          if (!bookingsResponse.success) {
            return null;
          }

          const bookingsDict = {};

          for (const booking of bookingsResponse.data.bookings) {
            if (!bookingsDict[booking.listingId]) {
              bookingsDict[booking.listingId] = booking.status;
            } else if (booking.status === 'accepted') {
              bookingsDict[booking.listingId] = booking.status;
            }
          }

          setBookings(bookingsDict);
        }
      } catch (error) {
        return null;
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listingsResponse = await getAllListings();

        if (!listingsResponse.success) {
          return null;
        }

        // Fetch details for each property in the listings
        let propertyDetails = await Promise.all(
          listingsResponse.data.listings.map(async (property) => {
            // If listing belongs to the logged in user, we don't need to show it
            if (property.owner === localStorage.getItem('email')) {
              return null;
            }

            // Make a separate API call to get details for each property
            const propertyResponse = await getListing(property.id);

            if (propertyResponse.success) {
              const propertyData = propertyResponse.data.listing;

              // Listing needs to be published
              if (!propertyData.published) return null;

              if (property.id in bookings) {
                propertyData.bookingStatus = bookings[property.id];
              } else {
                propertyData.bookingStatus = 'zzz';
              }

              // Add listing id
              propertyData.listingId = property.id;

              return propertyData;
            } else {
              // Handle error if the details fetch fails for a property
              return null;
            }
          })
        );

        propertyDetails = propertyDetails.filter(item => item != null);
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

      }
    };

    fetchData();
  }, [bookings]);

  const handleFocusOut = (event) => {
    const searchArea = document.getElementById('search-bar');
    if (searchArea.contains(event.target)) {
      setIsFiltersVisible(true);
      setIsSearchVisible(false);
    } else {
      setIsFiltersVisible(false);
      setIsSearchVisible(true);
    }
  };

  const clearFilters = () => {
    setBedroomFilter(defaultBedrooms);
    setPriceFilter(defaultPrices);
    setSortReviews('none');
    setSearchDates([undefined, undefined]);
    setSearchText('');
  };

  return (
    <Flex onMouseDown={event => handleFocusOut(event)} flexDirection='column' align='center' px={8}>
      <Box
        py='2'
        id='search-bar'
      >
        {
          isSearchVisible
            ? <SearchBar onClickHandler={handleSearchClick}/>
            : <InputBar onClickHandler={handleSubmitClick} updateFilters={updateTextAndDate}/>
        }

        <Modal isOpen={!isSearchVisible}>
          <ModalOverlay zIndex={300}/>
        </Modal>

        <Stack
          display={isFiltersVisible ? 'block' : 'none'}
          bg={'white'}
          py='3'
          px='8'
          borderWidth='1px'
          borderRadius='20px'
          borderColor='gray.200'
          boxShadow='lg'
          position='fixed'
          left="50%"
          width={{ base: '95%', md: '70%' }}
          transform='translate(-50%, 60px)'
          zIndex={400}
          divider={<StackDivider/>}
          spacing={4}
        >
          <QuantitySelector title={'Bedrooms'} defaults={defaultBedrooms} value={bedroomFilter}
                            setter={setBedroomFilter}/>
          <QuantitySelector title={'Price'} units={'$'} defaults={defaultPrices} value={priceFilter}
                            setter={setPriceFilter}/>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Text fontWeight='bold' whiteSpace='nowrap'>Sort Reviews</Text>
            <Select value={sortReviews} onChange={handleSelectReviews} width='30%' aria-label='Sort reviews by'>
              <option value='none'>None</option>
              <option value='ascending'>Ascending</option>
              <option value='descending'>Descending</option>
            </Select>
          </Box>
          <Button
            onClick={clearFilters}
            width='100%'
            aria-label='Clear filters'
          >
            Clear All
          </Button>
        </Stack>
      </Box>

      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
        width='100%'
        gap='3'
      >
        {
          !loading
            ? filteredListings.map((listing, index) => {
              // Serialise listingId and search dates (if present)
              const routeData = {
                listingId: listing.listingId
              }

              if (searchDates) {
                routeData.floorDate = searchDates[0];
                routeData.ceilDate = searchDates[1];
              }

              const serialisedRouteData = JSON.stringify(routeData);
              const url = `/listing/${encodeURIComponent(serialisedRouteData)}/`;

              return (
                <GridItem
                  width={{ base: '300px', sm: '200px', md: '225px' }}
                  key={index}
                >
                  {ListingPreview(listing, url)}
                </GridItem>
              );
            })
            : null
        }
      </Grid>
    </Flex>
  )
}

export default AllListings;

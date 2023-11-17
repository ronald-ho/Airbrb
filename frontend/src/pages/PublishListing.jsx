import { CheckCircleIcon } from '@chakra-ui/icons';
import { Button, Center, List, ListIcon, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/colors/red.css'
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { publishListing } from '../api/listings/publish';
import CenteredBox from '../components/CenteredBox';
import Popup from '../components/Popup';
import { customSelectStyles, formatOptionLabel } from '../helpers';

/**
 * PublishListing component displays a form to publish a listing with availability dates.
 */
function PublishListing () {
  // Extracting listing data from the location state
  const { state } = useLocation();
  const listings = state.listing;

  // State variables
  const [listingId, setListingId] = useState('');
  const [availability, setAvailability] = useState([]);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // Router navigation
  const navigate = useNavigate();

  // Toast notification
  const toast = useToast();

  // Format a date in a human-readable format
  const formatDate = (milliseconds) => {
    const date = new Date(milliseconds);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
  };

  // Handle changes to selected dates
  const handleDateChanges = (newDates) => {
    setAvailability(newDates);
  }

  // Clear selected dates
  const handleClearDates = () => {
    setAvailability([]);
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (availability.length === 0) {
      // Display an error message if no availability dates are selected
      toast({
        title: 'Please select availability dates',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Publish the listing with selected availability dates
      await publishListing(listingId, { availability });
      navigate('/my-listings');
      toast({
        title: 'Successfully published',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setShowPopup(true);
    }
  }

  // Render content when all listings are published
  const renderAllListingsPublished = () => {
    return (
      <>
        <Text mb="4">All your listings are published.</Text>
        <Text mb="4">To change your listing availabilities please click on your listing to edit</Text>
      </>
    )
  }

  // Render content to select a listing and availability dates
  const renderListingsToPublish = () => {
    return (
      <>
        <Text mb="4">Choose a listing to publish!</Text>
        <Select
          className="basic-single"
          options={
            listings
              .filter(listing => !listing.published)
              .map(listing => ({
                value: listing.id,
                label: listing.title,
                photo: listing.thumbnail,
                metadata: listing.metadata,
                price: listing.price
              }))
          }
          formatOptionLabel={formatOptionLabel}
          onChange={(option) => setListingId(option.value)}
          styles={customSelectStyles}
        />
        {listingId && (
          <>
            <Text mt="4">Please select your availability dates:</Text>
            <Button colorScheme="red" onClick={handleClearDates} mt="4">
              Clear Dates
            </Button>
            <Center>
              <Calendar
                className="red"
                value={availability}
                onChange={handleDateChanges}
                multiple
                range
                zIndex={9}
              />
            </Center>
            <List spacing={3} mt="4">
              {availability.map((dateRange, index) => (
                <ListItem key={index}>
                  <ListIcon as={CheckCircleIcon} color='green.500'/>
                  {dateRange.map(date => formatDate(date)).join(' - ')}
                </ListItem>
              ))}
            </List>
          </>
        )}
        <Button colorScheme="blue" onClick={handleSubmit} mt="4">
          Publish
        </Button>
      </>
    )
  }

  // Check if all listings are published
  const allListingsPublished = listings.every(listing => listing.published);

  return (
    <CenteredBox>
      <VStack>
        {allListingsPublished ? renderAllListingsPublished() : renderListingsToPublish()}
      </VStack>
      {showPopup && (
        <Popup title="Error" body={error} primaryButtonText="OK" onClose={() => setShowPopup(false)}
               onConfirm={() => setShowPopup(false)}/>
      )}
    </CenteredBox>
  )
}

export default PublishListing;

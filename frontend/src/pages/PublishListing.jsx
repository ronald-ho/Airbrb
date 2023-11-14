import React, { useState } from 'react';
import CenteredBox from '../components/CenteredBox';
import { Button, Center, List, ListIcon, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { publishListing } from '../api/listings/publish';
import { Calendar } from 'react-multi-date-picker';
import { CheckCircleIcon } from '@chakra-ui/icons';
import moment from 'moment';
import Popup from '../components/Popup';
import 'react-multi-date-picker/styles/colors/red.css'
import { customSelectStyles, formatOptionLabel } from '../helpers';
import Select from 'react-select';

function PublishListing () {
  const { state } = useLocation();
  const listings = state.listing;
  const [listingId, setListingId] = useState('');
  const [availability, setAvailability] = useState([]);
  const [error, setError] = React.useState('');
  const [showPopup, setShowPopup] = React.useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSelectListing = (option) => {
    setListingId(option.value);
  };

  const formatDate = (milliseconds) => {
    const date = new Date(milliseconds);
    return moment(date).format('Do of MMMM');
  };

  const handleDateChanges = (newDates) => {
    setAvailability(newDates);
  }

  const handleClearDates = () => {
    setAvailability([]);
  }

  const handleSubmit = async () => {
    try {
      await publishListing(listingId, { availability });
      navigate('/my-listings');
      toast({
        title: 'Sucessfully published',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      setError(error.message);
      setShowPopup(true);
    }
  }

  const allListingsPublished = listings.every(listing => listing.published);

  return (
    <CenteredBox>
      <VStack>
        {allListingsPublished
          ? (
            <>
              <Text mb="4">All your listings are published.</Text>
              <Text mb="4">To change your listing availabilities please click on your listing to edit</Text>
            </>
            )
          : (
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
                onChange={handleSelectListing}
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
            )}
      </VStack>
      {showPopup && (
        <Popup title="Error" body={error} primaryButtonText="OK" onClose={() => setShowPopup(false)}
               onConfirm={() => setShowPopup(false)}/>
      )}
    </CenteredBox>
  )
}

export default PublishListing;

import React, { useEffect, useState } from 'react';
import { deleteListing, getListing, updateListing } from '../api/listings/actions';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react';
import NumberInputFieldCustom from '../components/NumberInputFieldCustom';
import PropertyTypeSelector from '../components/PropertyTypeSelector';
import CenteredBox from '../components/CenteredBox';
import Popup from '../components/Popup';
import DefaultAirbnbImage from '../assets/default-airbnb-image.webp'
import { publishListing, unpublishListing } from '../api/listings/publish';
import { Calendar } from 'react-multi-date-picker';

function EditListing () {
  const { listingId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [listing, setListing] = useState({
    title: '',
    price: 0,
    thumbnail: '',
    address: {
      number: '',
      street: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
    },
    metadata: {
      propertyType: '',
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
      amenities: [],
    },
    published: '',
    availability: []
  });
  const toast = useToast();

  const [error, setError] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUnpublishPopup, setShowUnpublishPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await getListing(listingId);
        if (response.success) {
          const listingData = response.data.listing;
          setListing({
            title: listingData.title,
            price: listingData.price,
            thumbnail: listingData.thumbnail,
            address: listingData.address,
            metadata: listingData.metadata,
            published: listingData.published,
            availability: listingData.availability
          });
          setIsLoading(false);
        } else {
          setError(response.error || '  Error fetching listing');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchListing();
  }, [listingId]);

  const handleInputChange = (name, value) => {
    setListing(prevListing => ({
      ...prevListing,
      [name]: value,
    }));
    handleSubmit();
  };

  const handleAddressChange = (name, value) => {
    setListing(prevListing => ({
      ...prevListing,
      address: {
        ...prevListing.address,
        [name]: value,
      }
    }));
    handleSubmit();
  };

  const handleMetadataChange = (name, value) => {
    setListing(prevListing => ({
      ...prevListing,
      metadata: {
        ...prevListing.metadata,
        [name]: value,
      }
    }));
    handleSubmit();
  };

  const handleDateChanges = async (newDates) => {
    const isValid = newDates.every(dateRange => Array.isArray(dateRange) && dateRange.length === 2);

    if (!isValid) {
      return;
    }

    setListing(prevListing => ({
      ...prevListing,
      availability: newDates
    }));

    try {
      await unpublishListing(listingId);
      await publishListing(listingId, { availability: newDates })
    } catch (error) {
      setError(error.message);
      toast({ title: error.toString(), status: 'error', duration: 3000, isClosable: true, })
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        handleInputChange('thumbnail', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const updatedListing = {
      ...listing,
    };
    try {
      const response = await updateListing(listingId, updatedListing);
      console.log('Updated listing: ', response);
    } catch (err) {
      setError(error.message);
      toast({ title: error.toString(), status: 'error', duration: 3000, isClosable: true, })
    }
  };

  const handleUnpublish = async () => {
    try {
      await unpublishListing(listingId);
      navigate('/my-listings');
      toast({ title: 'Sucessfully unpublished ', status: 'success', duration: 3000, isClosable: true, });
    } catch (error) {
      setError(error.message);
      toast({ title: error.toString(), status: 'error', duration: 3000, isClosable: true, })
    }
  }

  const handleDelete = async () => {
    try {
      setShowDeletePopup(false);
      const response = await deleteListing(listingId);
      console.log('Deleted listing: ', response);
      toast({ title: 'Listing deleted', status: 'success', duration: 3000, isClosable: true, })
      navigate('/my-listings');
    } catch (err) {
      setError(err.message);
      toast({ title: error.toString(), status: 'error', duration: 3000, isClosable: true, })
    }
  }

  const customStyles = {
    maxW: { base: '100%', md: '50%' }
  }

  if (isLoading) return null;

  return (
    <CenteredBox customStyles={customStyles}>
      <VStack>
        <Text fontSize='3xl'>Editing {listing.title}</Text>
        {listing.thumbnail === ''
          ? (
            <Image src={DefaultAirbnbImage} alt="Default Photo" objectFit="contain"/>
            )
          : (
            <Image src={listing.thumbnail} alt={listing.title} objectFit="contain"/>
            )}
        <Tabs maxWidth="100%">
          {/* Tab navigation */}
          <Flex justify="space-between" style={{ overflowX: 'auto' }}>
            <TabList style={{ flex: 'none' }}>
              <Tab fontSize="sm">Basic</Tab>
              <Tab fontSize="sm">Address</Tab>
              <Tab fontSize="sm">Property Type</Tab>
              <Tab fontSize="sm">Details</Tab>
              <Tab fontSize="sm">Amenities</Tab>
              {listing.published
                ? (
                  <Tab fontSize="sm">Availability</Tab>
                  )
                : null}
            </TabList>
          </Flex>
          <TabPanels>
            {/* Basic Tab */}
            <TabPanel>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={listing.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price per night</FormLabel>
                <Input
                  type="number"
                  value={listing.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Thumbnail</FormLabel>
                <Input type="file" accept="image/*" onChange={handleImageUpload}
                />
              </FormControl>
            </TabPanel>

            {/* Address Tab */}
            <TabPanel>
              <HStack>
                <FormControl>
                  <FormLabel>Number</FormLabel>
                  <Input type="text" value={listing.address.number}
                         onChange={e => handleAddressChange('number', e.target.value)}/>
                </FormControl>
                <FormControl>
                  <FormLabel>Street</FormLabel>
                  <Input type="text" value={listing.address.street}
                         onChange={e => handleAddressChange('street', e.target.value)}/>
                </FormControl>
              </HStack>
              <HStack>
                <FormControl>
                  <FormLabel>City</FormLabel>
                  <Input type="text" value={listing.address.city}
                         onChange={e => handleAddressChange('city', e.target.value)}/>
                </FormControl>
                <FormControl>
                  <FormLabel>State</FormLabel>
                  <Input type="text" value={listing.address.state}
                         onChange={e => handleAddressChange('state', e.target.value)}/>
                </FormControl>
              </HStack>
              <HStack>
                <FormControl>
                  <FormLabel>Postcode</FormLabel>
                  <Input type="text" value={listing.address.postcode}
                         onChange={e => handleAddressChange('postcode', e.target.value)}/>
                </FormControl>
                <FormControl>
                  <FormLabel>Country</FormLabel>
                  <Input type="text" value={listing.address.country}
                         onChange={e => handleAddressChange('country', e.target.value)}/>
                </FormControl>
              </HStack>
            </TabPanel>

            {/* Property Type Tab */}
            <TabPanel>
              <PropertyTypeSelector
                propertyType={listing.metadata.propertyType}
                onChange={(type) =>
                  handleMetadataChange('propertyType', type)
                }
              />
            </TabPanel>

            {/* Details Tab */}
            <TabPanel>
              <NumberInputFieldCustom
                title="Bedrooms"
                value={listing.metadata.bedrooms}
                onChange={(value) => handleMetadataChange('bedrooms', value)}
              />
              <NumberInputFieldCustom
                title="Beds"
                value={listing.metadata.beds}
                onChange={(value) => handleMetadataChange('beds', value)}
              />
              <NumberInputFieldCustom
                title="Bathrooms"
                value={listing.metadata.bathrooms}
                onChange={(value) => handleMetadataChange('bathrooms', value)}
              />
            </TabPanel>

            {/* Amenities Tab */}
            <TabPanel>
              <FormControl>
                <FormLabel>Amenities (Separated by commas)</FormLabel>
                <Input
                  type="text"
                  value={listing.metadata.amenities.join(', ')}
                  onChange={(e) =>
                    handleMetadataChange(
                      'amenities',
                      e.target.value.split(',').map((item) => item.trim())
                    )
                  }
                />
              </FormControl>
            </TabPanel>

            {/* Availability Tab */}
            {listing.published
              ? (
                <TabPanel>
                  <Center>
                    <Calendar
                      value={listing.availability}
                      onChange={handleDateChanges}
                      multiple
                      range
                    />
                  </Center>
                </TabPanel>
                )
              : null}
          </TabPanels>
        </Tabs>
        <Text>Changes are autosaved</Text>
        <HStack>
          {listing.published
            ? (
              <Button colorScheme="purple" onClick={() => setShowUnpublishPopup(true)}>
                Unpublish Listing
              </Button>
              )
            : null}
          <Button colorScheme="red" onClick={() => setShowDeletePopup(true)}>
            Delete Listing
          </Button>
        </HStack>
        {showUnpublishPopup && (
          <Popup
            title="Confirm Deletion"
            body="Are you sure you want to unpublish this listing?"
            primaryButtonText="Unpublish"
            onClose={() => setShowUnpublishPopup(false)}
            onConfirm={handleUnpublish}
          />
        )}
        {showDeletePopup && (
          <Popup
            title="Confirm Deletion"
            body="Are you sure you want to delete this listing? This action cannot be undone."
            primaryButtonText="Delete"
            onClose={() => setShowDeletePopup(false)}
            onConfirm={handleDelete}
          />
        )}
      </VStack>
    </CenteredBox>
  );
}

export default EditListing;

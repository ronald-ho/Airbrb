import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Center, ChakraProvider } from '@chakra-ui/react'

import Login from './pages/Login';
import Register from './pages/Register';
import AllListings from './pages/AllListings';
import HostedListings from './pages/HostedListings';
import EditListing from './pages/EditListing';
import ViewListing from './pages/ViewListing';
import BookingHistory from './pages/BookingHistory';
import { ListingProvider } from './pages/CreateListing/ListingContext';
import CreateListingSteps from './pages/CreateListing/CreateListingSteps';
import CreateListing from './pages/CreateListing/CreateListing';
import JsonUpload from './pages/CreateListing/JsonUpload';
import NavBar from './components/NavBar';
import PublishListing from './pages/PublishListing';
import { AuthProvider } from './components/AuthProvider';

function App () {
  return (
    <AuthProvider>
      <ChakraProvider>
        <ListingProvider>
          <BrowserRouter>
            <NavBar/>
            <Center pt='5rem' mx={0}>
              {/* <Container> */}
              <Routes>
                <Route path="/" element={<AllListings/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/my-listings" element={<HostedListings/>}/>
                <Route path="/my-listings/edit/:listingId" element={<EditListing/>}/>
                <Route path="/listings" element={<AllListings/>}/>
                <Route path="/listing/:data" element={<ViewListing/>}/>
                <Route path="/booking-history" element={<BookingHistory/>}/>
                <Route path="/booking-history/:listingId" element={<BookingHistory/>}/>
                <Route path="/create-listing/:step" element={<CreateListingSteps/>}/>
                <Route path="/create-listing" element={<CreateListing/>}/>
                <Route path="/create-listing/json" element={<JsonUpload/>}/>
                <Route path="/publish-listing" element={<PublishListing/>}/>
              </Routes>
            </Center>
          </BrowserRouter>
        </ListingProvider>
      </ChakraProvider>
    </AuthProvider>
  )
}

export default App;

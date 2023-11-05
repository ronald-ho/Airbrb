import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

import Login from './pages/Login';
import Register from './pages/Register';
import AllListings from './pages/AllListings';
import HostedListings from './pages/HostedListings';
import EditListing from './pages/EditListing';
import ViewListing from './pages/ViewListing';
import BookingHistory from './pages/BookingHistory';
import { ListingProvider } from './pages/CreateListing/ListingContext';
import CreateListing from './pages/CreateListing/CreateListing';

function App () {
  return (
    <ChakraProvider>
      <ListingProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AllListings/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/my-listings" element={<HostedListings/>}/>
            <Route path="/my-listings/edit/:id" element={<EditListing/>}/>
            <Route path="/listings" element={<AllListings/>}/>
            <Route path="/listing/:id" element={<ViewListing/>}/>
            <Route path="/booking-history/:id" element={<BookingHistory/>}/>
            <Route path={'/create-listing/:step'} element={<CreateListing/>}/>
          </Routes>
        </BrowserRouter>
      </ListingProvider>
    </ChakraProvider>
  )
}

export default App;

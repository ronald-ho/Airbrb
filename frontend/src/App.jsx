import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import AllListings from './pages/AllListings';
import HostedListings from './pages/HostedListings';
import EditListing from './pages/EditListing';
import ViewListing from './pages/ViewListing';
import BookingHistory from './pages/BookingHistory';

function App () {
  return (
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
      </Routes>
    </BrowserRouter>
  )
}

export default App;

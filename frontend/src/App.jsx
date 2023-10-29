import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import AllListings from './pages/AllListings';
import HostedListings from './pages/HostedListings';
import EditListing from './pages/EditListing';
import ViewListing from './pages/ViewListing';
import BookingHistory from './pages/BookingHistory';

function App () {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={AllListings}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/my-listings" exact component={HostedListings}/>
        <Route path="/my-listings/edit/:id" exact component={EditListing}/>
        <Route path="/listings" exact component={AllListings}/>
        <Route path="/listing/:id" exact component={ViewListing}/>
        <Route path="/booking-history/:id" exact component={BookingHistory}/>
      </Switch>
    </Router>
  )
}

export default App;

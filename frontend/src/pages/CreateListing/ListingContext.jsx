import React, { createContext, useState } from 'react';

export const ListingContext = createContext();

export const ListingProvider = ({ children }) => {
  const [listingData, setListingData] = useState({});

  const updateListingData = (stepData) => {
    setListingData({ ...listingData, ...stepData });
  };

  return (
    <ListingContext.Provider value={{ listingData, updateListingData }}>
      {children}
    </ListingContext.Provider>
  );
};

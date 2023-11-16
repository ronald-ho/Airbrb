import React, { createContext, useState } from 'react';

// Create a context to manage listing data
export const ListingContext = createContext();

/**
 * ListingProvider component is a context provider that manages the listing data.
 * It allows components to access and update the listing data across the application.
 * @param {object} children - The child components that will have access to the context.
 */
export const ListingProvider = ({ children }) => {
  // Initialize the listingData state using useState hook
  const [listingData, setListingData] = useState({});

  /**
   * Function to update the listing data.
   * @param {object} stepData - Data from the current step to update the listing data.
   */
  const updateListingData = (stepData) => {
    // Merge the current listingData with the new stepData and update the state
    setListingData({ ...listingData, ...stepData });
  };

  // Provide the listingData and updateListingData functions to the context
  return (
    <ListingContext.Provider value={{ listingData, updateListingData }}>
      {children}
    </ListingContext.Provider>
  );
};

import React, { useEffect } from 'react';
import { getAllListingDetailsByUser } from '../api/listings';

function HostedListings () {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const listings = getAllListingDetailsByUser();
        console.log(listings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData().then(r => console.log(r));
  }, []);

  return (
    <div>
      <h1>Hosted Listings</h1>
    </div>
  )
}

export default HostedListings;

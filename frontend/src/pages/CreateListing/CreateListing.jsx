import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListingContext } from './ListingContext';
import TitleStep from './TitleStep';
import AddressStep from './AddressStep';
import PriceStep from './PriceStep';
import ThumbnailStep from './ThumbnailStep';
import PropertyTypeStep from './PropertyTypeStep';
import BathroomsStep from './BathroomsStep';
import BedroomsStep from './BedroomsStep';
import AmenitiesStep from './AmenitiesStep';

const CreateListing = () => {
  const { step } = useParams();
  const { listingData, updateListingData } = useContext(ListingContext);
  const navigate = useNavigate();

  const saveStepData = (stepData) => {
    updateListingData(stepData);

    const stepOrder = ['title', 'address', 'price', 'thumbnail', 'property-type', 'bathrooms', 'bedrooms', 'amenities'];
    const currentStepIndex = stepOrder.indexOf(step);
    const nextStep = stepOrder[currentStepIndex + 1];

    if (nextStep) {
      navigate(`/create-listing/${nextStep}`);
    } else {
      console.error('No next step defined');
    }
  };

  const navigateToPreviousStep = () => {
    const stepOrder = ['title', 'address', 'price', 'thumbnail', 'property-type', 'bathrooms', 'bedrooms', 'amenities'];
    const currentStepIndex = stepOrder.indexOf(step);
    const previousStep = stepOrder[currentStepIndex - 1];

    if (previousStep) {
      navigate(`/create-listing/${previousStep}`);
    } else {
      console.error('No previous step defined');
    }
  };

  useEffect(() => {
    console.log('Current Listing Data:', listingData);
  }, [listingData]);

  const handleSubmit = () => {
    // Post the data to server
    // and handle the response (e.g., showing success message, navigating to dashboard)
  };

  const stepComponents = {
    title: <TitleStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    address: <AddressStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    price: <PriceStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    thumbnail: <ThumbnailStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    'property-type': <PropertyTypeStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    bathrooms: <BathroomsStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    bedrooms: <BedroomsStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    amenities: <AmenitiesStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
  };

  useEffect(() => {
    if (!step || !stepComponents[step]) {
      navigate('/create-listing/title');
    }
  }, [step, navigate, stepComponents]);

  const StepComponent = React.cloneElement(stepComponents[step], { onBack: navigateToPreviousStep });

  return (
    <div>
      {StepComponent}
      {step === 'amenities' && (
        <button onClick={handleSubmit}>Submit Listing</button>
      )}
    </div>
  );
};

export default CreateListing;

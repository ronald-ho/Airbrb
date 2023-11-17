import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createNewListing } from '../../api/listings/actions';
import Popup from '../../components/Popup';
import AddressStep from './AddressStep';
import AmenitiesStep from './AmenitiesStep';
import DetailsStep from './DetailsStep';
import { ListingContext } from './ListingContext';
import PriceStep from './PriceStep';
import PropertyTypeStep from './PropertyTypeStep';
import ThumbnailStep from './ThumbnailStep';
import TitleStep from './TitleStep';

/**
 * CreateListingSteps component manages the process of creating a new listing
 * by guiding the user through different steps and collecting information.
 */
const CreateListingSteps = () => {
  // Get the current step from the URL params
  const { step } = useParams();

  // Get listingData and updateListingData from the ListingContext
  const {
    listingData,
    updateListingData
  } = useContext(ListingContext);

  // Initialize navigation and error state
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // Save data for the current step and navigate to the next step
  const saveStepData = (stepData) => {
    updateListingData(stepData);

    // Define the order of steps
    const stepOrder = ['title', 'address', 'price', 'thumbnail', 'property-type', 'details', 'amenities'];
    const currentStepIndex = stepOrder.indexOf(step);
    const nextStep = stepOrder[currentStepIndex + 1];

    if (nextStep) {
      navigate(`/create-listing/${nextStep}`);
    } else {
      console.error('No next step defined');
    }
  };

  // Navigate to the previous step
  const navigateToPreviousStep = () => {
    const stepOrder = ['title', 'address', 'price', 'thumbnail', 'property-type', 'details', 'amenities'];
    const currentStepIndex = stepOrder.indexOf(step);
    const previousStep = stepOrder[currentStepIndex - 1];

    if (previousStep) {
      navigate(`/create-listing/${previousStep}`);
    } else {
      console.error('No previous step defined');
    }
  };

  // Automatically submit the form when on the 'amenities' step
  useEffect(() => {
    if (step === 'amenities' && listingData.amenities) {
      handleSubmit();
    }
  }, [listingData.amenities, step]);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      await createNewListing(restructureData());
      navigate('/my-listings');
    } catch (error) {
      setError(error.message);
      setShowPopup(true);
    }
  };

  // Restructure data before submission
  const restructureData = () => {
    return {
      title: listingData.title,
      address: listingData.address,
      price: parseInt(listingData.price),
      thumbnail: listingData.thumbnail,
      metadata: {
        propertyType: listingData.propertyType,
        bathrooms: parseInt(listingData.bathrooms),
        bedrooms: parseInt(listingData.bedrooms),
        beds: parseInt(listingData.beds),
        amenities: listingData.amenities,
        images: []
      }
    };
  }

  // Define components for each step
  const stepComponents = {
    title: <TitleStep onSubmit={saveStepData}/>,
    address: <AddressStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    price: <PriceStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    thumbnail: <ThumbnailStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    'property-type': <PropertyTypeStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    details: <DetailsStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    amenities: <AmenitiesStep onSubmit={saveStepData} onBack={navigateToPreviousStep} handleSubmit={handleSubmit}/>,
  };

  // Ensure a valid step is displayed, or redirect to the first step
  useEffect(() => {
    if (!step || !stepComponents[step]) {
      navigate('/create-listing/title');
    }
  }, [step, navigate, stepComponents]);

  // Clone the current step component and provide the 'onBack' function
  const StepComponent = React.cloneElement(stepComponents[step], { onBack: navigateToPreviousStep });

  return (
    <div>
      {StepComponent}
      {showPopup && (
        <Popup title='Error' body={error} primaryButtonText='OK' onClose={() => setShowPopup(false)}
               onConfirm={() => setShowPopup(false)}/>
      )}
    </div>
  );
};

export default CreateListingSteps;

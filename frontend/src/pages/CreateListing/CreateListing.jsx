import React, { useContext, useEffect, useState } from 'react';
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
import { createNewListing } from '../../api/listings/actions';
import Popup from '../../components/Popup';

const CreateListing = () => {
  const { step } = useParams();
  const { listingData, updateListingData } = useContext(ListingContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

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

  const handleSubmit = async () => {
    try {
      await createNewListing(restructureData());
      navigate('/my-listings');
    } catch (error) {
      setError(error.message);
      setShowPopup(true);
    }
  };

  const restructureData = () => {
    return {
      title: listingData.title,
      address: listingData.address,
      price: listingData.price,
      thumbnail: listingData.thumbnail,
      metadata: {
        propertyType: listingData.propertyType,
        bathrooms: listingData.bathrooms,
        bedrooms: listingData.bedrooms,
        amenities: listingData.amenities
      }
    };
  }

  const stepComponents = {
    title: <TitleStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    address: <AddressStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    price: <PriceStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    thumbnail: <ThumbnailStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    'property-type': <PropertyTypeStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    bathrooms: <BathroomsStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    bedrooms: <BedroomsStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    amenities: <AmenitiesStep onSubmit={saveStepData} onBack={navigateToPreviousStep} handleSubmit={handleSubmit}/>,
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
      {showPopup && (
        <Popup title="Error" body={error} primaryButtonText="OK" onClose={setShowPopup(false)}/>
      )}
    </div>
  );
};

export default CreateListing;

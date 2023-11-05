import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListingContext } from './ListingContext';
import TitleStep from './TitleStep';
import AddressStep from './AddressStep';
import PriceStep from './PriceStep';
import ThumbnailStep from './ThumbnailStep';
import PropertyTypeStep from './PropertyTypeStep';
import AmenitiesStep from './AmenitiesStep';
import { createNewListing } from '../../api/listings/actions';
import Popup from '../../components/Popup';
import DetailsStep from './DetailsStep';

const CreateListing = () => {
  const { step } = useParams();
  const { listingData, updateListingData } = useContext(ListingContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const saveStepData = (stepData) => {
    updateListingData(stepData);

    const stepOrder = ['title', 'address', 'price', 'thumbnail', 'property-type', 'details', 'amenities'];
    const currentStepIndex = stepOrder.indexOf(step);
    const nextStep = stepOrder[currentStepIndex + 1];

    if (nextStep) {
      navigate(`/create-listing/${nextStep}`);
    } else {
      console.error('No next step defined');
    }
  };

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

  useEffect(() => {
    console.log('Current Listing Data:', listingData);
  }, [listingData]);

  useEffect(() => {
    if (step === 'amenities' && listingData.amenities) {
      handleSubmit().then(r => console.log(r));
    }
  }, [listingData.amenities, step]);

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

  const stepComponents = {
    title: <TitleStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    address: <AddressStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    price: <PriceStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    thumbnail: <ThumbnailStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    'property-type': <PropertyTypeStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
    details: <DetailsStep onSubmit={saveStepData} onBack={navigateToPreviousStep}/>,
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
        <Popup title="Error" body={error} primaryButtonText="OK" onClose={() => setShowPopup(false)}/>
      )}
    </div>
  );
};

export default CreateListing;

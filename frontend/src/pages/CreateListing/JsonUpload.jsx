import CenteredBox from '../../components/CenteredBox';
import { Button, Flex, Input, List, ListIcon, ListItem, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { createNewListing } from '../../api/listings/actions';
import { useNavigate } from 'react-router-dom';
import { customAjv, listingSchema } from '../../helpers';
import Popup from '../../components/Popup';
import { WarningTwoIcon } from '@chakra-ui/icons';

function JsonUpload () {
  const [jsonFile, setJsonFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = React.useState(false);
  const [isValidJson, setIsValidJson] = React.useState(false);
  const toast = useToast();
  const validate = customAjv.compile(listingSchema);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const fileContent = JSON.parse(reader.result);
          setJsonFile(fileContent);
        } catch {
          setError('Invalid JSON file ');
          setShowPopup(true);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async () => {
    try {
      await createNewListing(jsonFile)
      toast({
        title: 'Creation Successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/my-listings')
    } catch (err) {
      setError(err.message);
      setShowPopup(true);
    }
  }

  const validateJson = () => {
    console.log(jsonFile);
    if (jsonFile) {
      const valid = validate(jsonFile);
      if (valid) {
        setIsValidJson(true);
        toast({
          title: 'JSON is valid',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        setIsValidJson(false);
        setError(validate.errors);
        console.log(validate.errors);
        setShowPopup(true);
      }
    }
  };

  const formatErrorMessage = (errors) => {
    if (!errors || !errors.length) return 'No errors found.';

    if (typeof errors === 'string') {
      return (
        <List>
          <ListItem>
            <ListIcon as={WarningTwoIcon} color='red.500'/>
            {errors}
          </ListItem>
        </List>
      );
    }

    return (
      <List spacing={3}>
        {errors.map((err, index) => {
          let expectedType = '';
          if (err.params.type) {
            expectedType = `Expected ${err.params.type}.`;
          } else if (err.keyword === 'required') {
            expectedType = 'This field is required.';
          } else if (err.keyword === 'format') {
            expectedType = `Expected format: ${err.params.format}.`;
          } else {
            expectedType = 'Validation error.';
          }

          return (
            <ListItem key={index}>
              <ListIcon as={WarningTwoIcon} color='red.500'/>
              {`Error in ${err.instancePath}: ${err.message}. ${expectedType}`}
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <CenteredBox customStyles={{ minW: '500px' }}>
      <VStack spacing={4}>
        <h1>Upload a Jsonfile to create your Airbrb!</h1>
        <Input type="file" accept=".json" onChange={handleFileInputChange}/>
        <Button colorScheme="green" onClick={validateJson}>Validate JSON</Button>
      </VStack>
      <Flex justify="flex-end" mt={4}>
        <Button colorScheme="blue" onClick={handleSubmit} isDisabled={!isValidJson}>Submit</Button>
      </Flex>
      {showPopup && (
        <Popup
          title="Error"
          body={formatErrorMessage(error)}
          primaryButtonText="OK"
          onClose={() => setShowPopup(false)}
          onConfirm={() => setShowPopup(false)}
        />
      )}
    </CenteredBox>
  )
}

export default JsonUpload;

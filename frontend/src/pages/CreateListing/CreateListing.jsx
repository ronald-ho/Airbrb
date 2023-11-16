import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import jsonIcon from '../../assets/json.png';
import rocketIcon from '../../assets/rocket.png';
import CenteredBox from '../../components/CenteredBox';

/**
 * CreateListing component represents the initial screen for choosing
 * how to create a listing, either through express creation or JSON upload.
 */
function CreateListing () {
  // Access the navigation function from React Router
  const navigate = useNavigate();

  return (
    <CenteredBox>
      <VStack spacing={8}>
        <Text>Choose how to create your listing!</Text>

        {/* Flex container to display options */}
        <Flex justify="space-evenly" width="100%">
          {/* Box for Express Creation */}
          <Box p={6} marginRight={2} borderWidth={1} borderRadius={25} boxShadow="lg">
            <VStack spacing={4}>
              <h1>Express Creation</h1>

              {/* Image representing Express Creation */}
              <Image
                src={rocketIcon}
                boxSize="80%"
                cursor="pointer"
                onClick={() => navigate('/create-listing/title')}
                alt="Express creation"
              />
            </VStack>
          </Box>

          {/* Box for JSON Upload */}
          <Box p={6} marginLeft={2} borderWidth={1} borderRadius={25} boxShadow="lg">
            <VStack spacing={4}>
              <h1>JSON Upload</h1>

              {/* Image representing JSON Upload */}
              <Image
                src={jsonIcon}
                boxSize="80%"
                cursor="pointer"
                onClick={() => navigate('/create-listing/json')}
                alt="JSON Upload"
              />
            </VStack>
          </Box>
        </Flex>
      </VStack>
    </CenteredBox>
  )
}

export default CreateListing;

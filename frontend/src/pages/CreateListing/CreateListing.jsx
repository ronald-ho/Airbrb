import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import CenteredBox from '../../components/CenteredBox';
import React from 'react';
import rocketIcon from '../../assets/rocket.png';
import jsonIcon from '../../assets/json.png';
import { useNavigate } from 'react-router-dom';

function CreateListing () {
  const navigate = useNavigate();

  return (
    <CenteredBox>
      <VStack spacing={8}>
        <Text>Choose how to create your listing!</Text>
        <Flex justify="space-between" width="100%">
          <Box p={8} marginRight={2} borderWidth={1} borderRadius={25} boxShadow="lg">
            <VStack spacing={4}>
              <h1>Express Creation</h1>
              <Image
                src={rocketIcon}
                boxSize="150px"
                cursor="pointer"
                onClick={() => navigate('/create-listing/title')}/>
            </VStack>
          </Box>
          <Box p={8} marginLeft={2} borderWidth={1} borderRadius={25} boxShadow="lg">
            <VStack spacing={4}>
              <h1>Json upload</h1>
              <Image
                src={jsonIcon}
                boxSize="150px"
                cursor="pointer"
                onClick={() => navigate('/create-listing/json')}/>
            </VStack>
          </Box>
        </Flex>
      </VStack>
    </CenteredBox>
  )
}

export default CreateListing;

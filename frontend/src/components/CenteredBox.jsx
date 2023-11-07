import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const CenteredBox = ({ children }) => {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" overflowX="hidden">
      <Box p={8} maxW={{ base: '100%', md: '50%' }} borderWidth={1} borderRadius={25} boxShadow="lg" bg="white"
           minH="500px">
        {children}
      </Box>
    </Flex>
  );
};

export default CenteredBox;

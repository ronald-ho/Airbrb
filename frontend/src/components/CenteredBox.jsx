import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const CenteredBox = ({ children }) => {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box p={8} width="50%" borderWidth={1} borderRadius={25} boxShadow="lg" bg="white">
        {children}
      </Box>
    </Flex>
  );
};

export default CenteredBox;

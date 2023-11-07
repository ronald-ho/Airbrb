import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const CenteredBox = ({ children, customStyles }) => {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" overflowX="hidden">
      <Box p={8} borderWidth={1} borderRadius={25} boxShadow="lg" bg="white" {...customStyles}>
        {children}
      </Box>
    </Flex>
  );
};

export default CenteredBox;

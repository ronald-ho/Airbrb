import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const CenteredBox = ({ children }) => {
  return (
    <Flex minH="90vh" maxWidth="80vw" minWidth="60vw" align="center" justify="center" overflowX="hidden" mt="-1.5rem">
      <Box p={8} borderWidth={1} borderRadius={25} boxShadow="lg" bg="white">
        {children}
      </Box>
    </Flex>
  );
};

export default CenteredBox;

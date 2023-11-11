import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const CenteredBox = ({ children, customStyles }) => {
  return (
    <Flex minH="90vh" maxWidth="100vw" align="center" justify="center" overflowX="hidden" mt="-1.5rem">
      <Box p={8} borderWidth={1} borderRadius={25} boxShadow="lg" bg="white" {...customStyles}>
        {children}
      </Box>
    </Flex>
  );
};

export default CenteredBox;

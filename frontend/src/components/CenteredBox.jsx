import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

const CenteredBox = ({ children }) => {
  return (
    <Flex minH='90vh' align='center' justify='center' overflowX='hidden' mt='-1.5rem'>
      <Box p={8} borderWidth={1} borderRadius={25} boxShadow='lg' bg='white' maxWidth='85vw' minWidth='50vw'>
        {children}
      </Box>
    </Flex>
  );
};

export default CenteredBox;

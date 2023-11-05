import React from 'react';
import { Box, Button, InputGroup, Input, InputRightElement, IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';

function searchBar (props) {
  // const [show, setShow] = React.useState(false)
  const handleClick = () => console.log('click')

  return (
    <Box>
      {/* <Badge>
        hi
      </Badge> */}
      {/* <Box display='flex'>
        Search
        <SearchIcon />
      </Box> */}
      <InputGroup>
        <Input type='search' alt='search bar' />
        <InputRightElement pointerEvents='none'>
          <IconButton aria-label='Submit Search' colorScheme='teal' icon={<SearchIcon />} />
          {/* <SearchIcon color='gray.300' /> */}
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {/* {show ? 'Hide' : 'Show'} */}
            hi
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}

export default searchBar;

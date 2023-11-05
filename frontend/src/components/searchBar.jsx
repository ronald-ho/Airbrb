import React, { useState } from 'react';
import { Box, Text, Divider, Circle, Input, FormControl, FormLabel, IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';

function SearchBar ({ onClickHandler }) {
  const handleClick = () => {
    onClickHandler();
  };

  return (
    <Box px='2' py='2' as='button' alignItems='center' borderWidth='1px' borderRadius='40px' display='flex' height='50px' onClick={handleClick}>
      <Text px='2' fontWeight='semibold'>Anywhere</Text>
      <Divider orientation='vertical' />
      <Text px='2' fontWeight='semibold'>Any week</Text>
      {/* <Divider orientation='vertical' /> */}
      {/* <Text px='2' >Add guests</Text> */}
      <Circle bg='gray.100' size='30px'>
        <SearchIcon color='black' boxSize='15px'/>
      </Circle>
    </Box>
  );
}

function InputBar ({ onClickHandler }) {
  const [searchInput, setSearchInput] = useState(null);

  const submitSearch = () => {
    setSearchInput('info');
  }

  const handleClick = () => {
    onClickHandler(searchInput);
  };

  return (
    <Box py='2' alignItems='center' borderWidth='1px' borderRadius='40px' display='flex' height='70px' onClick={handleClick}>
      <Box px='3' _hover={{ bg: 'gray.100', borderWidth: '1px', borderLeftRadius: '40px' }}>
        <FormControl>
          <FormLabel px='3' mb='1'>Where</FormLabel>
          <Input type='text' placeholder='Search title or city' borderWidth='0px' focusBorderColor='transparent' />
        </FormControl>
      </Box>
      <Divider orientation='vertical' />
      <Text px='2' fontWeight='semibold'>Any week</Text>
      {/* <Box px='3' _hover={{ bg: 'gray.100', borderWidth: '1px' }}>
        <FormControl>
          <FormLabel px='3' mb='1'>Where</FormLabel>
          <Input type='text' placeholder='Search title or city' borderWidth='0px' focusBorderColor='transparent' />
        </FormControl>
      </Box> */}
      <Divider orientation='vertical' />
      <Text px='2' >Add guests</Text>
      {/* <Circle bg='gray.100' size='30px'>
        <SearchIcon color='black' boxSize='15px'/>
      </Circle> */}
      <IconButton
        // colorScheme='teal'
        aria-label='Submit Search'
        size='sm'
        icon={<SearchIcon />}
        onClick={submitSearch}
      />
    </Box>
  )
}

export { SearchBar, InputBar };

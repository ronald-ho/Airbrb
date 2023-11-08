import React, { useState } from 'react';
import { Box, Text, Divider, Circle, Input, FormControl, FormLabel, Button } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';

function SearchBar ({ onClickHandler }) {
  const handleClick = () => {
    onClickHandler();
  };

  return (
    <Box
      px='2'
      py='2'
      as='button'
      alignItems='center'
      borderWidth='1px'
      borderRadius='40px'
      display='flex'
      height='50px'
      onClick={handleClick}
    >
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

function InputBar ({ onClickHandler, callReset, stopReset }) {
  const [selectedDates, setSelectedDates] = useState([undefined, undefined]);

  const textSearch = document.getElementById('location-search');

  // Reset the text input and daterangepicker field
  if (callReset) {
    textSearch.value = '';

    // We don't set state to prevent infinite re-rendering
    if (selectedDates[0] !== undefined && selectedDates[1] !== undefined) {
      setSelectedDates([undefined, undefined]);
    }

    stopReset();
  }

  // Pass search parameters upwards
  const submitSearch = () => {
    const searchFilters = {
      textSearch: textSearch ? textSearch.value : '',
      dateSearch: selectedDates,
    }

    onClickHandler(searchFilters);
  }

  return (
    <Box py='2' alignItems='center' borderWidth='1px' borderRadius='40px' display='flex' height='70px'>
      <Box px='3' _hover={{ bg: 'gray.100', borderWidth: '1px', borderLeftRadius: '40px' }}>
        <FormControl>
          <FormLabel px='3' mb='1'>Where</FormLabel>
          <Input id='location-search' type='text' placeholder='Search title or city' borderWidth='0px' focusBorderColor='transparent' defaultValue='' />
        </FormControl>
      </Box>
      <Divider orientation='vertical' />
      <Box px='3' _hover={{ bg: 'gray.100', borderWidth: '1px' }}>
        <FormControl>
          <FormLabel px='3' mb='1'>When</FormLabel>
          <RangeDatepicker
            selectedDates={selectedDates}
            onDateChange={setSelectedDates}
            propsConfigs={{
              dateNavBtnProps: {
                colorScheme: 'blue',
                variant: 'outline',
              },
              dayOfMonthBtnProps: {
                defaultBtnProps: {
                  borderColor: 'red.300',
                  _hover: {
                    background: 'blue.400',
                  },
                },
                isInRangeBtnProps: {
                  color: 'purple.800',
                  borderColor: 'blue.300',
                },
                selectedBtnProps: {
                  background: 'blue.200',
                  borderColor: 'blue.300',
                  color: 'blue.600',
                },
                todayBtnProps: {
                  background: 'teal.200',
                  color: 'teal.700',
                },
              },
              inputProps: {
                size: 'sm',
                borderWidth: '0px',
                focusBorderColor: 'black',
                placeholder: 'Check-in / Check-out',
              },
            }}
          />
        </FormControl>
      </Box>

      {/* <Box px='3' _hover={{ bg: 'gray.100', borderWidth: '1px' }}>
        <FormControl>
          <FormLabel px='3' mb='1'>Where</FormLabel>
          <Input type='text' placeholder='Search title or city' borderWidth='0px' focusBorderColor='transparent' />
        </FormControl>
      </Box> */}
      {/* <Divider orientation='vertical' />
      <Text px='2' >Add guests</Text> */}
      {/* <Circle bg='gray.100' size='30px'>
        <SearchIcon color='black' boxSize='15px'/>
      </Circle> */}
      <Button leftIcon={<SearchIcon />} onClick={submitSearch} borderRadius='20px' mr='2'>
        Search
      </Button>
      {/* <IconButton
        // colorScheme='teal'
        isRound={true}
        aria-label='Submit Search'
        size='sm'
        icon={<SearchIcon />}
        onClick={submitSearch}
      /> */}
    </Box>
  )
}

export { SearchBar, InputBar };
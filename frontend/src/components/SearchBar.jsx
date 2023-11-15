import React, { useEffect, useState } from 'react';
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
      borderColor='gray.200'
      display='flex'
      height='50px'
      onClick={handleClick}
      position='fixed'
      left="50%"
      top="2"
      transform='translate(-50%, 0%)'
      zIndex={400}
    >
      <Text px='2' fontWeight='semibold'>Anywhere</Text>
      <Divider orientation='vertical' />
      <Text px='2' fontWeight='semibold' whiteSpace='nowrap'>Any week</Text>
      <Circle bg='gray.100' size='30px'>
        <SearchIcon color='black' boxSize='15px'/>
      </Circle>
    </Box>
  );
}

// function InputBar ({ onClickHandler, callReset, stopReset, updateFilters }) {
function InputBar ({ onClickHandler, updateFilters }) {
  const [selectedDates, setSelectedDates] = useState([undefined, undefined]);
  const [textInput, setTextInput] = useState('');

  const onInputChange = () => {
    const searchFilters = {
      textSearch: textInput,
      dateSearch: selectedDates,
    }

    updateFilters(searchFilters);
  }

  useEffect(() => {
    onInputChange();
  }, [textInput, selectedDates]);

  return (
    <Box
      py='2'
      alignItems='center'
      borderWidth='1px'
      borderRadius='40px'
      borderColor='gray.200'
      display='flex'
      height='70px'
      position='fixed'
      left="50%"
      top="3"
      transform='translate(-50%, 60px)'
      width={{ base: '95%', md: '70%' }}
      bg={'white'}
      zIndex={500}
    >
      <Box px='3' _hover={{ bg: 'gray.100', borderWidth: '1px', borderLeftRadius: '40px' }} flexGrow='2'>
        <FormControl>
          <FormLabel px='3' mt='1' mb='0'>Where</FormLabel>
          <Input id='location-search' type='text' placeholder='By title or city'
            size='sm'
            my='1'
            borderWidth='0px'
            focusBorderColor='transparent'
            // defaultValue=''
            value={textInput}
            onChange={(event) => setTextInput(event.target.value)}
          />
        </FormControl>
      </Box>
      <Divider orientation='vertical' />
      <Box px='3' _hover={{ bg: 'gray.100', borderWidth: '1px' }} >
        <FormControl>
          <FormLabel px='3' mt='1' mb='0'>When</FormLabel>
          <RangeDatepicker
            selectedDates={selectedDates}
            onDateChange={setSelectedDates}
            propsConfigs={{
              dateNavBtnProps: {
                colorScheme: 'red',
                variant: 'outline',
              },
              dayOfMonthBtnProps: {
                defaultBtnProps: {
                  borderColor: 'red.300',
                  _hover: {
                    background: 'red.400',
                  },
                },
                isInRangeBtnProps: {
                  color: 'red.800',
                  borderColor: 'red.300',
                },
                selectedBtnProps: {
                  background: 'red.200',
                  borderColor: 'red.300',
                  color: 'black',
                },
                todayBtnProps: {
                  background: 'black',
                  color: 'white',
                },
              },
              inputProps: {
                size: 'sm',
                borderWidth: '0px',
                focusBorderColor: 'black',
                placeholder: 'Check In / Out',
                my: '1',
              },
            }}
          />
        </FormControl>
      </Box>
      <Button leftIcon={<SearchIcon />} onClick={onClickHandler} borderRadius='20px' mr='2'>
        Search
      </Button>
    </Box>
  )
}

export { SearchBar, InputBar };

import {
  Divider,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Text
} from '@chakra-ui/react';
import React from 'react';

function QuantitySelector ({
  title,
  units,
  defaults,
  value,
  setter
}) {
  return (
    <Stack direction='column' spacing={4}>
      <Text fontWeight='bold'>{title}</Text>
      <Stack direction='column' spacing={4}>
        <RangeSlider value={value} min={defaults[0]} max={defaults[1]} step={1} onChange={(val) => setter(val)}>
          <RangeSliderTrack bg='red.100'>
            <RangeSliderFilledTrack bg='#ff385c'/>
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={5} index={0} borderColor='gray.300'/>
          <RangeSliderThumb boxSize={5} index={1} borderColor='gray.300'/>
        </RangeSlider>
        <Stack direction='row' align={'center'}>
          <Stack borderRadius='20px' borderWidth='1px' direction='column' alignItems='center' p='2'>
            <Text fontWeight='semibold'>Minimum</Text>
            <Text>{units}{value[0]}</Text>
          </Stack>
          <Divider/>
          <Stack borderRadius='20px' borderWidth='1px' direction='column' alignItems='center' p='2'>
            <Text fontWeight='semibold'>Maximum</Text>
            <Text>
              {units}{value[1]}
              {
                value[0] === defaults[0] && defaults[1] === value[1]
                  ? '+'
                  : ''
              }
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default QuantitySelector;

import React from 'react';
import { Button, Flex, HStack, Input, Text, useNumberInput } from '@chakra-ui/react';

function NumberInputFieldCustom ({ title, value, onChange }) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: value,
    min: 0,
    onChange: (valueAsString, valueAsNumber) => onChange(valueAsNumber),
  });

  const increaseProps = getIncrementButtonProps();
  const decreaseProps = getDecrementButtonProps();
  const inputProps = getInputProps({ onChange });

  return (
    <HStack justify="space-between" w="100%">
      <Flex justify="space-between" w="100%">
        <Text>{title}:</Text>
        <HStack minW="0">
          <Button {...decreaseProps}>-</Button>
          <Input {...inputProps} />
          <Button {...increaseProps}>+</Button>
        </HStack>
      </Flex>
    </HStack>
  );
}

export default NumberInputFieldCustom;

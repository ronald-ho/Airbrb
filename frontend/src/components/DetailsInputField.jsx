import { Button, HStack, Input, Text } from '@chakra-ui/react';
import React from 'react';

const DetailsInputField = ({ title, numberInput }) => {
  const increaseProps = numberInput.getIncrementButtonProps();
  const decreaseProps = numberInput.getDecrementButtonProps();
  const inputProps = numberInput.getInputProps();

  return (
    <HStack justify="space-between">
      <Text>{title}:</Text>
      <HStack>
        <Button {...decreaseProps}>-</Button>
        <Input {...inputProps} />
        <Button {...increaseProps}>+</Button>
      </HStack>
    </HStack>
  );
};

export default DetailsInputField;

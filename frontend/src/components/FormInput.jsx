import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

const FormInput = ({
  name,
  label,
  type,
  value,
  onChange
}) => (
  <FormControl isRequired>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Input type={type} name={name} value={value} onChange={onChange}/>
  </FormControl>
);

export default FormInput;

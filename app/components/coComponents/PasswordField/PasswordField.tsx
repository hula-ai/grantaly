import React, { useState } from 'react';
import { FormControl, FormLabel, Input, IconButton } from '@chakra-ui/react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

interface PasswordFieldProps {
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ label = "Password", name, value, placeholder = "at least 8 characters", onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => setShowPassword(!showPassword);

  return (
    <FormControl id={name} >
      <FormLabel>{label}</FormLabel>
      <Input
        name={name}
        type={showPassword ? 'text' : 'password'}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        py={6}
        border='1px solid #adafb1'
        _hover={{ border: '1px solid #adafb1' }}
        _placeholder={{ fontSize: '13px' }}
      />
      <IconButton
        aria-label={showPassword ? "Hide password" : "Show password"}
        icon={showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        onClick={handleClick}
        position="absolute"
        right="0"
        top="70%"
        transform="translateY(-50%)"
        variant="unstyled"
        zIndex="1"
      />
    </FormControl>
  );
};

export default PasswordField;

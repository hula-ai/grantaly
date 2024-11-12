import { Box, FormLabel, Input } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
interface Props {
  label: string;
  name: string;
  labelVariant: string;
  variant: string;
  type: string;
  state: string;
  placeholder: string;
  setState: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  inputRef?: string;
  inputStyle?: any;
}
const LabelInput: React.FC<Props> = ({
  label,
  inputRef,
  labelVariant,
  inputStyle,
  state,
  name,
  setState,
  variant,
  type,
  placeholder,
}) => {
  return (
    <Box width={"100%"}>
      <FormLabel marginBottom={"9px"} variant={labelVariant}>
        <Box color={'black'} fontSize={'15px'} py={3} display={"flex"}>{label}</Box>
        <Input
          ref={inputRef}
          sx={inputStyle}
          value={state ?? ""}
          name={name}
          onChange={setState}
          variant={variant}
          placeholder={placeholder}
          type={type}
          min={0}
          bg={'white'}
          _placeholder={{ fontSize: '13px', color: 'gray' }}
          border='1px solid #adafb1'
          _hover={{ border: '1px solid #adafb1' }}
        />
      </FormLabel>
    </Box>
  );
};

export default LabelInput;

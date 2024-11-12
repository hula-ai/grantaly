import { Spinner } from "@chakra-ui/react";
import React from "react";

interface LoadProps {
  style?: any;
  size?: string;
  thickness?:string
}
const Loader: React.FC<LoadProps> = ({thickness, style, size }) => {
  return (
    <Spinner
      thickness={thickness?thickness:"2px"}
      speed="0.75s"
      color="white.100"
      size={size ? size : "md"}
      sx={style}
    />
  );
};

export default Loader;

import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface LoadProps {
  style?: React.CSSProperties;
  size?: number;
  color?: string;
}

const Loader: React.FC<LoadProps> = ({ style, size = 35, color = "#ffffff" }) => {
  return (
    <ClipLoader
      color={color}
      size={size}
      cssOverride={style}
    />
  );
};

export default Loader;

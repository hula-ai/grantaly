"use client";
import React from "react";
import Draggable from "react-draggable";
const DraggingBox = ({ children }: { children: React.ReactNode }) => {
  return <Draggable>{children}</Draggable>;
};

export default DraggingBox;

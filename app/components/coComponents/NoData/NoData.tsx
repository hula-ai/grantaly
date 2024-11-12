import React from "react";
import Header from "../Header/Header";
import { Box } from "@chakra-ui/react";
const NoData = () => {
  return (
    <>
      <Header />
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        No Data is Found
      </Box>
    </>
  );
};

export default NoData;

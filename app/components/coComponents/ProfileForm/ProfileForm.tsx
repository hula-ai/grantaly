"use client";
import { Box } from "@chakra-ui/react";
import React from "react";
import UserInfo from "@/component/ProfileForm/UserInfo";
import Password from "./Password";
const ProfileForm = () => {
  return (
    <Box bg={'white'} minH={"100vh"} display={"flex"} justifyContent={"center"}>
      <Box width={"65%"} py={8}  >
        <Box
          bg={"white"}
          borderRadius={"10px"}
          py={"30px"}
          mt={"40px"}
          height={"max-content"}
          style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius: "8px",
          }}
        >
          <UserInfo />
        </Box>

        <Box
          bg={"white"}
          borderRadius={"10px"}
          py={"30px"}
          mt={"40px"}
          height={"max-content"}
          boxShadow={"md"}
          style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius: "8px",
          }}
        >
          <Password />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileForm;

"use client";
import { Box, Button, Container, Heading, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import Loader from "@/component/Loader/Loader";

import { handleOpenToast } from "@/helper/toast";
import { SignUpField, UserObject } from "@/types/type";
import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

import { ChangeEvent } from "react";
import PasswordField from "@/component/PasswordField/PasswordField";
import { useToastFunction } from "@/utils/ToastFunction";
import { handleClientValidate } from "@/helper/validation";
import { editUser, userSetting } from "@/schemas/validator";

interface Props {
  User: UserObject;
}

const EditUser = ({ User }: Props) => {
  const toast = useToast();
  const [formData, setFormData] = useState<SignUpField>({
    name: User.name,
    email: User.email,
    password: "",
    yoe: User.yoe,
    designation: User.designation,
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const showToast = useToastFunction();
  const [loading, setLoading] = useState<boolean>(false);
  const [credentialsLoading, setCredentialsLoading] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev: SignUpField) => ({ ...prev, [name]: value }));
  };

  const handleSubmitUserDetails = async () => {
    const validate = handleClientValidate(
      editUser,
      {
        name: formData.name,
        designation: formData.designation,
        yoe: formData.yoe,
      },
      toast
    );
    if (!validate) return;
    try {
      setLoading(true);
      const response = await axios.put(
        `/api/admin/user/${User._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      showToast(
        "User Data Submitted",
        "Data Updated Successfully",
        "success",
        3000
      );
    } catch (err) {
      showToast("Error", "Error in updating Record", "error", 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitUserCredentials = async () => {
    const validate = handleClientValidate(
      userSetting,
      {
        email: formData.email,
        confirmPassword: confirmPassword,
        password: formData.password,
      },
      toast
    );
    if (!validate) return;

    try {
      setCredentialsLoading(true);
      const response = await axios.put(
        `/api/admin/user/${User._id}/setting`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCredentialsLoading(false);

      showToast(
        "User Data Submitted",
        "Credentials Updated Successfully",
        "success",
        3000
      );
    } catch (err) {
      setCredentialsLoading(false);

      showToast("Error", "Error in updating Record", "error", 3000);
    } finally {
      setCredentialsLoading(false);
    }
  };
  return (
    <Flex>
      <Box
        display={"flex"}
        pb={"40px"}
        alignItems={"center"}
        flex="1"
        bg="white"
      >
        <Container maxW={"58rem"} alignItems={"center"}>
          <Heading fontWeight={'semibold'} variant={"h3"} color={'purple.100'} mt={"2rem"}>
            Edit User
          </Heading>

          <FormControl mt={{ md: 12, base: 4, lg: 10 }}>
            <FormLabel>Name</FormLabel>
            <Input
              onChange={handleChange}
              name="name"
              py={6}
              value={formData.name}
              type="text"
              border='1px solid #adafb1'
              placeholder="Enter Name"
              _hover={{ border: '1px solid #adafb1' }}
              _placeholder={{ fontSize: '13px' }}
            />
          </FormControl>

          <FormControl mt={{ md: 12, base: 4, lg: 10 }}>
            <FormLabel>Year of Experience</FormLabel>
            <Input
              onChange={handleChange}
              name="yoe"
              value={formData.yoe}
              type="number"
              placeholder="Enter Year"
              py={6}
              border='1px solid #adafb1'
              _hover={{ border: '1px solid #adafb1' }}
              _placeholder={{ fontSize: '13px' }}
            />
          </FormControl>
          <FormControl mt={{ md: 12, base: 4, lg: 10 }}>
            <FormLabel>Designation</FormLabel>
            <Input
              onChange={handleChange}
              name="designation"
              value={formData.designation}
              type="text"
              placeholder="Enter Designation"
              py={6}
              border='1px solid #adafb1'
              _hover={{ border: '1px solid #adafb1' }}
              _placeholder={{ fontSize: '13px' }}
            />
          </FormControl>
          <Button
            disabled={loading}
            onClick={handleSubmitUserDetails}
            py={6}
            bg={"purple.100"}
            mt={"22px"}
            width="full"
            color={'white'}
            _hover={{ backgroundColor: 'purple.100' }}
          >
            {loading ? <Loader /> : "Submit"}
          </Button>
          <FormControl mt={{ md: 12, base: 4, lg: 10 }}>
            <FormLabel>Email</FormLabel>
            <Input
              onChange={handleChange}
              name="email"
              value={formData.email}
              type="email"
              placeholder="example@email.com"
              py={6}
              border='1px solid #adafb1'
              _hover={{ border: '1px solid #adafb1' }}
              _placeholder={{ fontSize: '13px' }}
            />
          </FormControl>

          <FormControl id="password" mt={{ md: 12, base: 4, lg: 10 }}>
            <PasswordField
              name="password"
              value={formData.password}
              placeholder="at least 8 characters"
              onChange={handleChange}

            />
          </FormControl>

          <FormControl id="password" mt={{ md: 12, base: 4, lg: 10 }}>
            <PasswordField
              label="Confirm Password"
              name="ConfirmPassword"
              value={confirmPassword}
              placeholder="at least 8 characters"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </FormControl>

          <Button
            onClick={handleSubmitUserCredentials}
            colorScheme="black"
            isLoading={credentialsLoading}
            width="full"
            py={6}
            bg={"purple.100"}
            mt={"22px"}
            _hover={{ backgroundColor: 'purple.100' }}
          >
            {" Change Credentials"}
          </Button>
        </Container>
      </Box>
    </Flex>
  );
};

export default EditUser;

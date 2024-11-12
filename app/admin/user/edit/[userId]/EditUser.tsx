"use client";
import { Box, Button, Container, Heading, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import Loader from "@/components/coComponents/Loader/Loader";

import { handleOpenToast } from "@/helper/toast";
import { SignUpField, UserObject } from "@/types/type";
import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

import { ChangeEvent } from "react";
import PasswordField from "@/components/coComponents/PasswordField/PasswordField";
import { useToastFunction } from "@/utils/ToastFunction";
import { handleClientValidate } from "@/helper/validation";
import { editUser, userSetting } from "@/schemas/validator";
import { user } from "@/interface/interface";

interface Props {
  User: user;
}

const EditUser = ({ User }: Props) => {
  const toast = useToast();
  const [formData, setFormData] = useState<SignUpField>({
    firstName: User.firstName,
    lastName:User.lastName,
    contact:User.contact,
    email: User.email,
    password: "",
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
    // const validate = handleClientValidate(
    //   editUser,
    //   {
    //     firstName: formData.firstName,
    //     lastName: formData.lastName,
    //     contact: formData.contact,
    //     email: formData.email,
    //   },
    //   toast
    // );
    // if (!validate) return;
    // try {
    //   setLoading(true);
    //   const response = await axios.put(
    //     `/api/admin/user/${User._id}`,
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   showToast(
    //     "User Data Submitted",
    //     "Data Updated Successfully",
    //     "success",
    //     3000
    //   );
    // } catch (err) {
    //   showToast("Error", "Error in updating Record", "error", 3000);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleSubmitUserCredentials = async () => {
    // const validate = handleClientValidate(
    //   userSetting,
    //   {
    //     email: formData.email,
    //     confirmPassword: confirmPassword,
    //     password: formData.password,
    //   },
    //   toast
    // );
    // if (!validate) return;

    // try {
    //   setCredentialsLoading(true);
    //   const response = await axios.put(
    //     `/api/admin/user/${User._id}/setting`,
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   setCredentialsLoading(false);

    //   showToast(
    //     "User Data Submitted",
    //     "Credentials Updated Successfully",
    //     "success",
    //     3000
    //   );
    // } catch (err) {
    //   setCredentialsLoading(false);

    //   showToast("Error", "Error in updating Record", "error", 3000);
    // } finally {
    //   setCredentialsLoading(false);
    // }
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
            <FormLabel>First Name</FormLabel>
            <Input
              onChange={handleChange}
              name="firstName"
              py={6}
              value={formData.firstName}
              type="text"
              border='1px solid #adafb1'
              placeholder="Enter First Name"
              _hover={{ border: '1px solid #adafb1' }}
              _placeholder={{ fontSize: '13px' }}
            />
          </FormControl>
          <FormControl mt={{ md: 12, base: 4, lg: 10 }}>
            <FormLabel>Last Name</FormLabel>
            <Input
              onChange={handleChange}
              name="lastName"
              py={6}
              value={formData.lastName}
              type="text"
              border='1px solid #adafb1'
              placeholder="Enter Last Name"
              _hover={{ border: '1px solid #adafb1' }}
              _placeholder={{ fontSize: '13px' }}
            />
          </FormControl>
          <FormControl mt={{ md: 12, base: 4, lg: 10 }}>
            <FormLabel>Contact</FormLabel>
            <Input
              onChange={handleChange}
              name="contact"
              py={6}
              value={formData.contact}
              type="text"
              border='1px solid #adafb1'
              placeholder="Enter Contact Number"
              _hover={{ border: '1px solid #adafb1' }}
              _placeholder={{ fontSize: '13px' }}
            />
          </FormControl>
          <FormControl mt={{ md: 12, base: 4, lg: 10 }}>
            <FormLabel>Email</FormLabel>
            <Input
              onChange={handleChange}
              name="email"
              py={6}
              value={formData.email}
              type="text"
              border='1px solid #adafb1'
              placeholder="Enter Email"
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

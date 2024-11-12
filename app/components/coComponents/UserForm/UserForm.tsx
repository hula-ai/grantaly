"use client";
import {
  Box,
  Button,
  Container,
  Heading,
  Select,
  useToast,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

import { handleOpenToast } from "@/helper/toast";
import { SignUpField, UserField, UserObject } from "@/types/type";
import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

import { ChangeEvent } from "react";
import PasswordField from "@/component/PasswordField/PasswordField";
import { useToastFunction } from "@/utils/ToastFunction";
import Loader from "../Loader/Loader";
import { handleClientValidate } from "@/helper/validation";
import { userFormSchema, userSchema } from "@/schemas/validator";
import { endPoints } from "@/utils/endpoint";
import { roles, SignUpForm, status, userForm } from "@/schemas/state";
import { useRouter } from "next/navigation";
import { post } from "@/fetch/fetch";

interface Props {
  User: UserObject;
}

const UserForm = () => {
  const toast = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState<UserField>(userForm);
  console.log("formData", formData);

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev: UserField) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    const validate = handleClientValidate(userFormSchema, formData, toast);
    if (!validate) return;
    setLoading(true);
    try {
      const postData = await post(`${endPoints.user}`, formData);

      if (postData.success) {
        setFormData(userForm);
        router.push("/admin/user");
      }
      setLoading(false);
      handleOpenToast(
        postData.success ? "Successfully Create User " : postData.message,
        postData.success ? "success" : "error",
        toast
      );
    } catch (err) {
      setLoading(false);
      handleOpenToast("Something went wrong", "error", toast);
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
        <Container maxW={"60rem"}
          p={10}
          mt={10}
          alignItems={"center"}
          style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius: "8px",
          }}>
          <Text fontWeight={'semibold'} fontSize={'25px'} color={'purple.100'}  >Add User</Text>
          <FormControl mt={{ md: 12, base: 4, lg: 10 }}>
            <FormLabel>Name*</FormLabel>
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
          <FormControl mt={{ md: 10, base: 4, lg: 8 }}>
            <FormLabel>Email*</FormLabel>
            <Input
              py={6}
              border='1px solid #adafb1'
              onChange={handleChange}
              name="email"
              value={formData.email}
              type="email"
              placeholder="example@email.com"
              _hover={{ border: '1px solid #adafb1' }}
              _placeholder={{ fontSize: '13px' }}

            />
          </FormControl>
          <FormControl mt={{ md: 10, base: 4, lg: 8 }}>
            <FormLabel>Year of Experience*</FormLabel>
            <Input
              py={6}
              onChange={handleChange}
              border='1px solid #adafb1'
              min={0}
              name="yoe"
              value={formData.yoe}
              type="number"
              placeholder="Enter Year"
              _hover={{ border: '1px solid #adafb1' }}
              _placeholder={{ fontSize: '13px' }}

            />
          </FormControl>
          <FormControl mt={{ md: 10, base: 4, lg: 8 }}>
            <FormLabel>Designation*</FormLabel>
            <Input
              py={6}
              onChange={handleChange}
              name="designation"
              border='1px solid #adafb1'
              value={formData.designation}
              type="text"
              placeholder="Enter Designation"
              _hover={{ border: '1px solid #adafb1' }}
              _placeholder={{ fontSize: '13px' }}

            />
          </FormControl>

          <FormControl mt={{ md: 10, base: 4, lg: 8 }}>
            <FormLabel>Role*</FormLabel>
            <Select
              value={formData.role}
              name="role"
              onChange={handleChange}
              placeholder="Select role"
            >
              {roles.map((role, index) => (
                <option key={index} value={role.value}>
                  {role.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mt={{ md: 10, base: 4, lg: 8 }}>
            <FormLabel>Status*</FormLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="Select Status"
            >
              {status.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button
            onClick={handleCreateUser}
            colorScheme="purple.100"
            bg={"purple.100"}
            mt={"35px"}
            width="full"
            fontSize={'17px'}
            py={7}
          >
            {loading ? <Loader /> : "Submit"}
          </Button>
        </Container>
      </Box>
    </Flex>
  );
};

export default UserForm;

"use client";
import { Box, Button, useToast } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import LabelInput from "../LabelInput/LabelInput";
import { PasswordField } from "@/types/type";
import { passwordForm } from "@/schemas/state";
import Loader from "../Loader/Loader";
import { userPasswordSchema } from "@/schemas/validator";
import { handleClientValidate } from "@/helper/validation";
import { endPoints } from "@/utils/endpoint";
import { put } from "@/fetch/fetch";
import { handleOpenToast } from "@/helper/toast";

const Password = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const [formData, setFormData] = useState<PasswordField>(passwordForm);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    // Check if the new password matches confirm password
    if (formData.NewPassword !== formData.ConfirmPassword) {
      handleOpenToast(
        "New password and confirm password do not match!",
        "error",
        toast
      );
      return;
    }

    const validate = handleClientValidate(userPasswordSchema, formData, toast);
    if (!validate) return;

    setLoading(true);

    try {
      const response = await put(`${endPoints.password}`, formData);
      console.log(response, "The response is");
      setLoading(false);
      handleOpenToast(
        response.success ? "Password updated successfully" : response.message,
        response.success ? "success" : "error",
        toast
      );
    } catch (err) {
      setLoading(false);
      handleOpenToast("Something went wrong", "error", toast);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box px={"70px"}>
      <Box display={"flex"} mt={"30px"} width={"100%"} gap={"20px"}>
        <LabelInput
          state={formData.OldPassword}
          setState={handleChange}
          name={"OldPassword"}
          labelVariant={"label"}
          type="password"
          variant={"bg-input"}
          placeholder="Enter current password"
          label={"Old Password*"}
        />
        <LabelInput
          state={formData.NewPassword}
          setState={handleChange}
          name={"NewPassword"}
          labelVariant={"label"}
          type="password"
          variant={"bg-input"}
          placeholder="Enter new password"
          label={"New Password*"}
        />
      </Box>
      <Box display={"flex"} mt={"30px"} width={"50%"} gap={"20px"}>
        <LabelInput
          state={formData.ConfirmPassword}
          setState={handleChange}
          name={"ConfirmPassword"}
          labelVariant={"label"}
          type="password"
          variant={"bg-input"}
          placeholder="Enter new password again"
          label={"Confirm Password*"}
        />
      </Box>
      <Box
        mx={"auto"}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        mt={"30px"}
      >
        <Button
          // colorScheme="black"
          bg={"purple.100"}
          color={'white'}
          _hover={{ backgroundColor: 'purple.100' }}
          type="submit"
          mt={"20px"}
          px={10}
          fontSize={'17px'}
          onClick={handlePasswordChange}
          disabled={loading}
        >
          {loading ? <Loader /> : "Save"}
        </Button>
      </Box>
    </Box>
  );
};

export default Password;

"use client";
import {
  Box,
  Button,
  useToast,
  Spinner,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { handleOpenToast } from "@/helper/toast";
import EditProfile from "../EditProfile/EditProfile";
import LabelInput from "../LabelInput/LabelInput";
import { UserField } from "@/types/type";
import { userForm } from "@/schemas/state";
import { handleGetUserInfo } from "@/utils/userInfo";
import { handleClientValidate } from "@/helper/validation";
import { userFormSchema } from "@/schemas/validator";
import { endPoints } from "@/utils/endpoint";
import { put } from "@/fetch/fetch";
import Loader from "../Loader/Loader";
import { handleSingleUpload } from "@/helper/upload";

const UserInfo = () => {
  const toast = useToast();
  const [formData, setFormData] = useState<UserField>(userForm);
  const [loading, setLoading] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [receiveNotifications, setReceiveNotifications] = useState(false); // Notification toggle state

  // Handle notifications toggle switch change
  const handleNotificationToggleChange = () => {
    setReceiveNotifications(!receiveNotifications);
  };

  const handleImageDelete = () => {
    setProfilePic(null);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (!target || !target.files || target.files.length === 0) return;
    const file = target.files[0];
    setProfilePic(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev: UserField) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const validate = handleClientValidate(userFormSchema, formData, toast);
    if (!validate) return;

    setLoading(true);

    try {
      let profilePicUrl = formData.profilePic;
      if (profilePic) {
        setProfileLoading(true);
        const uploadResult = await handleSingleUpload(profilePic);
        setProfileLoading(false);
        if (uploadResult?.url) {
          profilePicUrl = uploadResult.url;
        }
      }

      // Update payload to include notification preference
      const payload = {
        ...formData,
        profilePic: profilePicUrl,
        receiveNotifications, // Include the notification preference
      };

      // Send the updated payload with the notification preference to the API
      const response = await put(`${endPoints.user}`, payload);
      if (response.success && response.data) {
        setFormData(response.data);
        setReceiveNotifications(response.data.receiveNotifications); // Update the toggle state
      }

      setLoading(false);
      handleOpenToast(
        response.success ? "Profile updated successfully" : response.message,
        response.success ? "success" : "error",
        toast
      );
    } catch (err) {
      setLoading(false);
      setProfileLoading(false);
      handleOpenToast("Something went wrong", "error", toast);
    }
  };

  useEffect(() => {
    setInitialLoading(true);
    handleGetUserInfo().then((response) => {
      setFormData(response?.data);
      setInitialLoading(false);
      setReceiveNotifications(response?.data.receiveNotifications || false); // Load notification preference
    });
  }, []);

  return (
    <Box px={"60px"}>
      {initialLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" />
        </Box>
      ) : (
        <>
          <EditProfile
            handleEvent={handleProfileImageChange}
            handleImageDelete={handleImageDelete}
            profile={profilePic ? URL.createObjectURL(profilePic) : formData.profilePic}
            loading={profileLoading}
          />

          {profileLoading && (
            <Box display="flex" justifyContent="center" mt="10px">
              <Spinner size="md" />
            </Box>
          )}

          <Box display={"flex"} mt={"30px"} width={"100%"} gap={"20px"}>
            <LabelInput
              state={formData.name}
              setState={handleChange}
              name={"name"}
              labelVariant={"label"}
              type="text"
              variant={"bg-input"}
              placeholder="Enter name"
              label={"Name*"}
            />
            <LabelInput
              state={formData.email}
              setState={handleChange}
              name={"email"}
              labelVariant={"label"}
              type="text"
              variant={"bg-input"}
              placeholder="Enter email"
              label={"Email*"}
            />
          </Box>

          <Box display={"flex"} mt={"30px"} width={"100%"} gap={"20px"}>
            <LabelInput
              state={formData.designation}
              setState={handleChange}
              name={"designation"}
              labelVariant={"label"}
              type="text"
              variant={"bg-input"}
              placeholder="Enter designation"
              label={"Designation*"}
            />
            <LabelInput
              state={formData.yoe}
              setState={handleChange}
              name={"yoe"}
              labelVariant={"label"}
              type="text"
              variant={"bg-input"}
              placeholder="Enter year of experience"
              label={"Year of Experience*"}
            />
          </Box>

          {/* Notification toggle switch */}
          <FormControl display="flex" alignItems="center" mt="30px">
            <FormLabel htmlFor="notification-switch" mb="0">
              Receive Notifications:
            </FormLabel>
            <Switch
              id="notification-switch"
              isChecked={receiveNotifications}
              onChange={handleNotificationToggleChange}
              size="md"
              colorScheme="purple.100"
              sx={{
                ".chakra-switch__thumb": {
                  bg: "purple.100",
                },
                ".chakra-switch__track": {
                  bg: "gray.100",
                },
              }}
            />
          </FormControl>

          <Box
            mx={"auto"}
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            mt={"30px"}
          >
            <Button
              // colorScheme="bls"
              bg={"purple.100"}
              color={'white'}
              _hover={{ backgroundColor: 'purple.100' }}
              type="submit"
              mt={"20px"}
              px={10}
              fontSize={'17px'}
              onClick={handleProfileSave}
              disabled={loading}
            >
              {loading ? <Loader /> : "Save"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default UserInfo;

import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import deleteProfile from "@/asset/deleteProfile.svg";
import profile_icon from "@/asset/profile_icon.svg";
import { MdDelete } from "react-icons/md";
import Loader from "../Loader/Loader";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
interface Props {
  readOnly?: boolean;
  loading?: boolean;
  handleEvent?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleImageDelete?: () => void;
  profile: string | undefined | File;
}

const EditProfile: React.FC<Props> = ({
  readOnly,
  loading,
  handleEvent,
  handleImageDelete,
  profile,
}) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      {loading ? (
        <Box
          border={"1px solid"}
          borderColor={"gray.300"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"120px"}
          height={"120px"}
          borderRadius={"100px"}
        >
          <Loader
            style={{ color: "green.200", width: "50px", height: "50px" }}
          />
        </Box>
      ) : (
        <Avatar
          src={profile ? profile : profile_icon.src}
          border={"1px solid"}
          borderColor={"gray.200"}
          size={"3rem"}
          bg={"white"}
          width={'120px'}
          height={'120px'}
        >
          {readOnly ? null : (
            <AvatarBadge
              boxSize={{ md: "1.5em", base: "4em" }}
              border={"none"}
              bg="transparent"
            >
              <FormLabel htmlFor="fileInput">
                <Input
                  accept="image/*"
                  id="fileInput"
                  hidden
                  onChange={handleEvent}
                  type="file"
                />
                <Box
                  bg={"gray.900"}
                  borderRadius={"5px"}
                  padding={"5px"}
                  onClick={handleImageDelete}
                  color={"white"}
                >
                  {/* <RiDeleteBin5Line /> */}
                  <AiOutlineEdit fontSize={"15px"} />
                </Box>
              </FormLabel>
            </AvatarBadge>
          )}
        </Avatar>
      )}
      {/* <Box mt={"10px"}>
        <FormLabel
          variant={"button-form-label"}
          htmlFor="fileInput"
          width={"max-content !important"}
          px={"15px"}
        >
          <Input
            accept="image/*"
            id="fileInput"
            hidden
            onChange={handleEvent}
            type="file"
          />
          <Text cursor={"pointer"} color={"white.100"} variant={"p4"}>
            Upload Picture
          </Text>
        </FormLabel>
      </Box> */}
    </Box>
  );
};

export default EditProfile;

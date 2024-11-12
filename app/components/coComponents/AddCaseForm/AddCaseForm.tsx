"use client";
import {
  Box,
  Container,
  Text,
  Heading,
  Button,
  Card,
  CardBody,
  CardHeader,
  useToast,
  Textarea,
  Select,
  Flex,
  IconButton,
  Icon,
} from "@chakra-ui/react";

import { FaFileImage, FaFileArchive } from "react-icons/fa";

import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

import { UserObject } from "@/types/type";
import DataLoader from "../DataLoader/DataLoader";
import { useRouter } from "next/navigation";
import { CloseIcon } from "@chakra-ui/icons";
import Loader from "../Loader/Loader";
import TagInput from "../TagInput/TagInput";
import { addCase } from "@/schemas/validator";
import { handleClientValidate } from "@/helper/validation";
import { handleOpenToast } from "@/helper/toast";
interface Props {
  isAdmin?: boolean;
};
const AddCase: React.FC<Props> = ({ isAdmin }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserObject[]>([]);
  const [selectedPrivacy, setSelectedPrivacy] = useState<string>("");

  console.log("selectedUsers", selectedUsers);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  console.log("Selected file:", selectedFile);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files;
      const filesArray = Array.from(file);
      // console.log("Selected file:", file);
      setSelectedFile((prev) => [...prev, ...filesArray]);
    }
  };

  const uploadFile = async (
    file: File,
    description: string,
    selectedUsers: UserObject[],
    privacy: string
  ) => {
    const SelectedUsersIDS = selectedUsers.map((User) => User._id);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("assignee", JSON.stringify(SelectedUsersIDS));
    formData.append("privacy", privacy);

    try {
      const response = await axios.post("/api/dicom", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return true;
    } catch (error) {
      console.error("Error uploading file:", error);
      return false;
    } finally {
    }
  };

  const handleSubmit = async () => {
    const formData = {
      privacy: selectedPrivacy,
      description: description,
      assigne: selectedUsers,
      files: selectedFile,
    };
    const validate = handleClientValidate(addCase, formData, toast);
    if (!validate) return;
    setUploading(true);
    const uploadingFiles = selectedFile?.map(async (item: File) => {
      try {
        const file = await uploadFile(
          item,
          formData.description,
          formData.assigne,
          formData.privacy
        );
        return file;
      } catch (e) {
        return false;
      }
    });
    const allFileResults = await Promise.all(uploadingFiles);
    const errorInSomeFile = allFileResults.some((item) => item === false)
      ? false
      : true;
    const allFileCourted = allFileResults.every((item) => item === false)
      ? false
      : true;
    setUploading(false);

    if (allFileResults.length === 1 && !errorInSomeFile) {
      handleOpenToast("Error while uploading file", "error", toast);
      return;
    }
    if (!allFileCourted) {
      handleOpenToast("Error while uploading file", "error", toast);
      return;
    }
    if (!errorInSomeFile) {
      handleOpenToast("Some files are corrupted ", "warning", toast);
    } else {
      handleOpenToast("Successfully upload case", "success", toast);
    }
    console.log("allFileResults", allFileResults);

    if (isAdmin) {
      router.push("/admin/cases/view");
    } else {
      router.push("/cases");
    }
  };

  const handleRemoveFile = (ind: number) => {
    setSelectedFile((prev: File[]) => {
      const files = [...prev];
      files.splice(ind, 1);
      return files;
    });
  };

  return (
    <Box bg={'white'} height={"calc(100vh - 15px)"} display={'flex'} >
      <Container mt={8} maxW={"7xl"}>
        <Card
          bg={"white"}
          p={3}
          my={"20px"}
          w={'90%'}
          mx={"auto"}
          style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius: "8px",
          }}
        >
          <CardHeader>
            <Text fontWeight={'semibold'} color={'purple.100'} fontSize={'25px'}>
              Add Case
            </Text>
          </CardHeader>
          <CardBody display={"flex"} flexDirection={"column"} gap={4}>
            <TagInput
              setUsers={setSelectedUsers}
              placeholder="Select Collaborator"
            />
            <Textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              mb={4}
            />
            <Select
              placeholder="Select privacy"
              value={selectedPrivacy ?? ""}
              onChange={(e) => setSelectedPrivacy(e.target.value)}
              mb={4}
            >
              <option key="public" style={{ padding: '30px', }} value="public">
                Public
              </option>
              <option key="private" value="private">
                Private
              </option>
            </Select>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mt={5}
            >
              <Box >
                <Button
                  mt={4}
                  px={4}
                  onClick={handleButtonClick}
                  isLoading={uploading}
                  bg={'purple.100'}
                  color={'white'}
                  _hover={{ bg: 'purple.100' }}
                >
                  Upload File
                </Button>

                {selectedFile?.map((item: File, ind: number) => {
                  return (
                    <Box
                      mt={2}
                      border={"1px solid gray"}
                      px={"20px"}
                      py={"10px"}
                      key={ind}
                    >
                      <Flex justify="space-between" align="center">
                        {item?.name.endsWith(".zip") ? (
                          <Icon as={FaFileArchive} boxSize={4} mr={2} />
                        ) : item?.name.match(/\.(jpeg|jpg|png|gif)$/) ? (
                          <Icon as={FaFileImage} boxSize={4} mr={2} />
                        ) : null}
                        {item?.name}
                        <IconButton
                          aria-label="Remove file"
                          icon={<CloseIcon />}
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                            handleRemoveFile(ind);
                          }}
                          _hover={{ backgroundColor: "lightgrey" }}
                          ml={2}
                        />
                      </Flex>
                    </Box>
                  );
                })}
              </Box>

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                multiple
              />

              <Box display="flex" justifyContent="center" mt={4}>
                <Button
                  variant={"simple"}
                  onClick={handleSubmit}
                  isLoading={uploading}
                  bg={'purple.100'}>
                  {"Submit"}
                </Button>
              </Box>
            </Box>

            {/* <Box display="flex" justifyContent="center" mt={4}>
              <Button
                variant={"simple"}
                onClick={handleSubmit}
                isLoading={uploading}
                bg={'purple.100'}
              >
                {"Submit"}
              </Button>
            </Box> */}

          </CardBody>
        </Card>
      </Container>
    </Box>
  );
};

export default AddCase;

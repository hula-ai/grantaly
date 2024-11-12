"use client";
import {
  Box,
  Container,
  Heading,
  Button,
  Card,
  CardBody,
  CardHeader,
  useToast,
  Textarea,
  Select,
  Flex,
  Icon,
  IconButton,
} from "@chakra-ui/react";

import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Assignee, CaseObject, UserObject } from "@/types/type";
import { useToastFunction } from "@/utils/ToastFunction";
import DataLoader from "@/component/DataLoader/DataLoader";
import { CloseIcon } from "@chakra-ui/icons";
import { FaFileArchive, FaFileImage } from "react-icons/fa";
import Loader from "../Loader/Loader";
import { useParams, useRouter } from "next/navigation";
import ReactSingleSelect from "../react-async-multi-select/ReactSingleSelect";
import { useDispatch, useSelector } from "@/app/redux/store";
import { getCaseById } from "@/app/redux/slices/case";
import { handleClientValidate } from "@/helper/validation";
import { caseEdit } from "@/schemas/validator";
import TagInput from "../TagInput/TagInput";
import { handleOpenToast } from "@/helper/toast";
interface Props {
  isAdmin?: boolean;
}

export interface BodyPayload {
  userId: string | null;
  privacy: string | null;
  description: string | null;
  assigne: string[];
}

const EditCaseForm = ({ isAdmin }: Props) => {
  const router = useRouter();
  const showToast = useToastFunction();
  const dispatch = useDispatch();
  const { caseId } = useParams();

  const Case = useSelector((state) => state.case.caseById);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState<string>(
    Case?.description?.description ?? ""
  );

  const [selectedUsers, setSelectedUsers] = useState<Assignee[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<Assignee | null>(null);
  const [selectedPrivacy, setSelectedPrivacy] = useState<string | null>("");
  const [users, setUsers] = useState<UserObject[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/user"); // Adjust the endpoint to your API
      setUsers(response.data.data);
      const users = response.data.data;
    } catch (error) {
      console.log("user error", error);

      toast({
        title: "Error fetching users.",
        description: "There was an error fetching the user data.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    dispatch(getCaseById(caseId as string));
    fetchUsers();
  }, []);
  useEffect(() => {
    if (Case) {
      setDescription(Case?.description?.description);
      setSelectedOwner(Case?.userId as Assignee);
      setSelectedPrivacy(Case?.privacy);
      setSelectedUsers(Case?.assigne);
    }
  }, [Case]);

  const UpdateDataBase = async (data: BodyPayload) => {
    if (uploading) return;
    setUploading(true);
    try {
      const response = await axios.put(
        `/api/case/${Case?._id}`,
        {
          ...data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      showToast(
        "Case Updated.",
        "Case has been successfully edited.",
        "success",
        2000
      );
      setUploading(false);
      if (isAdmin) {
        router.push("/admin/cases/view");
      } else {
        router.push("/cases");
      }
    } catch (error) {
      setUploading(false);

      showToast(
        "Error.",
        "Case has not been successfully edited.",
        "error",
        2000
      );
    }
  };

  const handleSubmit = async () => {
    const SelectedUsersIDS = selectedUsers.map((User) => User._id);

    const formData: BodyPayload = {
      userId: selectedOwner && selectedOwner?._id ? selectedOwner?._id : "",
      privacy: selectedPrivacy,
      description: description,
      assigne: SelectedUsersIDS,
    };
    const validate = handleClientValidate(caseEdit, formData, toast);
    if (!validate) return;

    await UpdateDataBase(formData);
  };
  const handleTagStateValidation = (tagVal: string, type?: string) => {
    const emailExistAssignee = selectedUsers?.some((item) => {
      return item.email === tagVal;
    });
    const emailExistOwner = selectedOwner && selectedOwner?.email === tagVal;

    if (type === "owner" && emailExistAssignee) {
      handleOpenToast("Selected in collaborator", "error", toast);
      return true;
    } else if (emailExistOwner) {
      handleOpenToast("Selected in owner", "error", toast);

      return true;
    } else {
      return false;
    }
  };
  if (loading || !Case) {
    return <DataLoader />;
  }

  return (
    <Box bg={'white'} boxShadow="0 4px 20px rgba(0, 0, 0, 0.5)"
      py={"20px"} height={"calc(100vh - 15px)"}>
      <Container mt={5} py={5} maxW={"5xl"}>
        <Card bg={"white"} >
          <CardHeader>
            <Heading variant={"h3"} fontWeight={'semibold'} color={'purple.100'} size="md">
              Edit Case
            </Heading>
          </CardHeader>
          <CardBody display={"flex"} flexDirection={"column"} gap={4}>
            {isAdmin && (
              <TagInput
                selectedValue={selectedOwner ? [selectedOwner] : null}
                ownerSelection={true}
                placeholder="Select Owner"
                setUsers={setSelectedOwner}
                handleTagStateValidation={handleTagStateValidation}
              />
            )}
            <TagInput
              selectedValue={selectedUsers}
              placeholder="Select Collaborators"
              setUsers={setSelectedUsers}
              handleTagStateValidation={handleTagStateValidation}
            />

            <Textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            >
              {description}
            </Textarea>
            <Select
              placeholder="Select privacy"
              value={selectedPrivacy ?? ""}
              onChange={(e) => setSelectedPrivacy(e.target.value)}
            >
              <option key="public" value="public">
                Public
              </option>
              <option key="private" value="private">
                Private
              </option>
            </Select>

            <Box display="flex" justifyContent="center" mt={4}>
              <Button
                // variant={"simple"}
                onClick={handleSubmit}
                isLoading={uploading}
                py={6}
                color={'white'}
                bg={'purple.100'}
                width={'full'}
                _hover={{ backgroundColor: 'purple.100' }}
              >
                {uploading ? <Loader /> : "Update"}
              </Button>
            </Box>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
};

export default EditCaseForm;

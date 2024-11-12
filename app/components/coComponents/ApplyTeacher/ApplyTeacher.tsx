"use client";
import { handleOpenToast } from "@/helper/toast";
import { TeachingForm, UserObject } from "@/types/type";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

import { ChangeEvent, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { handleClientValidate } from "@/helper/validation";
import { teachingForm } from "@/schemas/validator";
import { post } from "@/fetch/fetch";

// TODO change type of user
interface Props {
  User: any;

}
const ApplyTeacher: React.FC<Props> = ({ User }) => {
  const toast = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState<TeachingForm>({
    profession: "",
    description: "",
    teachingExperience: "",
  });
  const [loading, setLoading] = useState(false);
  const [isRequested, setIsRequested] = useState<boolean | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: TeachingForm) => ({ ...prev, [name]: value }));
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    const validate = handleClientValidate(teachingForm, formData, toast);
    if (!validate) return;
    setLoading(true);
    try {
      const postData = await post("/user/request", formData);

      if (postData.success) {
        setFormData({
          profession: "",
          description: "",
          teachingExperience: "",
        });
        handleOpenToast(
          postData.message,
          postData.success ? "success" : "error",
          toast
        );
        router.push("/");
      } else {
        handleOpenToast(postData.message, "error", toast);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handleOpenToast("Something went wrong", "error", toast);
    }
  };

  if (User?.isRequested) {
    return (
      <Flex
        bg={'white'}
        display={"flex"}
        justifyContent={"center"}
        minHeight={"100vh"}
        borderTop={'1px solid #e7dfe6'}
      >
        <Box
          mt={"1rem"}
          py={"5rem"}
          borderRadius={"10px"}
          bg={"white"}
          height={"max-content"}
          width={"40%"}
          border={"1px solid"}
          borderColor={"gray.900"}
        >
          <Container maxW={"32rem"} alignItems={"center"} textAlign={"center"}>
            <Heading variant={"h4"} color={"gray.900"}>
              Your request is pending
            </Heading>
            <Text mt={{ md: 4, base: 2 }} variant={"p1"}>
              This might take a while.
              {/* <Text variant={"link-variant"} style={{color:"blue"}}>
              <Link href={"/"}> Home </Link>
            </Text> */}
            </Text>
          </Container>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex
      bg={"white"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"100vh"}
    >
      <Box
        py={"4rem"}
        borderRadius={"10px"}
        bg={"white"}
        height={"max-content"}
        width={"50%"}
        // border={"1px solid"}
        // borderColor={"gray.900"}
        style={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          borderRadius: "8px",
        }}
      >
        <Container maxW={"37rem"} alignItems={"center"}>
          <Heading variant={"h4"} color={"purple.100"}>
            Apply as a Teacher
          </Heading>
          <Text mt={{ md: 4, base: 2 }} fontSize={'15px'} variant={"p1"}>
            Take the next step in your career. Apply now to join our team of
            educators.
          </Text>

          <form onSubmit={handleApply}>
            <FormControl mt={{ md: 8, base: 4 }}>
              <FormLabel  >Profession*</FormLabel>
              <Input
                onChange={handleChange}
                name="profession"
                value={formData.profession}
                type="text"
                py={6}
                placeholder="Enter Profession"
                border='1px solid #adafb1'
                _hover={{ border: '1px solid #adafb1' }}
                _placeholder={{ fontSize: '13px' }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Teaching Experience*</FormLabel>
              <Input
                onChange={handleChange}
                name="teachingExperience"
                value={formData.teachingExperience}
                type="text"
                py={6}
                placeholder="Enter Teaching Experience"
                border='1px solid #adafb1'
                _hover={{ border: '1px solid #adafb1' }}
                _placeholder={{ fontSize: '13px' }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description*</FormLabel>
              <Textarea
                onChange={handleChange}
                name="description"
                value={formData.description}
                placeholder="Enter Description"
                py={5}
                border='1px solid #adafb1'
                _hover={{ border: '1px solid #adafb1' }}
                _placeholder={{ fontSize: '13px' }}
              />
            </FormControl>

            <Button
              colorScheme="black"
              bg={"purple.100"}
              color={'white'}
              type="submit"
              mt={"25px"}
              width="full"
              py={6}
            >
              {loading ? <Loader /> : " Apply"}
            </Button>
          </form>
          {/* <Text variant={"p1"} textAlign={"center"} mt={"50px"}>
            Already applied?{" "}
            <Link as={NextLink} href="/status" color="blue.500">
              Check Application Status
            </Link>
          </Text> */}
        </Container>
      </Box>
    </Flex>
  );
};

export default ApplyTeacher;

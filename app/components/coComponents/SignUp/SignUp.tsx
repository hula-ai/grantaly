"use client";
import { handleOpenToast } from "@/helper/toast";
import { SignUpForm } from "@/schemas/state";
import { SignUpField } from "@/types/type";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

import { ChangeEvent, useState } from "react";
import Loader from "../Loader/Loader";
import { handleClientValidate } from "@/helper/validation";
import { userSchema } from "@/schemas/validator";
import { post } from "@/fetch/fetch";
import { endPoints } from "@/utils/endpoint";
import Logo from "../Logo/Logo";

const SignUp: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpField>(SignUpForm);
  const [loading, setLoading] = useState<Boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev: SignUpField) => ({
        ...prev,
        [name]: checked ? "teacher" : "student",
      }));
    } else {
      setFormData((prev: SignUpField) => ({ ...prev, [name]: value }));
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    const validate = handleClientValidate(userSchema, formData, toast);
    if (!validate) return;
    setLoading(true);
    try {
      const postData = await post(`${endPoints.user}`, formData);

      if (postData.success) {
        setFormData(SignUpForm);
        router.push("/login");
      }
      setLoading(false);
      handleOpenToast(
        postData.success ? "Successfully Sign up" : postData.message,
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
        height={"100vh"}
        display={{ lg: "flex", base: "none" }}
        flex="1"
        position="sticky"
        top={"0px"}
        bg={'purple.100'}
        alignItems={"center"}
        // justifyContent={'center'}
        flexDirection="column"
      >
        {/* <Box mb={4}> */}
        {/* <Heading  color={'white'} variant={"h1"} >Sign Up</Heading> */}
        {/* </Box> */}
        {/* <Box> */}
        <Box
          mt={30}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'100vh'}
        >
          <Box
            bg={'white'}
            w={'100px'}
            h={'95px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            rounded={20}
            textAlign={'center'}
            paddingLeft={2}
          >
            <Logo />
          </Box>
          <Heading color={'white'} mt={3} fontSize={'42px'}>
            Sign Up
          </Heading>
          <Text
            mt={{ md: 4, base: 2 }}
            w={'300px'}
            marginTop={8}
            py={6}
            color={'white'}
            fontSize={'15px'}
            textAlign={'center'}
          >
            Today is a new day. It&apos;s your day. You shape it. Sign in to
            start managing your projects.
          </Text>
        </Box>

        {/* <Text mt={{ md: 4, base: 2 }} color={'white'} fontSize={'13px'}>
          Today is a new day. It&apos;s your day. You shape it. Sign in to
          start managing your projects.
        </Text> */}
        {/* </Box> */}
      </Box>


      <Box
        py={"3rem"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={'center'}
        flex="1.5"
        bg="white"
      >
        <Container maxW={"37rem"}
          rounded={'lg'}
          alignItems={"center"}
          justifyContent={'center'}
        >

          <form onSubmit={handleSignUp}
          >
            <FormControl mt={{ md: 8, base: 4 }}>
              <FormLabel
                // fontSize={'14px'}
                // fontWeight={'semibold'}
                color={'black'}
              >Name</FormLabel>
              <Input
                onChange={handleChange}
                name="name"
                borderBottom={'1px solid #E1E3E5'}
                rounded={'0px'}
                value={formData.name}
                type="text"
                placeholder="Enter Name"
                variant={'input-variant'}
                py={7}
                px={0}

                // borderColor={'gray'}
                _placeholder={{ fontSize: '13px' }}

              />
            </FormControl>
            <FormControl mt={{ md: 8, base: 4 }}>
              <FormLabel>Email</FormLabel>
              <Input
                variant={'input-variant'}
                py={7}
                px={0}

                borderBottom={'1px solid #E1E3E5'}
                rounded={'0px'}
                onChange={handleChange}
                name="email"
                value={formData.email}
                type="email"
                placeholder="Example@email.com"
                _placeholder={{ fontSize: '13px' }}

              />
            </FormControl>
            <FormControl id="password" mt={{ md: 8, base: 4 }}>
              <FormLabel>Password</FormLabel>
              <Input
                variant={'input-variant'}
                py={7}
                px={0}

                borderBottom={'1px solid #E1E3E5'}
                rounded={'0px'}
                onChange={handleChange}
                name="password"
                value={formData.password}
                type="password"
                placeholder="At least 8 characters"
                _placeholder={{ fontSize: '13px' }}
              />
            </FormControl>
            <FormControl mt={{ md: 8, base: 4 }}>
              <FormLabel>Year of Experience</FormLabel>
              <Input
                variant={'input-variant'}
                borderBottom={'1px solid #E1E3E5'}
                rounded={'0px'}
                py={7}
                px={0}

                onChange={handleChange}
                name="yoe"
                min={0}
                value={formData.yoe}
                type="number"
                placeholder="Enter Year"
                _placeholder={{ fontSize: '13px' }}

              />
            </FormControl>
            <FormControl mt={{ md: 8, base: 4 }}>
              <FormLabel>Designation</FormLabel>
              <Input
                variant={'input-variant'}
                py={7}
                px={0}
                borderBottom={'1px solid #E1E3E5'}
                rounded={'0px'}
                // bg={'#F3F4F5'}
                onChange={handleChange}
                name="designation"
                value={formData.designation}
                type="text"
                placeholder="Enter Designation"
                _placeholder={{ fontSize: '13px' }}

              />
            </FormControl>
            <FormControl color={'black'}
              mt={4}>
              <Checkbox
                py={2}
                onChange={handleChange}
                name="role"
                color={'black'}
                // colorScheme="black"
                value={formData.role}
                sx={{
                  "& .chakra-checkbox__control": {
                    border: "1px solid ",
                    borderColor: "gray.900",
                    color: 'black'
                  },
                }}
              >
                Sign Up as Teacher
              </Checkbox>
            </FormControl>

            <Button
              colorScheme="black"
              bg={'purple.100'}
              type="submit"
              py={6}
              mt={"20px"}
              width="full"
            >
              {loading ? <Loader /> : " Sign up"}
            </Button>
          </form>
          <Text variant={"p1"} textAlign={"center"} mt={"30px"}>
            Have an account?{" "}
            <Link fontWeight={'bold'}
              _hover={{ cursor: 'pointer' }}
              as={NextLink} href="/login"
              color="blue.700">
              Login
            </Link>
          </Text>
        </Container>
      </Box>

    </Flex>
  );
};

export default SignUp;

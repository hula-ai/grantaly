// pages/login.js
"use client";
import { handleOpenToast } from "@/helper/toast";
import { handleClientValidate } from "@/helper/validation";
import { SignInForm } from "@/schemas/state";
import { loginSchema } from "@/schemas/validator";
import { SignInField } from "@/types/type";
import { endPoints } from "@/utils/endpoint";
import {
  Box,
  Button,
  Center,
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
import { signIn, getSession, useSession } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Loader from "../Loader/Loader";
import { Role } from "@/utils/constant";
import { handleSetMode } from "@/helper/mode";
import Logo from "../Logo/Logo";

// import Image from 'next/image';

const LoginForm: React.FC = () => {

  const toast = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState<SignInField>(SignInForm);
  const [loading, setLoading] = useState<Boolean>(false);
  const { data: token, status } = useSession();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev: SignInField) => ({ ...prev, [name]: value }));
  };
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    const validate = handleClientValidate(loginSchema, formData, toast);
    if (!validate) return;
    setLoading(true);
    try {
      const postData = await signIn(`credentials`, {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      setLoading(false);
      if (postData?.error) {
        handleOpenToast(postData?.error, "error", toast);
        return;
      }
      if (postData?.ok) {
        const session = await getSession();

        handleSetMode(session?.user?.mode ?? "");
        handleOpenToast("Successfully Login!", "success", toast);
        if (
          session?.user.role === Role.superAdmin ||
          session?.user?.role === Role.admin
        ) {
          router.push("/admin/dashboard");
          return;
        } else {
          router.push("/cases");
          return;
        }
      }
    } catch (err) {
      console.log("login error", err);

      setLoading(false);
      handleOpenToast("Something went wrong", "error", toast);
    }
  };

  return (
    <Flex
      height={{ lg: "100vh", base: "auto" }}
      py={{ lg: "0px", base: "4rem" }}
    >
      <Box display={"flex"}

        alignItems={"center"} flex="1"
        bg="white">
        <Container maxW={"32rem"} alignItems={"center"}
        //  style={{
        //   boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        //   borderRadius: "8px",
        // }}
        >
          <Box display={'flex'} justifyContent={'center'} textAlign={'center'}><Logo hasWidth={true} /></Box>
          <Heading color={'purple.100'} mt={2} textAlign={'center'}>Sign In</Heading>
          <Text mt={{ md: 5, base: 2 }} mb={6} w={'500px'}
            color={'blue.800'}
            fontWeight={'semibold'} fontSize={'12px'} >
            Today is a new day. It&apos;s your day. You shape it. Sign in to
            start managing your projects.
          </Text>

          <form onSubmit={handleSignIn} >
            <FormControl id="email" mt={{ md: 8, base: 4 }}>
              <FormLabel>Email</FormLabel>
              <Input
                onChange={handleChange}
                name="email"
                value={formData.email}
                type="email"
                placeholder="example@email.com"
                borderBottom={'1px solid #C3C6C8'}
                rounded={'0px'}
                variant={'input-variant'}
                py={7}
                px={0}
                _placeholder={{ fontSize: '13px' }}
              />
            </FormControl>
            <FormControl id="password" mt={{ md: 8, base: 4 }}>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="at least 8 characters"
                borderBottom={'1px solid #C3C6C8'}
                _placeholder={{ fontSize: '13px' }}
                rounded={'0px'}
                variant={'input-variant'}
                py={7}
                px={0}
              />
            </FormControl>
            {/* <Text mt={"0.5rem"} textAlign={"end"}>
              <Link
                as={NextLink}
                href="#"
                textAlign={"end"}
                color="blue.500"
                variant={"link"}
                alignSelf="flex-end"
              >
                Forgot Password?
              </Link>
            </Text> */}
            <Button
              colorScheme="blackAlpha"
              bg={"purple.100"}
              mt={12}
              py={5}
              width="full"
              type="submit"
              _hover={{ backgroundColor: 'purple.100' }}
            >
              {loading ? <Loader /> : " Sign in"}
            </Button>
          </form>
          <Text
            variant={"p1"}
            textAlign={"center"}
            sx={{ mt: "30px !important" }}
          >
            Don&apos;t have an account?{" "}
            <Link as={NextLink} href="/sign-up" fontWeight={'bold'} _hover={{ cursor: 'pointer' }} color="blue.700">
              Sign up
            </Link>
          </Text>
        </Container>
      </Box>
      <Box
        bg={'purple.100'}
      //  display={{ lg: "block", base: "none" }} flex="1" position="relative"
      >
        {/* <Image
          width={"100%"}
          height={"100%"}
          src="https://img.freepik.com/free-photo/black-cubes-background-abstract_1123-401.jpg?t=st=1720678877~exp=1720682477~hmac=5a92748b12ab94775d47c9f6ad7664bef568573f7fec8812f46a306f3b4a1c63&w=360"
          alt="Random Image"
          objectFit="cover"
        /> */}
      </Box>
    </Flex>
  );
};

export default LoginForm;

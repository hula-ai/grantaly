"use client";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import logo from "../../asset/Logo-new.svg";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { FiMenu } from "react-icons/fi";
import axios from "axios";
import { put } from "@/fetch/fetch";
import { UserObject } from "@/types/type";
import { Role } from "@/types/type";
import Loader from "../Loader/Loader";
import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";
import { handleGetMode, handleSetMode } from "@/helper/mode";
import { Model } from "mongoose";
import { Mode } from "@/types/enum";
import { handleOpenToast } from "@/helper/toast";
interface headerProps {
  handleStop?: () => void;
  onOpen?: () => void;
  stopRecordingButton?: Boolean;
  loading?: boolean;
  sideBar?: Boolean;
}
const Header: React.FC<headerProps> = ({
  loading,
  handleStop,
  stopRecordingButton,
  onOpen,
  sideBar,
}) => {
  const router = useRouter();
  const toast = useToast();
  const [loaderBlender, setLoaderBlender] = useState(false);
  const [loaderCases, setLoaderCases] = useState(false);
  const [loaderSwitch, setLoaderSwitch] = useState(false);
  const Pathname = usePathname();
  const { data: session, status } = useSession();
  const [mode, setMode] = useState(handleGetMode());

  const handleModeSwitch = async () => {
    setLoaderSwitch(true);
    try {
      const newMode = mode === Mode.TEACHER ? Mode.STUDENT : Mode.TEACHER;
      const response = await put("/user/mode", { mode: newMode });

      if (response.success) {
        handleSetMode(newMode);
        setMode(newMode);
        window.location.reload();
      }
      handleOpenToast(
        response.message,
        response.success ? "success" : "error",
        toast
      );
    } catch (error) {
      handleOpenToast("Something went wrong", "error", toast);
    } finally {
      setLoaderSwitch(false);
    }
  };

  return (
    <Box backgroundColor='white'
    // position={'fixed'}
    >
      <Container
        px={'25px'}
        py={"20px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        maxW={"8xl"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={7}
        // border={'2px solid black'}
        >
          {sideBar ? (
            <IconButton
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
              variant="outline"
              aria-label="open menu"
              color={"white"}
              icon={<FiMenu />}
            />
          ) : null}
          <Link
            onClick={async () => {
              Pathname !== "/" && setLoaderBlender(true);
            }}
            href="/"
          >
            {" "}
            {/* {<Image alt="logo"
              width={70}
              src={logo} />} */}
          </Link>

          <Text variant={"link-variant"}>
            <Link href={"/"}> About Us </Link>
          </Text>
          <Text variant={"link-variant"}>
            <Link href={"/"}> Contact Us </Link>
          </Text>

          {status === "authenticated" && (
            <>
              {session?.user.role === Mode.TEACHER || Mode.STUDENT ? (
                <Text variant={"link-variant"}>
                  <Link href={"/cases"}> Cases </Link>
                </Text>
              ) : null}
              {session?.user.role === Mode.STUDENT && (
                <Text variant={"link-variant"}>
                  <Link href={"/teacher/apply"}> Apply to be a Teacher </Link>
                </Text>
              )}
            </>
          )}
        </Box>
        <Box>
          {status === "authenticated" ? (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={7}
            >
              {session?.user.role === Mode.TEACHER && (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={3}
                >
                  {loaderSwitch ? (
                    <Loader style={{ color: "white", marginInline: "50px" }} />
                  ) : (
                    <Text
                      fontSize={'15px'}
                      fontWeight={'medium'}
                      color={'purple.100'}
                    >
                      <Link href="#" onClick={handleModeSwitch}>
                        {mode === Mode.TEACHER
                          ? "Switch to Student"
                          : "Switch to Teacher"}
                      </Link>
                    </Text>
                  )}
                  <Switch
                    isChecked={mode === Mode.TEACHER}
                    onChange={handleModeSwitch}
                    colorScheme="blackAlpha"
                    size="md"
                    isDisabled={loaderSwitch}
                    sx={{
                      ".chakra-switch__thumb": {
                        bg: "purple.100",
                      },
                      ".chakra-switch__track": {
                        bg: "#F3F4F5",
                      },
                    }}
                  />
                </Box>
              )}
              {stopRecordingButton ? (
                <Button
                  onClick={handleStop}
                  marginLeft={"20px"}
                  size={"md"}
                  isLoading={loading}
                  variant={"white-solid"}
                >
                  Stop Recording
                </Button>
              ) : null}
              <HeaderDropdown />
            </Box>
          ) : (
            <Box display={"flex"} gap={"15px"} alignItems={"center"}>
              <Text
                fontWeight={'bold'}
                fontSize={'17px'}
              >
                <Link href={"/login"}> Log in </Link>
              </Text>
              <Button
                onClick={() => router.push("/sign-up")}
                marginLeft={"20px"}
                size={"md"}
                bg={'#78206E'}
                color={'white'}
                borderRadius={'50'}
                _hover={{ bg: '#78206E' }}
              // variant={"white-solid"}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>
      </Container>
      {/* <Divider /> */}
    </Box>
  );
};

export default Header;

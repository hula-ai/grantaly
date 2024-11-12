"use client";
import { Role } from "@/utils/constant";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const HeaderDropdown = () => {
  const { data: token, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    const signOutUser = await signOut({ callbackUrl: "/login", redirect: true });
    console.log("signOut", signOutUser);
    router.push("/login");
  };
  return (
    <Menu>
      <MenuButton
        rightIcon={<ChevronDownIcon color="black" boxSize={6} />}
        as={Button}
        variant={"white-solid"}
        colorScheme="pink"
        color={'purple.100'}
        fontWeight={'bold'}
      >
        {token?.user?.name}
      </MenuButton>
      <MenuList
        mx={'auto'}
        maxW={'100px'}
        rounded={'xl'}
        boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}
        py={5}
        color={'black'}
        mt={7}
      >
        <MenuGroup py={4} bg='white' >
          {token?.user.role == Role.admin ||
            token?.user.role == Role.superAdmin ? (
            <Link href={"/admin/dashboard"}>
              {" "}
              <MenuItem borderBottom={'2px solid #F3F4F5'} fontWeight={'medium'} px={5} bg='white' _hover={{ bg: 'purple.100', color: 'white' }} py={3} >Dashboard </MenuItem>
            </Link>
          ) : null}
          <Link href={"/profile"} >
            <MenuItem borderBottom={'2px solid #F3F4F5'} fontWeight={'medium'} px={5} bg='white' _hover={{ bg: 'purple.100', color: 'white' }} py={3} >Profile </MenuItem>
          </Link>
          <MenuItem _hover={{ bg: 'purple.100', color: 'white' }} px={5} bg='white' fontWeight={'medium'} borderBottom={'2px solid #F3F4F5'} py={3} onClick={handleSignOut}>Sign Out </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default HeaderDropdown;

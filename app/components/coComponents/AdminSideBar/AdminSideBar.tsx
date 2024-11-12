"use client";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";
import Header from "../Header/Header";
// import LinkButton from "./LinkButton";
import { it } from "node:test";
import Logo from "../Logo/Logo";
import { ReactNode } from "react";

interface LinkItemProps {
  name: string;
  icon: IconType;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems = [
  {
    name: "Dashboard",
    icon: FiHome,
    isButton: true,
    links: [],

    pathname: "/admin/dashboard",
  },
  {
    name: "Teacher Request",
    icon: FiHome,
    isButton: true,
    links: [],

    pathname: "/admin/request",
  },
  {
    name: "Users",
    icon: FiHome,

    links: [
      {
        title: "View",
        pathname: "/admin/user",
      },
      {
        title: "Add",
        pathname: "/admin/user/add",
      },
    ],
  },
  {
    name: "Cases",
    icon: FiHome,

    links: [
      {
        title: "View",
        pathname: "/admin/cases/view",
      },
      {
        title: "Add",
        pathname: "/admin/cases/add",
      },
    ],
  },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={"purple.100"}
      borderRight="1px"
      borderRightColor={"#848385"}
      w={{ base: "230px", md: 60 }}
      pos="fixed"
      px={{ md: " 20px", base: "10px" }}
      h="full"
      {...rest}
    >
      <Flex
        h="10"
        alignItems="center"
        justifyContent="space-between"
      >
        <CloseButton
          color={"white"}
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>
      <Box
        mt={40}
      >
        {/* {LinkItems.map((item, idx) => (
          <Box mb={"20px"} key={idx}>
            <LinkButton
              links={item.links}
              title={item.name}
              pathname={item.pathname}
              isButton={item.isButton}
            />
          </Box>
        ))} */}
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "purple.100",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Box position={"sticky"} top={"0px"} zIndex={999} {...rest}>
      <Header sideBar onOpen={onOpen} />
    </Box>
  );
};

const AdminSideBar = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" maxH={"auto"} >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} />
      {/* #9B3F8D */}
      <Box ml={{ base: 0, md: 60 }} borderTop={'1px solid #e7dfe6'}>
        {children}
      </Box>
    </Box>

  );
};

export default AdminSideBar;

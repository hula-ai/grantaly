import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";


interface Props {
  title: string;
  links: Array<{ title: string; pathname: string }>;
  isButton?: boolean;
  pathname?: string;
}
const LinkButton = ({ title, links, isButton, pathname }: Props) => {
  return (
    <>
      {isButton ? (
        <Link href={pathname ?? "/"}>
          <Button
            py={"25px"}
            as={Button}
            width={"100%"}
            bg={'white'}
            _hover={{ backgroundColor: 'white' }}
            justifyContent={"flex-start"}
          >
            {title}
          </Button>
        </Link>
      ) : (
        <Menu>
          <MenuButton
            // color={'white'}
            as={Button}
            py={"25px"}
            width={"100%"}
            textAlign={"left"}
            bg={'white'}
            _active={{ backgroundColor: 'white' }}
            _hover={{ backgroundColor: 'white' }}
            rightIcon={<ChevronDownIcon boxSize={5} />}
          >
            {title}
          </MenuButton>
          <MenuList minW={'200px'} rounded={'lg'} >
            {links?.map((item, i) => {
              return (
                <Link key={i} href={item.pathname}>
                  {" "}
                  <MenuItem key={i} borderBottom={'2px solid #E0E1E2'} fontWeight={'medium'} px={5} bg='white' _hover={{ bg: 'purple.100', color: 'white' }}>{item.title}</MenuItem>
                </Link>
              );
            })}
          </MenuList>
        </Menu>
      )}
    </>
  );
};

export default LinkButton;

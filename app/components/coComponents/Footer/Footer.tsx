// 'use client'

// import {
//   Box,
//   chakra,
//   Container,
//   Stack,
//   Text,
//   useColorModeValue,
//   VisuallyHidden,
// } from '@chakra-ui/react'
// import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
// import { ReactNode } from 'react'
// import Logo from '../Logo/Logo'

// const SocialButton = ({
//   children,
//   label,
//   href,
// }: {
//   children: ReactNode
//   label: string
//   href: string
// }) => {
//   return (
//     <chakra.button
//       bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
//       rounded={'full'}
//       w={8}
//       h={8}
//       cursor={'pointer'}
//       as={'a'}
//       href={href}
//       display={'inline-flex'}
//       alignItems={'center'}
//       justifyContent={'center'}
//       transition={'background 0.3s ease'}
//       _hover={{
//         bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
//       }}>
//       <VisuallyHidden>{label}</VisuallyHidden>
//       {children}
//     </chakra.button>
//   )
// }

// export default function Footer() {
//   return (
//     <>
//       <Box
//         bg={"purple.100"}
//         py={6}
//         color={"white"}>
//         <Container
//           as={Stack}
//           maxW={'6xl'}
//           py={3}
//           spacing={4}
//           justify={'center'}
//           align={'center'}>
//           {/* <Logo hasWidth={true} /> */}
//           <Box
//             bg={'white'}
//             w={'100px'}
//             h={'95px'}
//             display={'flex'}
//             justifyContent={'center'}
//             alignItems={'center'}
//             rounded={20}
//             textAlign={'center'}
//             paddingLeft={2}
//           >
//             <Logo hasWidth={true} />
//           </Box>
//           <Stack fontWeight={'semibold'}
//             fontSize={'15px'}
//             direction={'row'} spacing={6}>
//             <Box as="a" href={'#'}>
//               Home
//             </Box>
//             <Box as="a" href={'#'}>
//               About
//             </Box>
//             <Box as="a" href={'#'}>
//               Blog
//             </Box>
//             <Box as="a" href={'#'}>
//               Contact
//             </Box>
//           </Stack>

//           <Stack mt={3} direction={'row'} spacing={6}>
//             <SocialButton label={'Twitter'} href={'#'}>
//               <FaTwitter />
//             </SocialButton>
//             <SocialButton label={'YouTube'} href={'#'}>
//               <FaYoutube />
//             </SocialButton>
//             <SocialButton label={'Instagram'} href={'#'}>
//               <FaInstagram />
//             </SocialButton>
//           </Stack>
//         </Container>


//       </Box>

//       {/* <Box
//         borderTopWidth={1}
//         display={'flex'}
//         // alignItems={'flex-end'}
//         borderStyle={'solid'}
//         borderColor={useColorModeValue('gray.200', 'gray.700')}
//         justifyContent={'center'}

//       > */}
//       <Container
//         bg={'#F3F4F5'}
//         as={Stack}
//         maxW={'8xl'}
//         color={'black'}
//         display={'flex'}
//         py={6}
//         // direction={{ base: 'column', md: 'row' }}
//         spacing={4}
//         justify={{ base: 'center', md: 'space-between' }}
//         align={{ base: 'center', md: 'center' }}
//         justifyContent={'center'}
//       >
//         <Text
//           fontWeight={'bold'}
//         >© {new Date().getFullYear()} OHIF  All rights reserved</Text>
//         {/* <Stack direction={'row'} spacing={6}>
//             <SocialButton label={'Twitter'} href={'#'}>
//               <FaTwitter />
//             </SocialButton>
//             <SocialButton label={'YouTube'} href={'#'}>
//               <FaYoutube />
//             </SocialButton>
//             <SocialButton label={'Instagram'} href={'#'}>
//               <FaInstagram />
//             </SocialButton>
//           </Stack> */}
//       </Container>

//       {/* </Box> */}
//     </>
//   )
// }





// // <Box
// // borderTopWidth={1}
// // display={'flex'}
// // alignItems={'flex-end'}
// // borderStyle={'solid'}
// // borderColor={useColorModeValue('gray.200', 'gray.700')}
// // >
// // <Container
// //   bg={'#F3F4F5'}
// //   as={Stack}
// //   maxW={'8xl'}
// //   color={'black'}
// //   py={4}
// //   direction={{ base: 'column', md: 'row' }}
// //   spacing={4}
// //   justify={{ base: 'center', md: 'space-between' }}
// //   align={{ base: 'center', md: 'center' }}>
// //   <Text variant={"p1"}>© {new Date().getFullYear()} OHIF  All rights reserved</Text>
// //   <Stack direction={'row'} spacing={6}>
// //     <SocialButton label={'Twitter'} href={'#'}>
// //       <FaTwitter />
// //     </SocialButton>
// //     <SocialButton label={'YouTube'} href={'#'}>
// //       <FaYoutube />
// //     </SocialButton>
// //     <SocialButton label={'Instagram'} href={'#'}>
// //       <FaInstagram />
// //     </SocialButton>
// //   </Stack>
// // </Container>
// // </Box>








"use client";

import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import Logo from "../Logo/Logo"; // Assuming this is your custom logo component

const footerLinks = [
  { name: "Home", path: "#" },
  { name: "About", path: "#" },
  { name: "Blog", path: "#" },
  { name: "Contact", path: "#" },
];

const socialIcons = [
  { icon: <FaFacebookF />, href: "#" },
  { icon: <FaLinkedinIn />, href: "#" },
  { icon: <FaTwitter />, href: "#" },
  { icon: <FaInstagram />, href: "#" },
];

export default function Footer() {
  return (
    <>
      <Box bg={"purple.100"} py={6} color={"white"}>
        <Container as={Stack} maxW={"6xl"} py={3} spacing={4}>
          <Flex
            align={"center"}
            justify={{ base: "center", md: "space-between" }}
            direction={{ base: "column", md: "row" }}
            gap={{ base: "20px", md: "0px" }}
          >
            {/* Logo Section */}
            <Box>
              <Box
                bg={"white"}
                w={"100px"}
                h={"95px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                rounded={20}
                paddingLeft={2}
              >
                <Logo hasWidth={true} />
              </Box>
            </Box>

            {/* Links Section */}
            <Stack direction={"row"} spacing={6} fontWeight={"semibold"} fontSize={"15px"}>
              {footerLinks.map((link, index) => (
                <Box key={index} as="a" href={link.path}>
                  {link.name}
                </Box>
              ))}
            </Stack>

            {/* Social Icons Section */}
            <Box>
              <Heading as="h3" size="sm" fontWeight={500} mb={2} color={"white"}>
                Follow Us
              </Heading>
              <Flex gap={"12px"}>
                {socialIcons.map((item, index) => (
                  <Box
                    as="a"
                    key={index}
                    href={item.href}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    w={"30px"}
                    h={"30px"}
                    bg={"white"}
                    borderRadius={"full"}
                    color={"purple.100"}
                    _hover={{ bg: "yellow.100", color: "purple.700" }}
                    transition={"0.3s"}
                  >
                    {item.icon}
                  </Box>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Bottom Section */}
      <Box bg={"#F3F4F5"} py={6} color={"black"}>
        <Container
          as={Stack}
          maxW={"8xl"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text fontWeight={"bold"}>
            © {new Date().getFullYear()} OHIF | All rights reserved
          </Text>
        </Container>
      </Box>
    </>
  );
}

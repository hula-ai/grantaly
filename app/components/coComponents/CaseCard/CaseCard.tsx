"use client";

import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  Button,
} from "@chakra-ui/react";
import moment from "moment";
import placeholder from "@/asset/next.svg";
import React from "react";
import { Case } from "@/types/type";
import { useRouter } from "next/navigation";
interface Props {
  data: Case;
}
const CaseCard: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  return (
    <Box
      maxW={"full"}
      w={"full"}
      margin={"10px"}
      bg={useColorModeValue("#F3F4F5", "#F3F4F5")}
      rounded={"lg"}
      p={5}
      overflow={"hidden"}
      display={"flex"}
      gap={"18px"}
    >
      <Image
        borderRadius={"10px"}
        width={"200px"}
        height={"220px"}
        alt=""
        src={
          data?.description?.imageUrl
            ? `${process.env.NEXT_PUBLIC_ORTHANC_URL}instances/${data?.description?.imageUrl}/preview`
            : placeholder.src
        }
      />
      <Box py={2}>
        <Stack>
          <Text
            color={'black'}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"14px"}
          // letterSpacing={1.1}
          >
            {`Published On `}
            <Box as="span"
              ml={2}
              color={'#000080'}
              fontWeight={400}
              fontSize={"12px"}>
              {moment(data?.createdAt).format("MMM Do YY")}
            </Box>

          </Text>

          <Heading
            color={useColorModeValue("gray.700", "gray.700")}
            fontSize={"2xl"}

          // fontFamily={"body"}
          >
            {data?.description?.PatientMainDicomTags?.PatientName ??
              "Patient Name"}
          </Heading>
          <Text mt={1} noOfLines={1}
            fontSize={'13px'}
            color={"black"} w="150px">
            {data?.description?.description}
          </Text>
        </Stack>

        <Stack mt={4} direction={"row"} spacing={4} align={"center"}>
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{data?.userId?.name}</Text>
            <Text color={"gray.700"}>{data?.userId?.designation}</Text>
          </Stack>
        </Stack>

        <Button
          rounded={"md"}
          w={'100px'}
          mt={3}
          color={"white"}
          _hover={{ bg: "purple.100" }}
          bg={'purple.100'}
          fontSize={'12px'}
          onClick={() => router.push(`/details/${data._id}`)}
        >
          View
        </Button>
      </Box>
    </Box>
  );
};
export default CaseCard;

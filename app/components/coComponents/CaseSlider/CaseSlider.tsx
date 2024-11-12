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
  Text,
} from "@chakra-ui/react";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import CaseCard from "@/component/CaseCard/CaseCard";
import { CaseCardLoading } from "@/component/LoadingSkeleton/LoadingSkeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Case } from "@/types/type";
const CaseSlider: React.FC = () => {
  const router = useRouter();
  const [cases, setCases] = useState<Case[] | null>(null);
  const APIEndPoint = "/api/case";
  const sliderRef = useRef(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleGetCase = async () => {
    try {
      const response = await axios.get(APIEndPoint);

      const data = response.data.data;
      if (data) {
        setCases(data);
      }
    } catch (error) {
      console.error("Error in Fetching Cases:", error);
    } finally {
    }
  };
  useEffect(() => {
    handleGetCase();
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  return (
    <Box bg={"white"}>
      <Container maxW={"7xl"} py={'16'}>
        <Box
          display={"flex"}
          p={0}
          alignItems={"center"}
          flexDir={"column"}
          justifyContent={"center"}
          gap={"10px"}
        >
          <Heading textAlign={"center"}
            size="xl"
            // fontSize={'16px'}
            pt={"0"}
            color={"purple.100"}
          >
            CASE STUDIES
          </Heading>
          <Text
            mt={'3'}
            textAlign={"center"}
            maxW={"650px"}
            color={"black"}
            fontWeight={'medium'}
            fontSize={'14px'}
          // variant={"p1"}
          // fontSize={'lg'}
          >
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in
          </Text>
        </Box>

        <Box my={"40px"} bg={''}>
          <Slider ref={sliderRef} {...settings}>
            {!cases ? (
              Array.from({ length: 3 }, (_, ind: number) => (
                <Box
                  px={"10px"}
                  key={ind}>
                  {" "}
                  <CaseCardLoading />
                </Box>
              ))
            ) : cases && cases?.length == 0 ? (
              <Box></Box>
            ) : (
              cases?.map((item: Case, ind: number) => {
                return (
                  <Box px={"10px"} key={ind}>
                    {" "}
                    <CaseCard data={item} />
                  </Box>
                );
              })
            )}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default CaseSlider;

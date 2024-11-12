"use client";
import { getCaseAnalytics, setAnalytics } from "@/app/redux/slices/case";
import { useDispatch, useSelector } from "@/app/redux/store";
import React, { useEffect } from "react";
import data from "@/db/chart.json";
import { Box, Heading, Text } from "@chakra-ui/react";
import DataLoader from "../DataLoader/DataLoader";
import BarChart from "../BarChart/BarChart";
import PieChart from "../PieChart/PieChart";

import {
  BarChartTypes,
  Learning_opportunities,
  PieChartTypes,
} from "@/types/type";
import LearningOpportunities from "../LearningOpportunities/LearningOpportunities";

const CaseAnalytics = ({ rightSidePanel }: { rightSidePanel: number }) => {
  const dispatch = useDispatch();
  const analyticsState = useSelector((state) => state.case.analytics);
  const LoadingState = useSelector((state) => state.case.analyticsLoading);


  return LoadingState ? (
    <Box>
      <Heading variant={"h2"} color={"white"}> Dashboard Loading....</Heading>
    </Box>
  ) : (
    <Box>
      <Heading py={"15px"} size={"lg"} color={"white"}>
        Analytics
      </Heading>
      <Box overflow={"auto"}>
        <Text color={'white'} mb={"10px"} fontSize={'13px'}>
          {analyticsState?.student_report}
        </Text>

        <Box
          border={"1px solid"}
          borderColor={"white"}
          bg={"white"}
          mt={6}
          textAlign={"center"}
        >
          <Text variant={"p1"} fontSize={'15px'} color={"black"}>
            Overall Metrics ( Accuracy and Efficiency)
          </Text>
        </Box>

        <Box
          display={"grid"}
          gap={"10px"}
          mt={3}
          gridTemplateColumns={
            rightSidePanel >= 58
              ? "33% 33% 33%"
              : rightSidePanel >= 40
                ? "48% 48%"
                : "100% "
          }
        >
          {analyticsState?.bar_graphs?.length === 0 &&
            analyticsState?.bar_graphs?.length === 0 ? (
            <Box minH={"200px"} bg={'#F3F4F5'} textAlign={"center"}>
              <Text mt={"30px"} color={'white'} variant={"p1"}>
                Metrics not found
              </Text>
            </Box>
          ) : (
            <Box
              gridColumn="1 / -1"
              display="grid"
              gap={"10px"}
              color={'black'}
              // rounded={'lg'}
              gridTemplateColumns={"inherit"}
            >
              {analyticsState?.pie_chart?.map(
                (item: PieChartTypes, index: number) => (
                  <PieChart key={index} data={item} />
                )
              )}
            </Box>
          )}

          <Box
            gridColumn="1 / -1"
            display="grid"
            gap={"10px"}
            gridTemplateColumns={"inherit"}
          >
            {analyticsState?.bar_graphs?.map(
              (item: BarChartTypes, index: number) => (
                <BarChart key={index} data={item} />
              )
            )}
          </Box>
        </Box>

        <Box my={4} textAlign={'center'} bg={'white'} color={'purple.100'} py={2} mb={"20px"}>
          {/* <Box bg={"#F3F4F5"}  py={2} width={"70%"} borderLeftRadius={"md"}></Box> */}
          <Box width={"100%"}>
            <Text variant={"p1"} fontWeight={'semibold'} textAlign={"center"} >
              {" "}
              Learning Opportunities
            </Text>{" "}
          </Box>
          {/* <Box bg={"white"} width={"70%"} borderRightRadius={"md"}></Box> */}
        </Box>
        <LearningOpportunities />
      </Box>
    </Box>
  );
};

export default CaseAnalytics;

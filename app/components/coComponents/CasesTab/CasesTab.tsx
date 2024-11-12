"use client";
import { Box, Tab, TabList, Button, Flex, Heading, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CaseStudies from "../CaseStudies/CaseStudies";
import AssigneeCases from "../CaseStudies/AssigneeCases";
import PublicCases from "../CaseStudies/PublicCases";
import { useSession } from "next-auth/react";
import { CaseObject, UserObject } from "@/types/type";
import { useDispatch, useSelector } from "@/app/redux/store";
import { getCaseCount } from "@/app/redux/slices/case";
import { useRouter } from "next/navigation";

const CasesTab = () => {
  const { data: token, status } = useSession();
  const [tabChange, setTabChange] = useState<number>(0);
  const casesState = useSelector((state) => state.case.casesCount);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddCase = () => {
    router.push("/cases/add");
  };

  useEffect(() => {
    dispatch(getCaseCount());
  }, []);

  return (
    <>
      <Heading size="lg" mt={'6'} textAlign={'center'} pt={"0"} color={"purple.100"}>
        CASE STUDIES
      </Heading>
      <Box
        padding={"12px"}
        minH={"calc(100vh - 69px)"}
        backgroundColor={"white"}
        mt={5}
      >
        <Tabs
          padding={"10px"}
          backgroundColor={"white"}
          borderRadius={"20px"}
          isManual
          // variant="enclosed"
          mt={2}
        >
          {/* <TabList
            // borderBottom={'2px solid #78206E'}
            borderColor={"#F3F4F5"}
          >
            <Tab
              onClick={() => {
                setTabChange(0);
              }}
              sx={{
                color: "black",
                py: 3,
                _selected: {
                  bg: '#78206E',
                  color: "white",
                  fontWeight: 'semibold',
                  borderBottom: '2px solid #78206E',
                },
              }}
            >
              My Cases {`(${casesState.myCases})`}
            </Tab>
            <Tab
              onClick={() => {
                setTabChange(1);
              }}
              sx={{
                color: "black",
                _selected: {
                  bg: '#78206E',
                  color: "white",
                  fontWeight: 'semibold',
                  borderBottom: '2px solid #78206E',


                },
              }}
            >
              Assigned Cases{`(${casesState.assignee})`}
            </Tab>
            <Tab
              onClick={() => {
                setTabChange(2);
              }}
              sx={{
                color: "black",
                _selected: {
                  bg: '#78206E',
                  color: "white",
                  fontWeight: 'semibold',
                  borderBottom: '2px solid #78206E',
                },
              }}
            >
              Public Cases {`(${casesState.public})`}
            </Tab>
          </TabList> */}

          <Flex justify="space-between" align="center" px={4} py={3} borderBottom={'1px solid black'}>
            <TabList gap={5}
              borderBottom="none"
            >
              <Tab
                onClick={() => setTabChange(0)}
                sx={{
                  color: "black",
                  fontSize: '16px',
                  fontWeight: 'medium',
                  py: 2,
                  _selected: {
                    bg: '#78206E',
                    color: "white",
                    fontWeight: 'semibold',
                    fontSize: '14px',
                    // borderBottom: '2px solid #78206E',
                  },
                }}
              >
                My Cases {`(${casesState.myCases})`}
              </Tab>
              <Tab
                onClick={() => setTabChange(1)}
                sx={{
                  color: "black",
                  fontSize: '16px',
                  fontWeight: 'medium',
                  _selected: {
                    bg: '#78206E',
                    color: "white",
                    fontWeight: 'semibold',
                    fontSize: '14px',
                    // borderBottom: '2px solid #78206E',
                  },
                }}
              >
                Assigned Cases {`(${casesState.assignee})`}
              </Tab>
              <Tab
                onClick={() => setTabChange(2)}
                sx={{
                  color: "black",
                  fontSize: '16px',
                  fontWeight: 'medium',
                  _selected: {
                    bg: '#78206E',
                    color: "white",
                    fontWeight: 'semibold',
                    fontSize: '14px',
                    // borderBottom: '2px solid #78206E',
                  },
                }}
              >
                Public Cases {`(${casesState.public})`}
              </Tab>
            </TabList>

            <Button
              bg="#78206E"
              color="white"
              _hover={{ bg: "#631657" }}
              onClick={handleAddCase}
            >
              Add Case
            </Button>
          </Flex>

          <TabPanels mt={10} >
            <TabPanel padding={0}>
              <CaseStudies />
            </TabPanel>

            <TabPanel padding={0}>
              {tabChange === 1 && (
                <AssigneeCases
                  tabChange={tabChange}
                  setTabChange={setTabChange}
                />
              )}
            </TabPanel>
            <TabPanel padding={0}>
              {tabChange === 2 && (
                <PublicCases
                  tabChange={tabChange}
                  setTabChange={setTabChange}
                />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default CasesTab;

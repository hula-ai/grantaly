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
  Tooltip,
  Icon,
} from "@chakra-ui/react";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { endPoints } from "@/utils/endpoint";
import DataTable from "../DataTable/DataTable";
import ActionsCell from "../ActionCell/ActionCell";
import moment from "moment";
import { useDispatch } from "@/app/redux/store";
import { setMyCase } from "@/app/redux/slices/case";
import { CaseObject } from "@/types/type";

const CaseStudies: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState<string>("");

  // const handleAddCase = () => {
  //   router.push("/cases/add");
  // };
  const columns = [
    { Header: "ID", accessor: "_id" },
    { Header: "Patient Name / MRN", accessor: "studyId" },
    {
      Header: "Description",
      accessor: "description?.PatientMainDicomTags.PatientName",
      Cell: ({ row }: any) => {
        return row.original.description?.PatientMainDicomTags.PatientName;
      },
    },

    { Header: "Privacy", accessor: "privacy" },
    {
      Header: "Upload Date",
      Cell: ({ row }: any) =>
        moment(row.original.createdAt).format("MMMM DD YYYY"),
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <ActionsCell
          setDeleteId={setDeleteId}
          viewLink={`/details/${row.original._id}`}
          editLink={`/cases/edit/${row.original._id}`}
          deleteId={row.original._id}
          deleteEndPoint={`/case`}
        />
      ),
    },
  ];

  const handleSetCases = (data: CaseObject[]) => {
    dispatch(setMyCase(data));
  };

  return (
    <Box mt={10}   >
      <Container maxW={"8xl"}  >
        {/* <Box
          display={"flex"}
          p={0}
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={"3rem"}
        >
          <Heading size="lg" pt={"0"} color={"white"}>
            My Cases
          </Heading>
        </Box> */}

        <DataTable
          handleState={handleSetCases}
          columns={columns}
          APIEndPoint={endPoints.user_case}
          filterId={deleteId}
        />
      </Container>
    </Box>
  );
};

export default CaseStudies;

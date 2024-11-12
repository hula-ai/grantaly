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
} from "@chakra-ui/react";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DataTable from "../DataTable/DataTable";
import { CaseObject } from "@/types/type";
import ActionsCell from "../ActionCell/ActionCell";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setAssigneeCase, setPublicCase } from "@/app/redux/slices/case";
import { endPoints } from "@/utils/endpoint";

interface Props {
  tabChange: number;
  setTabChange?: (e: number) => void;
}

const PublicCases = ({ tabChange }: Props) => {
  const dispatch = useDispatch();

  let APIEndPoint = `user/case`;

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
          disableEdit={true}
          disableDelete={true}
          viewLink={`/details/${row.original._id}`}
          editLink={`/cases/edit/${row.original._id}`}
          deleteEndPoint={`/case`}
        />
      ),
    },
  ];
  const handleSetCases = (data: CaseObject[]) => {
    dispatch(setPublicCase(data));
  };
  return (

    <Box >
      <Container maxW={"11xl"}>
        <Box
          display={"flex"}
          p={0}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {/* <Heading mt={4} size="lg" pt={"0"} color={"white"}>
            Public Cases
          </Heading> */}
        </Box>
        <DataTable
          handleState={handleSetCases}
          columns={columns}
          APIEndPoint={endPoints.public_case}
        // filterId={deleteId}
        />
      </Container>
    </Box>
  );
};

export default PublicCases;

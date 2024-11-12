"use client";
import { Box, Container, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import DataTable from "../DataTable/DataTable";
import ActionsCell from "../ActionCell/ActionCell";

import { useParams } from "next/navigation";
import moment from "moment";

const UsersCaseTable = () => {
  const param = useParams();
  const userId = param.id as string;

  const [deleteId, setDeleteId] = useState<string>("");
  const columns = [
    { Header: "ID", accessor: "_id" },
    { Header: "Patient Name / MRN", accessor: "studyId" },
    { Header: "Description", accessor: "description?.PatientMainDicomTags" },
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
          deleteId={row.original._id}
          setDeleteId={setDeleteId}
          viewLink={`/details/${row.original._id}`}
          editLink={`/admin/cases/edit/${row.original._id}`}
          deleteEndPoint={`/case`}
        />
      ),
    },
  ];

  return (
    <Box bg={"black"}>
      <Container maxW={"7xl"}>
        <Box
          display={"flex"}
          p={0}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Heading mt={4} size="lg" pt={"0"} color={"white"}>
            {`Users's Cases`}
          </Heading>
        </Box>
        <DataTable
          columns={columns}
          APIEndPoint={`user/${userId}/cases`}
          filterId={deleteId}
        />
      </Container>
    </Box>
  );
};

export default UsersCaseTable;

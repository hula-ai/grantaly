"use client";
import { Box, Container, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import DataTable from "../DataTable/DataTable";
import ActionsCell from "../ActionCell/ActionCell";
import { endPoints } from "@/utils/endpoint";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import Dropdown from "../DropDown/DropDown";
import { roles } from "@/schemas/state";

const UsersTable = () => {

  const [deleteId, setDeleteId] = useState<string>("");

  const columns = [
    { Header: "ID", accessor: "_id" },
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    {
      Header: "Cases",
      Cell: ({ row }: any) => row.original.cases.length,
    },
    {
      Header: "Role",
      Cell: ({ row }: any) => (
        <Dropdown
          userId={row.original._id}
          alreadySelectedRole={row.original.role}
          roles={roles}
        />
      ),
    },
    {
      Header: "Status",
      Cell: ({ row }: any) => (
        <ToggleSwitch status={row.original.status} userId={row.original._id} />
      ),
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <ActionsCell
          setDeleteId={setDeleteId}
          viewLink={`/admin/user/${row.original._id}`}
          editLink={`/admin/user/edit/${row.original._id}`}
          deleteEndPoint={`${endPoints.delete_admin_users}`}
          deleteId={row.original._id}
        />
      ),
    },
  ];

  return (
    <Box >
      <Container maxW={"7xl"}>
        <Box
          display={"flex"}
          p={0}
          mb={10}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Heading textAlign={'center'} fontWeight={'semibold'} mt={5} size="lg" pt={"0"} color={"purple.100"}>
            Users
          </Heading>
        </Box>
        <DataTable
          columns={columns}
          APIEndPoint={endPoints.admin_users}
          filterId={deleteId}
        />
      </Container>
    </Box>
  );
};

export default UsersTable;

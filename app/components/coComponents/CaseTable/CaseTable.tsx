"use client";
import {
  Box,
  Container,
  Heading,
  useToast,
  Select,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserObject } from "@/types/type";
import DataTable from "../DataTable/DataTable";
import { formatDate } from "@/helper/formateDate";
import ActionsCell from "../ActionCell/ActionCell";

interface CaseTableProps {
  isAdmin?: boolean;
}
const CaseTable: React.FC<CaseTableProps> = ({ isAdmin }) => {
  const Privacy = ["Public", "Private"];
  const [APIEndPoint, SetAPIEndPoint] = useState(`admin/cases`);
  const [deleteId, setDeleteId] = useState("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedPrivacy, setSelectedPrivacy] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const toast = useToast();

  const columns = [
    { Header: "ID", accessor: "_id" },
    { Header: "Patient Name / MRN", accessor: "studyId" },
    {
      Header: "Description",
      Cell: ({ row }: any) => (
        <>
          {row.original?.description?.PatientMainDicomTags?.PatientName ??
            "N/A"}
          <br />
          {row.original?.description?.MainDicomTags?.StudyDescription ?? ""}
        </>
      ),
    },
    ...(isAdmin
      ? [
        {
          Header: "Privacy",
          Cell: ({ row }: any) => {
            const privacy = row.original?.privacy;
            const capitalizedPrivacy = privacy
              ? privacy.charAt(0).toUpperCase() +
              privacy.slice(1).toLowerCase()
              : "";
            return capitalizedPrivacy;
          },
        },
      ]
      : []),
    {
      Header: "Upload Date",
      Cell: ({ row }: any) => formatDate(row.original.createdAt),
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <ActionsCell
          viewLink={`/details/${row.original._id}`}
          editLink={
            isAdmin
              ? `/admin/cases/edit/${row.original._id}`
              : `/cases/edit/${row.original._id}`
          }
          deleteEndPoint={`/case`}
          setDeleteId={setDeleteId}
          deleteId={row.original._id}
        />
      ),
    },
  ];
  console.log("selectedUser", selectedUser, selectedPrivacy, refresh);
  const handleApply = () => {
    setIsApplied(true);
    setRefresh((prev) => !prev);
    const NEWAPI = `admin/cases/?userId=${selectedUser}&privacy=${selectedPrivacy}`;
    SetAPIEndPoint(NEWAPI);
  };
  const handleReset = () => {
    setRefresh((prev) => !prev);
    const NEWAPI = `admin/cases/`;
    setIsApplied(false);

    SetAPIEndPoint(NEWAPI);
    setSelectedPrivacy("");
    setSelectedUser("");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/user"); // Adjust the endpoint to your API
        const users = response.data.data;

        const FilteredUsers = users.filter(
          (user: UserObject) => user?.cases && user?.cases?.length > 0
        );
        setUsers(FilteredUsers);
      } catch (error) {
        toast({
          title: "Error fetching users.",
          description: "There was an error fetching the user data.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Box>
        <Container maxW={"7xl"}>
          <Box
            display={"flex"}
            pt={5}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Heading size="lg" py={2} color={"white"}>
              Case Studies
            </Heading>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
            >
              <Heading size="lg" py={2} color={"white"}>
                Filters
              </Heading>
              <Box bgColor={"white"} borderRadius={"8px"} width={"400px"}>
                <Select
                  placeholder="Select User"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  {users.map((user: UserObject, ind: number) => (
                    <option key={ind} value={user._id?.toString()}>
                      {user.name}
                    </option>
                  ))}
                </Select>
              </Box>

              <Box bgColor={"white"} borderRadius={"8px"} width={"300px"}>
                <Select
                  placeholder="Select Privacy"
                  onChange={(e) => setSelectedPrivacy(e.target.value)}
                  value={selectedPrivacy}
                >
                  {Privacy.map((privacy) => (
                    <option key={privacy} value={privacy}>
                      {privacy}
                    </option>
                  ))}
                </Select>
              </Box>
              {selectedUser || selectedPrivacy ? (
                <Button bg={'purple.100'} color={'white'} onClick={handleApply}>Apply</Button>
              ) : null}
              {isApplied ? <Button bg={'purple.100'} color={'white'} onClick={handleReset}>Reset</Button> : null}
            </Box>
          </Box>
          <DataTable
            columns={columns}
            APIEndPoint={APIEndPoint}
            refresh={refresh}
            filterId={deleteId}
          />
        </Container>
      </Box>
    </>
  );
};

export default CaseTable;

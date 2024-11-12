"use client";
import {
  Box,
  Container,
  useToast,
  Tooltip,
  Button,
  Icon,
  useDisclosure,
  Text
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../DataTable/DataTable";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import WarningModal from "../WarningModal/WarningModal";
import { endPoints } from "@/utils/endpoint";
import { handleClientValidate } from "@/helper/validation";
import { rejectPayload } from "@/schemas/validator";

interface RequestTableProps {
  isAdmin?: boolean;
}

const RequestTable: React.FC<RequestTableProps> = () => {
  const [refresh, setRefresh] = useState("");
  const [reason, setReason] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [approveUserId, setApproveUserId] = useState<string | boolean>(false);
  const [loading, setLoading] = useState(false);

  const columns = [
    { Header: "User", accessor: "name" },
    { Header: "Profession", accessor: "profession" },
    { Header: "Description", accessor: "description" },
    { Header: "Teaching Experience", accessor: "teachingExperience" },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Tooltip label="Approve">
            <Button
              onClick={() => {
                setApproveUserId(row.original._id); // Set the selected user ID
              }}
              colorScheme="green"
              variant="outline"
              size={"xs"}
            >
              <Icon as={CheckIcon} />
            </Button>
          </Tooltip>
          <Tooltip label="Reject">
            <Button
              onClick={() => {
                setSelectedUserId(row.original._id);
                onOpen();
              }}
              colorScheme="red"
              variant="outline"
              size={"xs"}
            >
              <Icon as={CloseIcon} />
            </Button>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const handleApprove = async () => {
    try {
      setLoading(true);
      await axios.put(`/api/user/${approveUserId}/approve-request`);
      toast({
        title: "Request Approved.",
        description: "The request has been approved successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setRefresh(approveUserId as string);
      setApproveUserId(false);
    } catch (error: any) {
      toast({
        title: error?.response?.data?.message || "Error.",
        description: error?.message || "There was an error rejecting the request.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (reason?: string) => {
    if (!selectedUserId) return;
    const validate = handleClientValidate(
      rejectPayload,
      { rejectReason: reason },
      toast
    );
    if (!validate) return;
    try {
      setLoading(true);
      await axios.put(`/api/user/${selectedUserId}/reject-request`, {
        rejectReason: reason,
      });
      toast({
        title: "Request Rejected.",
        description: "The request has been rejected successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setRefresh(selectedUserId);
      setSelectedUserId(null);
      setReason('');
      onClose();
    } catch (error: any) {
      toast({
        title: error?.response?.data?.message || "Error.",
        description: error?.message || "There was an error rejecting the request.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box mt={8} >
        <Text mx={15} fontSize={'25px'} fontWeight={'semibold'} color={'purple.100'}>
          Request
        </Text>
        <Container maxW={"6xl"} mt={4}>
          <DataTable
            columns={columns}
            APIEndPoint={endPoints.requested_user}
            filterId={refresh}
          />
        </Container>
      </Box>
      <WarningModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setReason('');
        }}
        onConfirm={handleReject}
        loading={loading}
        reason={reason}
        setReason={setReason}
        showReasonInput
        description="Please provide a reason for rejecting this request."
      />
      <WarningModal
        isOpen={approveUserId ? true : false}
        onClose={() => setApproveUserId(false)}
        onConfirm={handleApprove}
        loading={loading}
        title={"Approve Request"}
        description="Are you sure you want to approve this request?"
      />
    </>
  );
};

export default RequestTable;

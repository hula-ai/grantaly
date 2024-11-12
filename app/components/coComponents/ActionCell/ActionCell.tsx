import React, { useState } from "react";
// import {
//   AlertDialog,
//   AlertDialogBody,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogOverlay,
//   Box,
//   Button,
//   Icon,
//   Td,
//   useDisclosure,
//   useToast,
// } from "@chakra-ui/react";
import { ViewIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Delete } from "@/fetch/fetch";
import { handleOpenToast } from "@/helper/toast";
import WarningModal from "../WarningModal/WarningModal";

interface Props {
  viewLink: string;
  editLink: string;
  deleteId?: string;
  deleteEndPoint?: string;
  disableEdit?: boolean;
  disableDelete?: boolean;
  setDeleteId?: (e: string) => void;
}
const ActionsCell = ({
  viewLink,
  editLink,
  disableEdit,
  disableDelete,
  setDeleteId,
  deleteId,
  deleteEndPoint,
}: Props) => {
  const router = useRouter();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const onDelete = async () => {
    try {
      setLoading(true);
      const deleteData = await Delete(`${deleteEndPoint}/${deleteId}`);
      handleOpenToast(
        deleteData?.success ? "Successfully deleted" : deleteData?.message,
        deleteData?.success ? "success" : "error",
        toast
      );
      setLoading(false);

      if (deleteData?.success) {
        if (setDeleteId && deleteId) {
          setDeleteId(deleteId);
        }
        onClose();
      }
    } catch (error) {
      setLoading(false);
      handleOpenToast("Something went wrong", "error", toast);
      console.error("Error deleting item:", error);
    }
  };

  const handleDelete = () => {
    if (currentItemId && onDelete) {
      onDelete();
    }
  };

  // return (
  //   <>
  //     <WarningModal
  //       isOpen={isOpen}
  //       onClose={onClose}
  //       loading={loading}
  //       title="Delete"
  //       onConfirm={handleDelete}
  //     />

  //     <Box
  //       style={{ marginLeft: "-20px" }}
  //       border={"1px solid transparent"}
  //       display={"flex"}
  //       alignItems={"center"}
  //       justifyContent={"center"}
  //       gap={1}
  //     >
  //       <Icon
  //         as={ViewIcon}
  //         onClick={() => router.push(viewLink)}
  //         cursor="pointer"
  //       />
  //       {disableEdit ? null : (
  //         <Icon
  //           as={EditIcon}
  //           onClick={() => router.push(editLink)}
  //           cursor="pointer"
  //         />
  //       )}
  //       {disableDelete ? null : (
  //         <Icon
  //           as={DeleteIcon}
  //           onClick={() => {
  //             if (deleteId) {
  //               setCurrentItemId(deleteId);
  //             }
  //             onOpen();
  //           }}
  //           cursor="pointer"
  //         />
  //       )}
  //     </Box>
  //   </>
  // );


  return null;
};

export default ActionsCell;

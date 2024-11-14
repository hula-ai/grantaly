import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Delete } from "@/fetch/fetch";
import { handleOpenToast } from "@/helper/toast";
import WarningModal from "../WarningModal/WarningModal";
import toast from "react-hot-toast";

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
  const [isOpen, setIsOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      const deleteData = await Delete(`${deleteEndPoint}/${deleteId}`);
      toast.success("Successfully deleted");
      setLoading(false);

      if (deleteData?.success) {
        if (setDeleteId && deleteId) {
          setDeleteId(deleteId);
        }
        setIsOpen(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
      console.error("Error deleting item:", error);
    }
  };

  const handleDelete = () => {
    if (currentItemId && onDelete) {
      onDelete();
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <WarningModal
        isOpen={isOpen}
        onClose={closeModal}
        loading={loading}
        title="Delete"
        onConfirm={handleDelete}
      />

      <div className="flex items-center justify-center gap-2 ml-[-20px] border border-transparent">
        {!disableEdit && (
          <button onClick={() => router.push(editLink)} className="p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M16.5 3.5l4 4-9 9h-4v-4l9-9zM3 18v3h3l12-12-3-3-12 12z"
              />
            </svg>
          </button>
        )}

        {!disableDelete && (
          <button
            onClick={() => {
              if (deleteId) {
                setCurrentItemId(deleteId);
              }
              openModal();
            }}
            className="p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-red-500"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6 7h12v12H6zM3 6h18V4H3zM9 3h6v2H9z"
              />
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

export default ActionsCell;

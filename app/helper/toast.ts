import { uniqueSuffix } from "@/utils/constant";

export const handleOpenToast = (title: string, status: string, toast: any) => {
  const toastId = uniqueSuffix; // Set a unique ID for the toast

  toast({
    id: toastId, // Assign the unique ID to the toast
    position: "bottom-right",
    title: title,
    status: status,
    variant: "subtle",
    isClosable: true,
  });
  // if (!toast.isActive(toastId)) {
  // }

};

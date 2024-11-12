// utils/toastHelper.ts
import { useToast } from "@chakra-ui/react";
import { ReactNode } from "react";

type ToastStatus = "info" | "success" | "warning" | "error";

export const useToastFunction = () => {
  const toast = useToast();

  const showToast = (
    title: string,
    description: ReactNode = "",
    status: ToastStatus = "success",
    duration: number = 2000
  ) => {
    toast({
      title,
      description,
      status,
      duration,
      isClosable: true,
      variant: "subtle",
      position: "bottom-right",
    });
  };

  return showToast;
};

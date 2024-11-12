import { get } from "@/fetch/fetch";
import { endPoints } from "@/utils/endpoint";
import { Status } from "@/types/enum";
import { signOut } from "next-auth/react";
import { handleOpenToast } from "@/helper/toast";
import { useToast } from "@chakra-ui/react";

export const handleGetUserInfo = async () => {
  const userInfo = await get(`${endPoints.user}/${endPoints.info}`);
  return userInfo;
};

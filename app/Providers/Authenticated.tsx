"use client";

import NotFound from "@/component/NotFound/NotFound";
import { handleOpenToast } from "@/helper/toast";
import { Status } from "@/types/enum";
import { useToast } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { handleGetUserInfo } from "@/utils/userInfo";
import { useRouter } from "next/navigation";

export function Authenticated({ children }: { children: React.ReactNode }) {
  const toast = useToast();
  const router = useRouter()
  const { data: session, status } = useSession();

  const [notFound, setNotFound] = useState(false);

  const checkUserInfo = async () => {
    const userInfo = await handleGetUserInfo();

    if (!userInfo.data) {
      // setNotFound(true);
      await signOut({
        callbackUrl: "/login",
        redirect: true,
      });
      return;
    }
    if (userInfo.data.status === Status.INACTIVE) {
      await signOut({
        callbackUrl: "/login",
        redirect: true,
      });
      window.location.href = "/login";
      handleOpenToast("User has been disabled", "error", toast);
    }
  };

  useEffect(() => {
    if (session) {
      checkUserInfo();
    }
  }, [session]);

  if (notFound) {
    return <NotFound showButton btnLabel="Login" btnEvent={()=>router.push("/login")} title="user not found" />;
  }

  return <>{children}</>;
}

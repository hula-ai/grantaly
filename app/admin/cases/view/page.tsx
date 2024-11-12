import Header from "@/component/Header/Header";
import { getUserById } from "@/actions/getUserById";
import { Role } from "@/models/user";

import RedirectComponent from "@/component/RedirectComponent/RedirectComponent";

import { getSession } from "next-auth/react";
import { getCurrentUser } from "@/actions/getCurrentUser";
import CaseTable from "@/component/CaseTable/CaseTable";

export const dynamic = "force-dynamic";

const Page = async () => {
  
  const User = await getCurrentUser();
  
  if (!User || User.role == Role.USER) {
    return <RedirectComponent />;
  }

  return (
    <>
      <CaseTable isAdmin/>
    </>
  );
};

export default Page;

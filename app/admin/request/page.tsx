import Header from "@/component/Header/Header";
import { getUserById } from "@/actions/getUserById";
import { Role } from "@/models/User";

import RedirectComponent from "@/component/RedirectComponent/RedirectComponent";

import { getSession } from "next-auth/react";
import getCurrentUser from "@/actions/getCurrentUser";
import RequestTable from "@/component/RequestTable/RequestTable"; 

export const dynamic = "force-dynamic";

const Page = async () => {
  
  const User = await getCurrentUser();
  
  if (!User || User.role == Role.USER) {
    return <RedirectComponent />;
  }

  return (
    <>
      <RequestTable isAdmin/> 
    </>
  );
};

export default Page;

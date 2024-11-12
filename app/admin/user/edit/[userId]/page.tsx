import { GetServerSideProps } from "next";
import Header from "@/components/coComponents/Header/Header";
import { getCaseById } from "@/actions/getCaseById";
import { CaseObject } from "@/types/type";
import NoData from "@/components/coComponents/NoData/NoData";
import { getUserById } from "@/actions/getUserById";
import EditUser from "./EditUser";
import { Role } from "@/types/enum";
import RedirectComponent from "@/components/coComponents/RedirectComponent/RedirectComponent";
import getCurrentUser from "@/actions/getCurrentUser";
export const dynamic = "force-dynamic";

interface IParams {
  userId?: string;
}

const Page = async ({ params }: { params: IParams }) => {

  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role == Role.USER) {
    return <RedirectComponent />;
  }

  // const User = await getUserById(params);

  // if (!User) {
  //   return <NoData />;
  // }


  return (
    <>
      <EditUser User={currentUser} />
    </>
  );
};

export default Page;

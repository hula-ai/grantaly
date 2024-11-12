import { getCaseById } from "@/actions/getCaseById";
import EditCaseForm from "@/component/EditCaseForm/EditCaseForm";
import NoData from "@/component/NoData/NoData";
import React from "react";

interface IParams {
  caseId?: string;
}

const page = async ({ params }: { params: IParams }) => {


  return (
    <>
      <EditCaseForm isAdmin />
    </>
  );
};

export default page;

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "@/components/DataTable/DataTable";
import { formatDate } from "@/helper/formateDate";
import ActionsCell from "@/components/ActionCell/ActionCell";
import toast from "react-hot-toast";
import { user } from "@/interface/interface";
import { LIMIT_COUNT } from "@/utils/constant";
import PreviewModal from "@/components/PreviewModal/PreviewModal";

interface PortfolioTableProps {
  _id: string;
  projectTitle: string;
  abstract: string;
  fundingAgency: string;
  startDate: string;
  endDate: string;
  expectedTimeline: string;
  isCompeleted: boolean;
  formStep: number;
  isBooked: boolean;
  userId: string;
  clientDocs: any[];
  adminDocs: any[];
  dataUploadContent: any[];
  resultContent: any[];
  __v: number;
}


const PortfolioTable: React.FC<PortfolioTableProps> = () => {
  
  const [APIEndPoint, setAPIEndPoint] = useState("/api/portfolio");
  const [deleteId, setDeleteId] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedPrivacy, setSelectedPrivacy] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<user[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean[]>(Array(LIMIT_COUNT).fill(false));
  const toggleModal = (idx: number) => {
    setIsModalOpen((prev) => {
      const newModalState = [...prev]; // Copy the previous state
      newModalState[idx] = !newModalState[idx]; // Toggle the modal state at the specific index
      return newModalState;
    });
  };

  const columns = [
    
    // { Header: "ID", accessor: "_id" },
    { Header: "Project Title", accessor: "projectTitle" },
    
    {
      Header: "Project Tag Line", 
      Cell: ({ row }: any) => row.original.projectTagLine ? row.original.projectTagLine : 'No Tag Line'  ,
    },
    {
      Header: "Created At",
      Cell: ({ row }: any) => formatDate(row.original.createdAt),
    },
    {
      Header: "Updated At",
      Cell: ({ row }: any) => formatDate(row.original.updatedAt),
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <ActionsCell
          viewLink={`/project/${row.original._id}`}
          editLink={
            `/portfolio/edit/${row.original._id}`
          }
          deleteEndPoint={`/portfolio`}
          setDeleteId={setDeleteId}
          deleteId={row.original._id}
        /> 
      ),
    },
  ];


  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex pt-5 items-center justify-between">
          <h2 className="text-lg font-bold py-2 text-black">Portfolios</h2>
        </div>
        <DataTable
          columns={columns}
          APIEndPoint={APIEndPoint}
          refresh={refresh}
          filterId={deleteId}
        />
      </div>
    </div>
  );
  
};

export default PortfolioTable;

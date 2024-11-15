"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "@/components/DataTable/DataTable";
import { formatDate } from "@/helper/formateDate";
import ActionsCell from "@/components/ActionCell/ActionCell";
import toast from "react-hot-toast";
import { user } from "@/interface/interface";

interface Project {
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

interface CaseTableProps {
  isAdmin?: boolean;
}

const CaseTable: React.FC<CaseTableProps> = ({ isAdmin }) => {
  
  const [APIEndPoint, setAPIEndPoint] = useState("/api/project");
  const [deleteId, setDeleteId] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedPrivacy, setSelectedPrivacy] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<user[]>([]);

  const columns = [
    
    { Header: "ID", accessor: "_id" },
    { Header: "Project Title", accessor: "projectTitle" },
    
    {
      Header: "Start Date",
      Cell: ({ row }: any) => formatDate(row.original.startDate),
    },
    {
      Header: "End Date",
      Cell: ({ row }: any) => formatDate(row.original.startDate),
    },
    {
      Header: "Estimated Timeline",
      Cell: ({ row }: any) => row.original.expectedTimeline,
    },
    {
      Header: "Status",
      Cell: ({ row }: any) => {
        const step = row.original.formStep
        if(step === 2 && row.original.adminDocs)
          return (<span>Please Upload Contract</span>)
        if(step === 4 && row.original.adminDocs)
          return (<span>Please upload results</span>)
        if(step < 5)
          return (<span>Pending</span>)
        if(step === 5 && row.original.isCompeleted)
          return 'Completed'
      }
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <ActionsCell
          viewLink={`/admin/${row.original._id}`}
          editLink={
            isAdmin
              ? `/project-initialization/edit/${row.original._id}`
              : `/project-initialization/edit/${row.original._id}`
          }
          deleteEndPoint={`/case`}
          setDeleteId={setDeleteId}
          deleteId={row.original._id}
        />
      ),
    },
  ];

  const handleApply = () => {
    setIsApplied(true);
    setRefresh((prev) => !prev);
    setAPIEndPoint(`/api/user/${selectedUser}`);
  };

  const handleReset = () => {
    setRefresh((prev) => !prev);
    setIsApplied(false);
    setAPIEndPoint(`/api/project`);
    setSelectedPrivacy("");
    setSelectedUser("");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/user");
        const fetchUsers = response.data
        setUsers(fetchUsers ?? []);
      } catch (error) {
        toast.error('Error in fetching users')
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex pt-5 items-center justify-between">
          <h2 className="text-lg font-bold py-2 text-black">Projects</h2>
          <div className="flex items-center gap-2">
            {/* <div className="bg-white rounded-lg w-96">
              <select
                className="w-full p-2 border rounded"
                placeholder="Select User"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                {users.map((user)=> (
                  <option key={user._id} value={user._id}>
                    {user.firstName + " " + user.lastName}
                  </option>
                ))}
              </select>
            </div>
            {(selectedUser || selectedPrivacy) && (
              <button
                className="px-4 py-2 text-black bg-purple-500 rounded"
                onClick={handleApply}
              >
                Apply
              </button>
            )}
            {isApplied && (
              <button
                className="px-4 py-2 text-black bg-purple-500 rounded"
                onClick={handleReset}
              >
                Reset
              </button>
            )} */}
          </div>
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

export default CaseTable;

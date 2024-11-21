"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "@/components/DataTable/DataTable";
import { formatDate, formatTime } from "@/helper/formateDate";
import ActionsCell from "@/components/ActionCell/ActionCell";
import toast from "react-hot-toast";
import { user } from "@/interface/interface";
import { LIMIT_COUNT } from "@/utils/constant";
import PreviewModal from "@/components/PreviewModal/PreviewModal";

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

interface ProjectTableProps {
  isAdmin?: boolean;
}

const ScheduledMeetings: React.FC<ProjectTableProps> = () => {
  
  const [APIEndPoint, setAPIEndPoint] = useState("/api/scheduled");
  const [deleteId, setDeleteId] = useState("");

  const [refresh, setRefresh] = useState(false);

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
    { Header: "Project Title", 
      Cell: ({ row }: any) => row.original.description.projectTitle
    },
    
    {
      Header: "Date",
      Cell: ({ row }: any) => formatDate(row.original.startDate),
    },
    {
      Header: "Time",
      Cell: ({ row }: any) => formatTime(row.original.startDate),
    },
    {
      Header: "Link",
      Cell: ({ row }: any) => {
        // Truncate the link to 50 characters for display
        const shortenedLink = row.original.link.length > 50
          ? row.original.link.substring(0, 20) + '...' // Truncate and add ellipsis
          : row.original.link;
    
        return (
          <a href={row.original.link} target="_blank" rel="noopener noreferrer">
            {shortenedLink} {/* Display the shortened version */}
          </a>
        );
      }
    },
    {
      Header: "Status",
      Cell: ({ row }: any) => (
          // Compare event start time with the current time
          new Date(row.original.startDate) > new Date() ? 'Upcoming' : 'Passed'
      ),
    },  
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        !row.original.isCompeleted ? 
        <ActionsCell
          deleteEndPoint={`/scheduled`}
          setDeleteId={setDeleteId}
          deleteId={row.original._id}
        /> : null
      ),
    },
  ];

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex pt-5 items-center justify-between">
          <h2 className="text-lg font-bold py-2 text-black">Scheduled Meetings</h2>
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

export default ScheduledMeetings;

import React from "react";
import { FaProjectDiagram, FaHourglassHalf, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

interface obj {
    totalProjects : number;
    pendingProjects : number;
    completedProjects : number;
    requiresAttention : number;
}


interface Props {
  AdminStats: obj; // Sample type for the admin stats
}
const AdminDashboard = ({AdminStats}:Props) => {
  // Sample data for the stats
  const stats = [
    { label: "Total Projects", value: AdminStats.totalProjects ?? 120, icon: <FaProjectDiagram />,color :"" },
    { label: "Pending Projects", value: AdminStats.pendingProjects ?? 30, icon: <FaHourglassHalf />,color :"" },
    { label: "Completed Projects", value: AdminStats.completedProjects ?? 80, icon: <FaCheckCircle />,color :"" },
    { label: "Requires Attention", value: AdminStats.requiresAttention ?? 10, icon: <FaExclamationTriangle />,color :""},
  ];

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`p-6 rounded-lg shadow-md ${
              stat.color ? stat.color : "bg-white"
            } flex items-center justify-between border-l-4 ${
              stat.color ? "border-transparent" : "border-blue-500"
            }`}
          >
            <div className="flex items-center">
              <div className={`text-3xl ${stat.color ? "text-white" : "text-blue-500"} mr-4`}>
                {stat.icon}
              </div>
              <div>
                <h2 className={`text-lg font-medium ${stat.color ? "text-white" : "text-gray-700"}`}>
                  {stat.label}
                </h2>
                <p className={`text-2xl font-bold ${stat.color ? "text-white" : "text-gray-900"}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

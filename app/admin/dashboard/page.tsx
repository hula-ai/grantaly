"use client";
import DashboardCard from "@/component/DashboardCard/DashboardCard";
import Header from "@/component/Header/Header";
import { DashboardCardLoading } from "@/component/LoadingSkeleton/LoadingSkeleton";
import { handleOpenToast } from "@/helper/toast";
import { countState } from "@/schemas/state";
import { DashboardCount } from "@/types/type";
import { Box, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdPerson, MdWork } from "react-icons/md";


const Dashboard = () => {
  const toast = useToast();
  const [Counts, setCounts] = useState<DashboardCount | null>(null);
  const handleGetCount = async () => {
    try {
      const response = await axios.get("/api/admin/counts");

      const data = response.data.data;

      setCounts(data);
    } catch (error) {
      handleOpenToast("Something went wrong", "error", toast);
      setCounts(countState);
    }
  };
  useEffect(() => {
    handleGetCount();
  }, []);

  return (
    <>
      <Box padding={"2rem"} width={"100%"} height={"100vh"}>
        <Box
          display={"grid"}
          gap={"1rem"}
          mt={10}
          gridTemplateColumns={"repeat(3, 1fr)"}
        >
          {!Counts ? (
            <DashboardCardLoading />
          ) : Counts ? (
            <DashboardCard title={"User"} count={Counts?.user} icons={MdPerson} />
          ) : null}
          {!Counts ? (
            <DashboardCardLoading />
          ) : Counts ? (
            <DashboardCard title={"Cases"} count={Counts?.cases} icons={MdWork} />
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;

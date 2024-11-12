import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { PieChartTypes } from "@/types/type";
import { Box, Text } from "@chakra-ui/react";

interface Props {
  data: PieChartTypes;
}
const PieChart: React.FC<Props> = ({ data }) => {
  const series: number[] = data?.series;

  const options: ApexOptions = {
    chart: {
      height: 150,
      type: "pie",
      offsetX: 0,
      offsetY: 0,
    },
    stroke: {
      width: 0,
      // bac:'#F3F4F5'
    },
    legend: {
      // show: false,

      position: "bottom",
      offsetX: 0,
      offsetY: 0,
      customLegendItems: [
        "Correct Decision",
        "Missed Abnormality",
        "Incorrect Decision",
      ],
    },

    labels: data?.label,
    dataLabels: {
      dropShadow: {
        enabled: false,
      },

      style: {},
    },
    colors: ["#F7CCA4", "#5BAC64", "#F49C9D"],
  };

  return (
    <Box
      my={"10px"}
      py={"10px"}
      bg={'white'}
      height={"max-content"}
      borderRadius={"10px"}
      boxShadow={"md"}
      border={"1px  solid"}
      borderColor={"gray.100"}
    >
      <Chart
        options={options}
        type="pie"
        // width={350}
        height={310}
        series={series}
      />
    </Box>
  );
};

export default PieChart;

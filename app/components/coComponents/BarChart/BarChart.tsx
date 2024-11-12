import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { BarChartTypes } from "@/types/type";
import { Box, Text } from "@chakra-ui/react";

interface Props {
  data: BarChartTypes;
}
const BarChart: React.FC<Props> = ({ data }) => {
  console.log("data", data);

  const series = [
    {
      name: data.title,
      data: data.series,
    },
  ];
  const options: ApexOptions = {
    chart: {
      height: 250,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },

    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: data?.xKey,
      // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        // show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "%";
        },
      },
    },
    title: {
      text: "",
      floating: true,
      // offsetY: -30,
      align: "center",
      style: {
        color: "#848385",
        fontWeight: 600,
      },
    },
  };

  return (
    <Box
      my={"10px"}
      borderRadius={"10px"}
      boxShadow={"md"}
      bg={'white'}
      // bg={'purple.100'}
      color={'black'}
      border={"1px  solid"}
      borderColor={"gray.100"}
      // maxWidth={"max-content"}
      // minWidth={"100%"}
      height={"max-content"}
      width={"100%"}
    >
      <Chart
        options={options}
        height={260}
        // width={340}
        type="bar"
        series={series}
      />
      <Text
        fontSize={"12px"}
        marginTop={"-24px"}
        pb={"20px"}
        maxWidth={"350px"}
        isTruncated
        fontWeight={600}
        textAlign={"center"}
        // variant={"p1"}
        px={"10px"}
      >
        {data.title}
      </Text>
    </Box>
  );
};

export default BarChart;

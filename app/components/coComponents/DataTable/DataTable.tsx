import React, { useMemo, useEffect, useState, useCallback } from "react";
import {
  useTable,
  usePagination,
  Column,
  UsePaginationInstanceProps,
  TableOptions,
  TableInstance,
  UseSortByInstanceProps,
  UsePaginationState,
  TableState,
} from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Box,
  Text,
  Card,
  CardBody,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import DataLoader from "../DataLoader/DataLoader";
import { LIMIT_COUNT } from "@/utils/constant";
import { UserObject } from "@/types/type";
import { BACKEND_URL } from "@/utils/urls";
import { handleOpenToast } from "@/helper/toast";

interface Props {
  APIEndPoint: string;
  refresh?: boolean;
  columns: any;
  filterId?: any;
  handleState?: (e: any) => void;
}

const DataTable = ({

  handleState,
  APIEndPoint,
  columns,
  refresh,
  filterId,
}: Props) => {
  const toast = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async (pageIndex: number = 0) => {
    setLoading(true);
    try {
      const params = {
        limit: LIMIT_COUNT,
        page: pageIndex > 0 ? pageIndex * LIMIT_COUNT : null,
      };

      const response = await axios({
        method: "GET",
        url: `${BACKEND_URL}${APIEndPoint}`,
        params: params,
      });
      const { data: fetchedData, totalCount } = response.data;
      if (handleState) {
        handleState(fetchedData);
      }
      setData(fetchedData);
      setTotalPages(Math.ceil(totalCount / LIMIT_COUNT));
    } catch (error) {
      setLoading(false);
      setData([]);
      handleOpenToast("Something went wrong", "error", toast);
      console.error("Error in Fetching Data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(0);
  }, [refresh]);
  useEffect(() => {
    if (filterId) {
      setData((prev) =>
        prev.filter((item: any) => {
          return item._id != filterId;
        })
      );
    }
  }, [filterId]);

  const columnsMemo = useMemo(() => columns, [columns]);
  const dataMemo = useMemo(() => data, [data]);
  type TableInstanceWithHooks<T extends object> = TableInstance<T> &
    UsePaginationInstanceProps<T> &
    UseSortByInstanceProps<T> & {
      state: UsePaginationState<T>;
    };
  interface PaginationTableState extends TableState<any> {
    pageIndex: number;
  }

  interface PaginationTableOptions extends TableOptions<any> {
    initialState?: Partial<PaginationTableState>;
    pageCount?: number;
  }
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canNextPage,
    canPreviousPage,
    prepareRow,
    gotoPage,
    state: { pageIndex },
  } = useTable<any>(
    {
      columns: columnsMemo,
      data: dataMemo,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: totalPages,
    } as PaginationTableOptions,
    usePagination
  ) as TableInstanceWithHooks<any>;

  const handlePageChange = (pageIndex: number) => {
    fetchData(pageIndex);
    gotoPage(pageIndex);
  };
  const activeStyle = {
    backgroundColor: "gray.900",
    border: "none",
    color: "white",
    _hover: {
      backgroundColor: "gray.400",
    },
  };
  return (

    <Card
      // py={"20px"}
      borderRadius="lg" shadow="lg">
      <CardBody
        // pt={"0px"}
        // border={"1px solid white"}
        bg={"white"}
        borderRadius="lg"
        shadow="lg"

        style={{
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
        }}
      >
        <Box overflowX="auto">
          {loading ? (
            <DataLoader />
          ) : data.length === 0 ? (
            <Text
              mt={4}
              textAlign={"center"}
              color={"black"}
              fontWeight={"500"}
            >
              No data found
            </Text>
          ) : (
            <>
              <Table {...getTableProps()}
                size="md"
                borderRadius={'lg'}
                variant={'custom'}
                style={{
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  borderRadius: "8px",
                }}
              >
                <Thead bg={'purple.100'}
                  borderTop={'20px'}
                  mb={5}
                >
                  {headerGroups.map((headerGroup) => (
                    <Tr
                      py={10}
                      {...headerGroup.getHeaderGroupProps()}
                      key={headerGroup.id}
                    >
                      {headerGroup.headers.map((column) => (
                        <Th
                          {...column.getHeaderProps()}
                          key={column.id}
                          transition="color 0.3s"
                          padding={"24px 20px"}
                          color={'white'}
                          fontSize={'14px'}
                        >
                          {column.render("Header")}
                        </Th>
                      ))}
                    </Tr>
                  ))}
                </Thead>
                <Tbody {...getTableBodyProps()} mt={5} py={2}>
                  {page.map((row: any) => {
                    prepareRow(row);
                    return (
                      <Tr
                        py={4}
                        {...row.getRowProps()}
                        key={row.id}
                        sx={{
                          backgroundColor: '#78206e1a',
                          transition: "background-color 0.3s ease",
                          "&:hover": {
                            background: "#78206e1a",
                          },
                        }}
                      >
                        {row.cells.map((cell: any) => (
                          <Td
                            {...cell.getCellProps()}
                            key={cell.column.id}
                            padding={"20px 10px"}
                            transition="color 0.3s"
                            color={'black'}
                            fontSize={'15px'}
                            sx={{
                              backgroundColor: 'white',
                              transition: "background-color 0.3s ease",
                              "&:hover": {
                                background: "#78206e1a",
                              },
                            }}
                          >
                            {cell.render("Cell")}
                          </Td>
                        ))}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>

              <HStack
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                spacing="4"
                mt={5}
              >
                <Button
                  onClick={() => handlePageChange(pageIndex - 1)}
                  disabled={!canPreviousPage}
                  backgroundColor={"purple.100"}
                  border={"none"}
                  color={"white"}
                  width={"120px"}
                  _hover={{ bg: "purple.100" }}
                  transition="background-color 0.3s"
                  display={pageIndex === 0 ? "none" : "block"}
                >
                  Previous
                </Button>
                <Box
                  width={"120px"}
                  display={pageIndex === 0 ? "block" : "none"}
                ></Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={2}
                >
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      onClick={() => handlePageChange(i)}
                      disabled={i === pageIndex}
                      borderRadius={30}
                      backgroundColor={i === pageIndex ? "white" : "white"}
                      border={"2px solid white"}
                      color={i === pageIndex ? "black" : "black"}
                      fontWeight={i === pageIndex ? "bold" : "normal"}
                      transition="background-color 0.3s"
                      sx={i === pageIndex ? activeStyle : {}}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </Box>
                <Box
                  width={"120px"}
                  display={totalPages - 1 === pageIndex ? "block" : "none"}
                ></Box>
                <Button
                  onClick={() => handlePageChange(pageIndex + 1)}
                  backgroundColor={"purple.100"}
                  border={"none"}
                  color={"white"}
                  disabled={!canNextPage}
                  width={"120px"}
                  _hover={{ bg: "gray.800" }}
                  transition="background-color 0.3s"
                  display={totalPages - 1 === pageIndex ? "none" : "block"}
                >
                  Next
                </Button>
              </HStack>
            </>
          )}
        </Box>
      </CardBody>
    </Card>
  );
};

export default DataTable;

import React, { useMemo, useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import axios from "axios";
import DataLoader from "../DataLoader/DataLoader";
import { LIMIT_COUNT } from "@/utils/constant";
import { BACKEND_URL } from "@/utils/urls";
import { handleOpenToast } from "@/helper/toast";
import toast from "react-hot-toast";

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
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async (pageIndex: number = 0) => {
    setLoading(true);
    try {
      const params = {
        limit: LIMIT_COUNT,
        page: pageIndex >= 0 ? pageIndex : null,
      };
      const response = await axios.get(`${APIEndPoint}`, { params });
      const { data: fetchedData, totalCount } = response.data;
      if (handleState) handleState(fetchedData);
      setData(fetchedData);
      setTotalPages(Math.ceil(totalCount / LIMIT_COUNT));
    } catch (error) {
      setLoading(false);
      setData([]);
      toast.error("Something went wrong");
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
      setData((prev) => prev.filter((item: any) => item._id !== filterId));
    }
  }, [filterId]);

  // Ensure columns and data are valid arrays
  const columnsMemo = useMemo(() => (Array.isArray(columns) ? columns : []), [columns]);
  const dataMemo = useMemo(() => (Array.isArray(data) ? data : []), [data]);

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
  } = useTable(
    {
      columns: columnsMemo,
      data: dataMemo,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: totalPages,
    },
    usePagination
  );

  const handlePageChange = (pageIndex: number) => {
    fetchData(pageIndex);
    gotoPage(pageIndex);
  };

  return (
    <div style={{color:'black'}} className="border rounded-lg bg-white shadow-md">
      <div className="overflow-x-auto">
        {loading ? (
          <DataLoader />
        ) : data?.length === 0 ? (
          <p className="mt-4 text-center text-black font-medium py-5 bg-purple-200 rounded-md">
            No data found
          </p>
        ) : (
          <>
            <table {...getTableProps()} className="w-full border-collapse">
              <thead className="bg-purple-200">
                {headerGroups.map((headerGroup) => (
                  <tr style={{borderBottom:"1px solid black"}} {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        className="py-4 px-5 text-sm font-semibold text-black"
                        key={column.id}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={row.id}
                      className="hover:bg-purple-100 transition-colors"
                      style={{borderBottom:"1px solid black",textAlign:'center'}}
                    >
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          className="py-4 px-5 text-sm text-black"
                          key={cell.column.id}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex items-center justify-between py-4">
              <button
                onClick={() => handlePageChange(pageIndex - 1)}
                disabled={!canPreviousPage}
                className="px-4 py-2 text-black bg-purple-500 rounded hover:bg-purple-600 disabled:opacity-50"
              >
                {'<<'} Previous
              </button>

              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 rounded border ${
                      i === pageIndex
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(pageIndex + 1)}
                disabled={!canNextPage}
                className="px-4 py-2 text-black bg-purple-500 rounded hover:bg-purple-600 disabled:opacity-50"
              >
                Next {'>>'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DataTable;

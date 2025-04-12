/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Image as ImageIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Column {
  id: string;
  header: string;
  accessor: string;
  cellStyle?: string;
  Cell?: React.FC<{ value: any; row?: any }>;
  className?: string;
  isImage?: boolean;
}

interface DataTableProps {
  title: string;
  data: any[];
  columns: Column[];
  actionButton?: React.ReactNode;
  variant?: "default" | "product";
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  data,
  columns,
  actionButton,
  variant = "default",
}) => {
  const { t } = useTranslation();

  if (variant === "product") {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">{t(title)}</h2>
          {actionButton}
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((row) => (
              <div
                key={row.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ImageIcon size={20} className="text-gray-400" />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-gray-900 truncate mb-1">
                    {row.name}
                  </h3>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Sales</span>
                      <span className="text-sm text-indigo-600 font-semibold">
                        {row.sales}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Revenue</span>
                      <span className="text-sm text-green-600 font-semibold">
                        {row.revenue}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-gray-500">Stock</span>
                      {columns.map((column) => {
                        if (column.header === "Stock" && column.Cell) {
                          return (
                            <div key={column.id}>
                              <column.Cell
                                value={row[column.accessor]}
                                row={row}
                              />
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">{t(title)}</h2>
        {actionButton}
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="divide-y divide-gray-200">
          {data.map((row) => (
            <div key={row.id} className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-indigo-600 font-medium">{row.id}</span>
                  {columns.map((column) => {
                    if (column.header === "Status" && column.Cell) {
                      return (
                        <div key={column.id}>
                          <column.Cell value={row[column.accessor]} row={row} />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{row.customer}</span>
                  <span className="text-gray-900 font-medium">
                    {row.amount}
                  </span>
                </div>
                <div className="text-sm text-gray-500">{row.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      column.cellStyle ?? "text-gray-500"
                    }`}
                  >
                    {column.Cell ? (
                      <column.Cell value={row[column.accessor]} row={row} />
                    ) : (
                      row[column.accessor]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;

import React from "react";

interface Column {
  header: string;
  accessor: string;
  cellStyle?: string;
  Cell?: React.FC<{ value: any }>;
}

interface DataTableProps {
  title: string;
  data: any[];
  columns: Column[];
  actionButton?: React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  data,
  columns,
  actionButton,
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {actionButton}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      column.cellStyle || "text-gray-500"
                    }`}
                  >
                    {column.Cell ? (
                      <column.Cell value={row[column.accessor]} />
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

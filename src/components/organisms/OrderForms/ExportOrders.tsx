import React, { useState } from "react";
import { X, FileText, FileSpreadsheet, Download } from "lucide-react";
import Button from "../../atoms/Button/Button";

interface ExportOrdersProps {
  onClose: () => void;
  onExport: (format: string, dateRange: string) => void;
}

const ExportOrders: React.FC<ExportOrdersProps> = ({ onClose, onExport }) => {
  const [selectedFormat, setSelectedFormat] = useState("csv");
  const [dateRange, setDateRange] = useState("all");

  const handleExport = () => {
    onExport(selectedFormat, dateRange);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-50 flex items-center justify-center p-4 h-screen">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all duration-300 ease-out scale-100 opacity-100">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Export Orders</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                className={`p-4 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-colors ${
                  selectedFormat === "csv"
                    ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                    : "hover:border-gray-300"
                }`}
                onClick={() => setSelectedFormat("csv")}
              >
                <FileText className="w-6 h-6" />
                <span className="text-sm font-medium">CSV</span>
              </button>
              <button
                className={`p-4 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-colors ${
                  selectedFormat === "excel"
                    ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                    : "hover:border-gray-300"
                }`}
                onClick={() => setSelectedFormat("excel")}
              >
                <FileSpreadsheet className="w-6 h-6" />
                <span className="text-sm font-medium">Excel</span>
              </button>
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {dateRange === "custom" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 border-t rounded-b-lg flex justify-end space-x-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleExport}
            leftIcon={<Download size={16} />}
          >
            Export Orders
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportOrders;

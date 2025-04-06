import React, { useState } from "react";
import { X, Download, FileSpreadsheet, FileJson } from "lucide-react";
import Button from "../../atoms/Button/Button";

interface ExportModalProps {
  onClose: () => void;
  onExport: (format: string, dateRange: string) => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ onClose, onExport }) => {
  const [selectedFormat, setSelectedFormat] = useState("csv");
  const [dateRange, setDateRange] = useState("7days");

  const handleExport = () => {
    onExport(selectedFormat, dateRange);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Export Analytics Data
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Choose your export preferences
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          {/* Format Selection */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Export Format
              </label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <button
                  className={`flex items-center gap-2 p-3 rounded-lg border ${
                    selectedFormat === "csv"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedFormat("csv")}
                >
                  <FileSpreadsheet
                    className={`w-5 h-5 ${
                      selectedFormat === "csv"
                        ? "text-indigo-600"
                        : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      selectedFormat === "csv"
                        ? "text-indigo-600"
                        : "text-gray-700"
                    }`}
                  >
                    CSV
                  </span>
                </button>
                <button
                  className={`flex items-center gap-2 p-3 rounded-lg border ${
                    selectedFormat === "json"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedFormat("json")}
                >
                  <FileJson
                    className={`w-5 h-5 ${
                      selectedFormat === "json"
                        ? "text-indigo-600"
                        : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      selectedFormat === "json"
                        ? "text-indigo-600"
                        : "text-gray-700"
                    }`}
                  >
                    JSON
                  </span>
                </button>
              </div>
            </div>

            {/* Date Range Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="12months">Last 12 months</option>
                <option value="all">All time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 sm:p-6 border-t mt-auto shrink-0">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleExport}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;

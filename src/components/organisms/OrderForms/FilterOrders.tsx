import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { X, Filter } from "lucide-react";
import Button from "../../atoms/Button/Button";

interface FilterData {
  dateRange: string;
  priceRange: {
    min: string;
    max: string;
  };
  statuses: string[];
}

interface FilterOrdersProps {
  onClose: () => void;
  onApplyFilters: (filters: FilterData) => void;
}

const FilterOrders: React.FC<FilterOrdersProps> = ({
  onClose,
  onApplyFilters,
}) => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const statuses = [
    "completed",
    "processing",
    "shipped",
    "pending",
    "cancelled",
  ];

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      dateRange,
      priceRange,
      statuses: selectedStatuses,
    });
    onClose();
  };

  const handleClearFilters = () => {
    setDateRange("all");
    setPriceRange({ min: "", max: "" });
    setSelectedStatuses([]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{t("orders.filters.title")}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={t("common.close")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Date Range */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              {t("orders.filters.date_range_label")}
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">{t("orders.filters.date_ranges.all")}</option>
              <option value="today">
                {t("orders.filters.date_ranges.today")}
              </option>
              <option value="week">
                {t("orders.filters.date_ranges.week")}
              </option>
              <option value="month">
                {t("orders.filters.date_ranges.month")}
              </option>
              <option value="year">
                {t("orders.filters.date_ranges.year")}
              </option>
              <option value="custom">
                {t("orders.filters.date_ranges.custom")}
              </option>
            </select>

            {dateRange === "custom" && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("orders.filters.start_date")}
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("orders.filters.end_date")}
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              {t("orders.filters.price_range_label")}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  placeholder={t("orders.filters.min_price")}
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder={t("orders.filters.max_price")}
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              {t("orders.filters.status_label")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusToggle(status)}
                  className={`p-2 rounded-lg border transition-colors ${
                    selectedStatuses.includes(status)
                      ? "bg-indigo-50 border-indigo-500 text-indigo-600"
                      : "hover:border-gray-300"
                  }`}
                >
                  {t(`orders.status.${status}`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t rounded-b-lg flex justify-between">
          <Button variant="ghost" onClick={handleClearFilters}>
            {t("orders.filters.clear_filters")}
          </Button>
          <div className="space-x-3">
            <Button variant="ghost" onClick={onClose}>
              {t("common.cancel")}
            </Button>
            <Button
              variant="primary"
              onClick={handleApplyFilters}
              leftIcon={<Filter size={16} />}
            >
              {t("orders.filters.apply_filters")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterOrders;

import React, { useState, useMemo } from "react";
import Button from "../../atoms/Button/Button";
import Badge from "../../atoms/Badge/Badge";
import OrderFilterDropdown from "./OrderFilterDropdown";
import { useTranslation } from "react-i18next";

interface UnfulfilledOrder {
  orderNumber: string;
  customerName: string;
  orderDate: string;
  paymentStatus:
    | "paid"
    | "pending"
    | "failed"
    | "refunded"
    | "partially_refunded";
  totalPrice: string;
  items: number;
  tags?: string[];
  priority: "high" | "medium" | "low";
}

interface UnfulfilledOrdersTableProps {
  orders: UnfulfilledOrder[];
  onFilter: (filters: {
    status: string[];
    priority: string[];
    tags: string[];
  }) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const UnfulfilledOrdersTable: React.FC<UnfulfilledOrdersTableProps> = ({
  orders,
  onFilter,
  onPrevious,
  onNext,
}) => {
  const { t } = useTranslation();
  const [activeFilters, setActiveFilters] = useState<{
    status: string[];
    priority: string[];
    tags: string[];
  }>({
    status: [],
    priority: [],
    tags: [],
  });

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status filter
      if (
        activeFilters.status.length > 0 &&
        !activeFilters.status.includes(order.paymentStatus)
      ) {
        return false;
      }

      // Priority filter
      if (
        activeFilters.priority.length > 0 &&
        !activeFilters.priority.includes(order.priority)
      ) {
        return false;
      }

      // Tags filter
      if (activeFilters.tags.length > 0) {
        if (!order.tags) return false;
        if (!activeFilters.tags.some((tag) => order.tags?.includes(tag))) {
          return false;
        }
      }

      return true;
    });
  }, [orders, activeFilters]);

  const handleFilter = (filters: {
    status: string[];
    priority: string[];
    tags: string[];
  }) => {
    setActiveFilters(filters);
    onFilter(filters);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "error";
      case "refunded":
        return "default";
      case "partially_refunded":
        return "warning";
      default:
        return "default";
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "urgent":
        return "bg-red-100 text-red-700";
      case "express":
        return "bg-blue-100 text-blue-700";
      case "international":
        return "bg-indigo-100 text-indigo-700";
      case "fragile":
        return "bg-blue-100 text-blue-700";
      case "priority":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const translatePaymentStatus = (status: string) => {
    return t(`analytics.unfulfilledOrders.paymentStatus.${status}`);
  };

  // const translatePriority = (priority: string) => {
  //   return t(`analytics.unfulfilledOrders.priority.${priority}`);
  // };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">
            {t("analytics.unfulfilledOrders.title")}
          </h2>
          <span className="text-sm text-gray-500">
            {filteredOrders.length}{" "}
            {t("analytics.unfulfilledOrders.filters.count")}
          </span>
        </div>
        <OrderFilterDropdown onFilter={handleFilter} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-left">
              <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("analytics.unfulfilledOrders.columns.orderNumber")}
              </th>
              <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("analytics.unfulfilledOrders.columns.customer")}
              </th>
              <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("analytics.unfulfilledOrders.columns.payment")}
              </th>
              <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("analytics.unfulfilledOrders.columns.items")}
              </th>
              <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("analytics.unfulfilledOrders.columns.total")}
              </th>
              <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("analytics.unfulfilledOrders.filters.tags")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.orderNumber} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {order.orderNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(order.orderDate).toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">
                      {order.customerName}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={getStatusColor(order.paymentStatus)}>
                      {translatePaymentStatus(order.paymentStatus)}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900">
                      {order.items}{" "}
                      {t("analytics.stats.bestSellers.items").toLowerCase()}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">
                      {order.totalPrice}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-2">
                      {order.tags?.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(
                            tag
                          )}`}
                        >
                          {t(
                            `analytics.unfulfilledOrders.filters.tagOptions.${tag.toLowerCase()}`,
                            tag
                          )}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  {t("analytics.unfulfilledOrders.filters.noResults")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2 p-4 border-t">
        <Button variant="secondary" onClick={onPrevious}>
          {t("analytics.unfulfilledOrders.pagination.previous")}
        </Button>
        <Button variant="secondary" onClick={onNext}>
          {t("analytics.unfulfilledOrders.pagination.next")}
        </Button>
      </div>
    </div>
  );
};

export default UnfulfilledOrdersTable;

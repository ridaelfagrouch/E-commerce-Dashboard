import React from "react";
import { Filter } from "lucide-react";
import Button from "../../atoms/Button/Button";
import Badge from "../../atoms/Badge/Badge";

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
  onFilter: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const UnfulfilledOrdersTable: React.FC<UnfulfilledOrdersTableProps> = ({
  orders,
  onFilter,
  onPrevious,
  onNext,
}) => {
  const getPaymentStatusVariant = (
    status: UnfulfilledOrder["paymentStatus"]
  ) => {
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

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">
            Unfulfilled Orders
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {orders.length} orders
            </span>
            <Button
              variant="secondary"
              leftIcon={<Filter className="w-4 h-4" />}
              onClick={onFilter}
            >
              Filter
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tags
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${
                  order.priority === "high"
                    ? "bg-red-50/30"
                    : order.priority === "medium"
                    ? "bg-yellow-50/30"
                    : ""
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {order.orderNumber}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {order.customerName}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    text={order.paymentStatus.replace("_", " ")}
                    variant={getPaymentStatusVariant(order.paymentStatus)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.items} {order.items === 1 ? "item" : "items"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.totalPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {order.priority === "high" && (
                      <Badge text="Urgent" variant="error" />
                    )}
                    {order.tags?.map((tag, tagIndex) => (
                      <Badge key={tagIndex} text={tag} variant="info" />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Showing {orders.length} orders
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="secondary" onClick={onPrevious}>
              Previous
            </Button>
            <Button variant="primary" onClick={onNext}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnfulfilledOrdersTable;

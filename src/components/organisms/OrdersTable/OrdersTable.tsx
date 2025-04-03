import React from "react";
import { Eye } from "lucide-react";
import Button from "../../atoms/Button/Button";

export interface Order {
  id: string;
  customer: string;
  date: string;
  status: "Completed" | "Processing" | "Shipped" | "Pending" | "Cancelled";
  amount: number;
  items: number;
}

interface OrdersTableProps {
  orders: Order[];
  className?: string;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  className = "",
}) => {
  const getStatusColor = (status: string) => {
    const statusColors = {
      completed: { bg: "bg-green-100", text: "text-green-700" },
      processing: { bg: "bg-blue-100", text: "text-blue-700" },
      pending: { bg: "bg-yellow-100", text: "text-yellow-700" },
      shipped: { bg: "bg-purple-100", text: "text-purple-700" },
      cancelled: { bg: "bg-red-100", text: "text-red-700" },
    };

    const normalizedStatus = status.toLowerCase();
    return (
      statusColors[normalizedStatus as keyof typeof statusColors] || {
        bg: "bg-gray-100",
        text: "text-gray-700",
      }
    );
  };

  return (
    <div className={className}>
      {/* Mobile View */}
      <div className="block sm:hidden">
        <div className="divide-y divide-gray-200">
          {orders.map((order) => (
            <div key={order.id} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-medium text-indigo-600">
                    {order.id}
                  </div>
                  <div className="text-sm text-gray-900">{order.customer}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Eye size={16} />}
                  onClick={() => console.log(`View order ${order.id}`)}
                >
                  View
                </Button>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{order.date}</span>
                <span className="text-gray-900">
                  ${order.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    getStatusColor(order.status).bg
                  } ${getStatusColor(order.status).text}`}
                >
                  {order.status}
                </span>
                <span className="text-sm text-gray-500">
                  {order.items} items
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Items
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      getStatusColor(order.status).bg
                    } ${getStatusColor(order.status).text}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                  {order.items}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<Eye size={16} />}
                    onClick={() => console.log(`View order ${order.id}`)}
                  >
                    <span className="hidden sm:inline">View</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;

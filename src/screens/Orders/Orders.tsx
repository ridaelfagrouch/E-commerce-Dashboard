import React, { useState } from "react";
import StatCard from "../../components/molecules/StatCard/StatCard";
import {
  Package,
  Calendar,
  DollarSign,
  Filter,
  Download,
  Plus,
  ChevronDown,
  Eye,
} from "lucide-react";
import Pagination from "../../components/molecules/Pagination/Pagination";
import SearchInput from "../../components/atoms/SearchInput/SearchInput";

// Types
type Order = {
  id: string;
  customer: string;
  date: string;
  status: "Completed" | "Processing" | "Shipped" | "Pending" | "Cancelled";
  amount: number;
  items: number;
};

export const Orders: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const totalOrders = 1286;
  const OrdersPerPage = 8;

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "#ORD-5289",
      customer: "Sarah Johnson",
      date: "Apr 1, 2025",
      status: "Completed",
      amount: 128.5,
      items: 2,
    },
    {
      id: "#ORD-5288",
      customer: "Michael Chen",
      date: "Apr 1, 2025",
      status: "Processing",
      amount: 74.99,
      items: 1,
    },
    {
      id: "#ORD-5287",
      customer: "Emma Rodriguez",
      date: "Mar 31, 2025",
      status: "Shipped",
      amount: 219.0,
      items: 3,
    },
    {
      id: "#ORD-5286",
      customer: "Daniel Kim",
      date: "Mar 31, 2025",
      status: "Pending",
      amount: 65.25,
      items: 1,
    },
    {
      id: "#ORD-5285",
      customer: "Lisa Wong",
      date: "Mar 30, 2025",
      status: "Completed",
      amount: 95.75,
      items: 2,
    },
    {
      id: "#ORD-5284",
      customer: "Jacob Miller",
      date: "Mar 30, 2025",
      status: "Cancelled",
      amount: 42.99,
      items: 1,
    },
    {
      id: "#ORD-5283",
      customer: "Olivia Taylor",
      date: "Mar 29, 2025",
      status: "Completed",
      amount: 156.8,
      items: 4,
    },
    {
      id: "#ORD-5282",
      customer: "Noah Brown",
      date: "Mar 29, 2025",
      status: "Shipped",
      amount: 87.5,
      items: 2,
    },
  ]);

  const [filter, setFilter] = useState<string>("all");

  // Filter Orders based on status and search term
  const filteredOrders = orders
    .filter((order) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.customer.toLowerCase().includes(searchLower) ||
        order.id.toLowerCase().includes(searchLower)
      );
    })
    .filter((order) => {
      if (filter === "all") return true;
      return order.status.toLowerCase() === filter.toLowerCase();
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <Plus size={16} />
            New Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Orders"
          value="256"
          icon={<Package className="text-indigo-600" size={24} />}
          trend={{
            value: 12.5,
            isPositive: true,
            text: "vs last month",
          }}
        />
        <StatCard
          title="Today's Orders"
          value="24"
          icon={<Calendar className="text-green-600" size={24} />}
          trend={{
            value: 5.2,
            isPositive: true,
            text: "vs yesterday",
          }}
        />
        <StatCard
          title="Average Order Value"
          value="$85.40"
          icon={<DollarSign className="text-blue-600" size={24} />}
          trend={{
            value: 3.8,
            isPositive: true,
            text: "vs last month",
          }}
        />
      </div>

      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">Order Filters</h2>
          <div className="flex gap-2">
            <SearchInput
              placeholder="Search customers..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="bg-gray-100 px-3 py-2 rounded-md flex items-center gap-1">
              <Filter size={16} />
              Filters
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
        <div className="p-4 flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-md ${
              filter === "all" ? "bg-indigo-100 text-indigo-800" : "bg-gray-100"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              filter === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100"
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              filter === "processing"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100"
            }`}
            onClick={() => setFilter("processing")}
          >
            Processing
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              filter === "shipped" ? "bg-blue-100 text-blue-800" : "bg-gray-100"
            }`}
            onClick={() => setFilter("shipped")}
          >
            Shipped
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              filter === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100"
            }`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              filter === "cancelled" ? "bg-red-100 text-red-800" : "bg-gray-100"
            }`}
            onClick={() => setFilter("cancelled")}
          >
            Cancelled
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.items}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1">
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalItems={totalOrders}
          itemsPerPage={OrdersPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Orders;

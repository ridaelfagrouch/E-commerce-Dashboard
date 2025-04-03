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
} from "lucide-react";
import Pagination from "../../components/molecules/Pagination/Pagination";
import SearchInput from "../../components/atoms/SearchInput/SearchInput";
import Button from "../../components/atoms/Button/Button";
import FilterButtonGroup from "../../components/molecules/FilterButtonGroup/FilterButtonGroup";
import OrdersTable, {
  Order,
} from "../../components/organisms/OrdersTable/OrdersTable";

const filterOptions = [
  { id: "all", label: "All" },
  { id: "completed", label: "Completed" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "pending", label: "Pending" },
  { id: "cancelled", label: "Cancelled" },
];

export const Orders: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const totalOrders = 1286;
  const ordersPerPage = 8;

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" leftIcon={<Download size={16} />}>
            Export
          </Button>
          <Button variant="primary" leftIcon={<Plus size={16} />}>
            New Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-medium">Order Filters</h2>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="w-full sm:w-64">
              <SearchInput
                placeholder="Search orders..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button
              variant="secondary"
              leftIcon={<Filter size={16} />}
              rightIcon={<ChevronDown size={14} />}
            >
              Filters
            </Button>
          </div>
        </div>
        <div className="p-4">
          <FilterButtonGroup
            options={filterOptions}
            activeFilter={filter}
            onFilterChange={setFilter}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <OrdersTable orders={filteredOrders} />
        <div className="border-t">
          <Pagination
            currentPage={currentPage}
            totalItems={totalOrders}
            itemsPerPage={ordersPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;

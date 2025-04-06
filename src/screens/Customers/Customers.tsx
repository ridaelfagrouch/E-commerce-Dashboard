import React, { useState } from "react";
import StatCard from "../../components/molecules/StatCard/StatCard";
import CustomerCard from "../../components/organisms/CustomerCard/CustomerCard";
import FilterButton from "../../components/molecules/FilterButton/FilterButton";
import SearchInput from "../../components/atoms/SearchInput/SearchInput";
import Pagination from "../../components/molecules/Pagination/Pagination";
import ActionButton from "../../components/atoms/ActionButton/ActionButton";
import AddCustomer from "../../components/organisms/CustomerForms/AddCustomer";
import ViewCustomer from "../../components/organisms/CustomerForms/ViewCustomer";
import Button from "../../components/atoms/Button/Button";
import { Users, UserPlus, ShoppingCart, DollarSign } from "lucide-react";

// Types
export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  orders: number;
  spent: number;
  status: "Active" | "New" | "Inactive";
  lastOrder: string;
};

export const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "CUS-5432",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 123-4567",
      location: "New York, USA",
      orders: 8,
      spent: 845.75,
      status: "Active",
      lastOrder: "Apr 1, 2025",
    },
    {
      id: "CUS-5431",
      name: "Michael Chen",
      email: "mchen@example.com",
      phone: "(555) 234-5678",
      location: "San Francisco, USA",
      orders: 3,
      spent: 274.99,
      status: "Active",
      lastOrder: "Apr 1, 2025",
    },
    {
      id: "CUS-5430",
      name: "Emma Rodriguez",
      email: "emma.r@example.com",
      phone: "(555) 345-6789",
      location: "Chicago, USA",
      orders: 12,
      spent: 1254.5,
      status: "Active",
      lastOrder: "Mar 31, 2025",
    },
    {
      id: "CUS-5429",
      name: "Daniel Kim",
      email: "dkim@example.com",
      phone: "(555) 456-7890",
      location: "Los Angeles, USA",
      orders: 1,
      spent: 65.25,
      status: "New",
      lastOrder: "Mar 31, 2025",
    },
    {
      id: "CUS-5428",
      name: "Lisa Wong",
      email: "lwong@example.com",
      phone: "(555) 567-8901",
      location: "Seattle, USA",
      orders: 5,
      spent: 428.95,
      status: "Active",
      lastOrder: "Mar 30, 2025",
    },
    {
      id: "CUS-5427",
      name: "James Miller",
      email: "james.m@example.com",
      phone: "(555) 678-9012",
      location: "Boston, USA",
      orders: 0,
      spent: 0,
      status: "Inactive",
      lastOrder: "Feb 15, 2025",
    },
    {
      id: "CUS-5426",
      name: "Olivia Davis",
      email: "olivia.d@example.com",
      phone: "(555) 789-0123",
      location: "Austin, USA",
      orders: 1,
      spent: 49.99,
      status: "New",
      lastOrder: "Mar 29, 2025",
    },
    {
      id: "CUS-5425",
      name: "Noah Brown",
      email: "nbrown@example.com",
      phone: "(555) 890-1234",
      location: "Denver, USA",
      orders: 7,
      spent: 634.8,
      status: "Active",
      lastOrder: "Mar 28, 2025",
    },
  ]);

  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const customersPerPage = 8;
  const totalCustomers = 1286;

  const filterOptions = [
    { id: "all", label: "All", color: "bg-indigo-100 text-indigo-800" },
    { id: "active", label: "Active", color: "bg-green-100 text-green-800" },
    { id: "new", label: "New", color: "bg-blue-100 text-blue-800" },
    { id: "inactive", label: "Inactive", color: "bg-gray-100 text-gray-800" },
  ];

  const statsData = [
    {
      title: "Total Customers",
      value: "1,286",
      icon: <Users size={24} />,
      trend: {
        value: 8.5,
        isPositive: true,
        text: "since last month",
      },
      iconBgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      title: "New Customers",
      value: "28",
      icon: <UserPlus size={24} />,
      trend: {
        value: 12.3,
        isPositive: true,
        text: "since last month",
      },
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Average Orders",
      value: "4.7",
      icon: <ShoppingCart size={24} />,
      trend: {
        value: 3.2,
        isPositive: true,
        text: "since last month",
      },
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Average Lifetime Value",
      value: "$387.42",
      icon: <DollarSign size={24} />,
      trend: {
        value: 5.8,
        isPositive: true,
        text: "since last month",
      },
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  // Filter customers based on status and search term
  const filteredCustomers = customers
    .filter((customer) => {
      let isMatch = true;
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      switch (filter) {
        case "all":
          isMatch = true;
          break;
        case "active":
          isMatch = customer.status === "Active";
          break;
        case "new":
          isMatch = customer.status === "New";
          break;
        case "inactive":
          isMatch = customer.status === "Inactive";
          break;
        case "high_value":
          isMatch = customer.spent > 500;
          break;
        case "recent":
          isMatch = new Date(customer.lastOrder) >= thirtyDaysAgo;
          break;
        default:
          isMatch = true;
      }
      return isMatch;
    })
    .filter(
      (customer) =>
        searchTerm === "" ||
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterSelect = (selectedFilter: string) => {
    setFilter(selectedFilter);
    setCurrentPage(1);
  };

  const handleAddCustomer = (customerData: {
    name: string;
    email: string;
    phone: string;
    location: string;
  }) => {
    const newCustomer: Customer = {
      id: `CUS-${String(customers.length + 5433).padStart(4, "0")}`,
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      location: customerData.location,
      orders: 0,
      spent: 0,
      status: "New",
      lastOrder: "No orders yet",
    };

    setCustomers([newCustomer, ...customers]);
    setShowAddCustomer(false);
  };

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
  };

  return (
    <div className="mb-6 mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <ActionButton
          icon={<UserPlus size={16} />}
          label="Add Customer"
          variant="primary"
          onClick={() => setShowAddCustomer(true)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            iconBgColor={stat.iconBgColor}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-medium">Customer Filters</h2>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="w-full sm:w-64">
              <SearchInput
                placeholder="Search customers..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <FilterButton onFilterSelect={handleFilterSelect} />
          </div>
        </div>
        <div className="p-4 overflow-x-auto flex gap-2">
          {filterOptions.map((option) => (
            <Button
              key={option.id}
              variant="filter"
              className={`${filter === option.id ? option.color : ""}`}
              onClick={() => handleFilterSelect(option.id)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onViewDetails={() => handleViewDetails(customer)}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={totalCustomers}
          itemsPerPage={customersPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {showAddCustomer && (
        <AddCustomer
          onClose={() => setShowAddCustomer(false)}
          onSave={handleAddCustomer}
        />
      )}

      {selectedCustomer && (
        <ViewCustomer
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onUpdate={handleUpdateCustomer}
        />
      )}
    </div>
  );
};

export default Customers;

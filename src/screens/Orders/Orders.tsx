import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
import ExportOrders from "../../components/organisms/OrderForms/ExportOrders";
import NewOrder from "../../components/organisms/OrderForms/NewOrder";
import FilterOrders from "../../components/organisms/OrderForms/FilterOrders";

interface OrderFormData {
  customerName: string;
  total: number;
  products: Array<{ id: string; quantity: number }>;
}

interface FilterData {
  dateRange: string;
  priceRange: {
    min: string;
    max: string;
  };
  statuses: string[];
}

const initialOrders: Order[] = [
  {
    id: "#ORD-5289",
    customer: "Sarah Johnson",
    date: "Apr 1, 2025",
    status: "completed",
    amount: 128.5,
    items: 2,
  },
  {
    id: "#ORD-5288",
    customer: "Michael Chen",
    date: "Apr 1, 2025",
    status: "processing",
    amount: 74.99,
    items: 1,
  },
  {
    id: "#ORD-5287",
    customer: "Emma Rodriguez",
    date: "Mar 31, 2025",
    status: "completed",
    amount: 219.0,
    items: 3,
  },
  {
    id: "#ORD-5286",
    customer: "Daniel Kim",
    date: "Mar 31, 2025",
    status: "pending",
    amount: 65.25,
    items: 1,
  },
  {
    id: "#ORD-5285",
    customer: "Lisa Wong",
    date: "Mar 30, 2025",
    status: "completed",
    amount: 95.75,
    items: 2,
  },
  {
    id: "#ORD-5284",
    customer: "Jacob Miller",
    date: "Mar 30, 2025",
    status: "cancelled",
    amount: 42.99,
    items: 1,
  },
  {
    id: "#ORD-5283",
    customer: "Olivia Taylor",
    date: "Mar 29, 2025",
    status: "completed",
    amount: 156.8,
    items: 4,
  },
  {
    id: "#ORD-5282",
    customer: "Noah Brown",
    date: "Mar 29, 2025",
    status: "completed",
    amount: 87.5,
    items: 2,
  },
];

export const Orders: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filter, setFilter] = useState<string>("all");
  const [showExportModal, setShowExportModal] = useState(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const totalOrders = 1286;
  const ordersPerPage = 8;

  const filterOptions = [
    { id: "all", label: t("orders.filters.all") },
    { id: "completed", label: t("orders.status.completed") },
    { id: "processing", label: t("orders.status.processing") },
    { id: "shipped", label: t("orders.status.shipped") },
    { id: "pending", label: t("orders.status.pending") },
    { id: "cancelled", label: t("orders.status.cancelled") },
  ];

  const statsCards = [
    {
      title: t("orders.stats.total_orders"),
      value: "256",
      icon: <Package size={24} />,
      trend: {
        value: 12.5,
        isPositive: true,
        text: t("common.vs_last_month"),
      },
      iconBgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      title: t("orders.stats.today_orders"),
      value: "24",
      icon: <Calendar size={24} />,
      trend: {
        value: 5.2,
        isPositive: true,
        text: t("common.vs_yesterday"),
      },
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: t("orders.stats.average_order_value"),
      value: "$85.40",
      icon: <DollarSign size={24} />,
      trend: {
        value: 3.8,
        isPositive: true,
        text: t("common.vs_last_month"),
      },
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  // Filter Orders based on status and search term
  const filteredOrders = orders
    .filter((order) => {
      const searchLower = searchTerm.toLowerCase();
      const customerName =
        typeof order.customer === "string"
          ? order.customer
          : order.customer.name;
      return (
        customerName.toLowerCase().includes(searchLower) ||
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

  const handleExport = (format: string, dateRange: string) => {
    // Implement export functionality
    console.log("Exporting orders:", { format, dateRange });
  };

  const handleNewOrder = (orderData: OrderFormData) => {
    // Implement new order creation
    console.log("Creating new order:", orderData);
    const newOrder: Order = {
      id: `#ORD-${Math.floor(Math.random() * 1000)}`,
      customer: orderData.customerName,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "pending",
      amount: orderData.total,
      items: orderData.products.length,
    };
    setOrders([newOrder, ...orders]);
  };

  const handleApplyFilters = (filters: FilterData) => {
    // Implement filter functionality
    console.log("Applying filters:", filters);
  };

  return (
    <div className="space-y-6 mb-6 mx-auto max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{t("orders.title")}</h1>
          <p className="text-gray-500">{t("orders.description")}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            leftIcon={<Download size={16} />}
            onClick={() => setShowExportModal(true)}
          >
            {t("orders.actions.export")}
          </Button>
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => setShowNewOrderModal(true)}
          >
            {t("orders.actions.new_order")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {statsCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            trend={card.trend}
            iconBgColor={card.iconBgColor}
            iconColor={card.iconColor}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-medium">
            {t("orders.filters.all_statuses")}
          </h2>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="w-full sm:w-64">
              <SearchInput
                placeholder={t("orders.filters.search_placeholder")}
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button
              variant="secondary"
              leftIcon={<Filter size={16} />}
              rightIcon={<ChevronDown size={14} />}
              onClick={() => setShowFilterModal(true)}
            >
              {t("orders.actions.filter")}
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

      {/* Modals */}
      {showExportModal && (
        <ExportOrders
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
        />
      )}
      {showNewOrderModal && (
        <NewOrder
          onClose={() => setShowNewOrderModal(false)}
          onSubmit={handleNewOrder}
        />
      )}
      {showFilterModal && (
        <FilterOrders
          onClose={() => setShowFilterModal(false)}
          onApplyFilters={handleApplyFilters}
        />
      )}
    </div>
  );
};

export default Orders;

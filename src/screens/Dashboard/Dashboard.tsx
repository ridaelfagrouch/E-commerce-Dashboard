import React, { useState, useEffect } from "react";
import {
  DollarSign,
  CheckCircle,
  Users,
  Package,
  Calendar,
  BarChart2,
  PieChart,
  ArrowRight,
} from "lucide-react";
import StatCard from "../../components/molecules/StatCard/StatCard";
import Badge from "../../components/atoms/Badge/Badge";
import Button from "../../components/atoms/Button/Button";
import DataTable from "../../components/organisms/DataTable/DataTable";
import ChartCard from "../../components/molecules/ChartCard/ChartCard";
import TabGroup from "../../components/molecules/TabGroup/TabGroup";

// Types
interface Order {
  id: string;
  customer: string;
  date: string;
  status: "Completed" | "Processing" | "Shipped" | "Pending";
  amount: string;
  amountValue: number; // For chart calculations
}

interface Product {
  name: string;
  sales: number;
  revenue: string;
  revenueValue: number; // For chart calculations
  inventory: number;
}

interface SalesByPeriod {
  day: string;
  sales: number;
  orders: number;
}

interface SalesByCategory {
  category: string;
  sales: number;
  color: string;
}

const Dashboard: React.FC = () => {
  // State for chart period selection
  const [chartPeriod, setChartPeriod] = useState<"week" | "month" | "year">(
    "week"
  );

  // Sample data for demonstration
  const recentOrders: Order[] = [
    {
      id: "#ORD-5289",
      customer: "Sarah Johnson",
      date: "Apr 1, 2025",
      status: "Completed",
      amount: "$128.50",
      amountValue: 128.5,
    },
    {
      id: "#ORD-5288",
      customer: "Michael Chen",
      date: "Apr 1, 2025",
      status: "Processing",
      amount: "$74.99",
      amountValue: 74.99,
    },
    {
      id: "#ORD-5287",
      customer: "Emma Rodriguez",
      date: "Mar 31, 2025",
      status: "Shipped",
      amount: "$219.00",
      amountValue: 219.0,
    },
    {
      id: "#ORD-5286",
      customer: "Daniel Kim",
      date: "Mar 31, 2025",
      status: "Pending",
      amount: "$65.25",
      amountValue: 65.25,
    },
  ];

  const topProducts: Product[] = [
    {
      name: "Wireless Earbuds Pro",
      sales: 124,
      revenue: "$12,400",
      revenueValue: 12400,
      inventory: 38,
    },
    {
      name: "Ultra HD Smart Watch",
      sales: 98,
      revenue: "$19,600",
      revenueValue: 19600,
      inventory: 15,
    },
    {
      name: "Premium Yoga Mat",
      sales: 87,
      revenue: "$4,350",
      revenueValue: 4350,
      inventory: 52,
    },
    {
      name: "Organic Coffee Beans",
      sales: 76,
      revenue: "$1,900",
      revenueValue: 1900,
      inventory: 125,
    },
  ];

  // Chart data
  const [salesChartData, setSalesChartData] = useState<SalesByPeriod[]>([]);
  const [categoriesChartData, setCategoriesChartData] = useState<
    SalesByCategory[]
  >([]);

  // Generate sales data based on selected period
  useEffect(() => {
    const generateSalesData = () => {
      let days: string[];
      let salesData: SalesByPeriod[];

      if (chartPeriod === "week") {
        days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        salesData = days.map((day) => ({
          day,
          sales: Math.floor(Math.random() * 5000) + 1000,
          orders: Math.floor(Math.random() * 30) + 5,
        }));
      } else if (chartPeriod === "month") {
        salesData = Array(30)
          .fill(0)
          .map((_, i) => ({
            day: `${i + 1}`,
            sales: Math.floor(Math.random() * 5000) + 1000,
            orders: Math.floor(Math.random() * 30) + 5,
          }));
      } else {
        salesData = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ].map((month) => ({
          day: month,
          sales: Math.floor(Math.random() * 60000) + 30000,
          orders: Math.floor(Math.random() * 300) + 100,
        }));
      }

      setSalesChartData(salesData);
    };

    const generateCategoryData = () => {
      const categories: SalesByCategory[] = [
        { category: "Electronics", sales: 42, color: "#4f46e5" },
        { category: "Clothing", sales: 28, color: "#06b6d4" },
        { category: "Home & Kitchen", sales: 15, color: "#10b981" },
        { category: "Health & Beauty", sales: 10, color: "#f59e0b" },
        { category: "Other", sales: 5, color: "#6b7280" },
      ];

      setCategoriesChartData(categories);
    };

    generateSalesData();
    generateCategoryData();
  }, [chartPeriod]);

  // Table definitions
  const orderColumns = [
    {
      header: "Order ID",
      accessor: "id",
      cellStyle: "text-indigo-600 font-medium",
    },
    {
      header: "Customer",
      accessor: "customer",
    },
    {
      header: "Date",
      accessor: "date",
    },
    {
      header: "Status",
      accessor: "status",
      Cell: ({ value }: { value: string }) => (
        <Badge variant={getStatusVariant(value)}>{value}</Badge>
      ),
    },
    {
      header: "Amount",
      accessor: "amount",
    },
  ];

  const productColumns = [
    {
      header: "Product",
      accessor: "name",
      cellStyle: "font-medium",
    },
    {
      header: "Sales",
      accessor: "sales",
    },
    {
      header: "Revenue",
      accessor: "revenue",
    },
    {
      header: "Stock",
      accessor: "inventory",
      Cell: ({ value }: { value: number }) => (
        <Badge variant={value < 20 ? "error" : "success"}>{value}</Badge>
      ),
    },
  ];

  // Stats cards data
  const statsCards = [
    {
      title: "Today's Revenue",
      value: "$1,245.89",
      icon: <DollarSign className="w-6 h-6" />,
      trend: { value: 8.2, isPositive: true, text: "vs yesterday" },
      iconBgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      title: "Orders Completed",
      value: "24",
      icon: <CheckCircle className="w-6 h-6" />,
      trend: { value: 4.7, isPositive: true, text: "vs yesterday" },
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "New Customers",
      value: "8",
      icon: <Users className="w-6 h-6" />,
      trend: { value: 12.5, isPositive: true, text: "vs yesterday" },
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Low Stock Items",
      value: "12",
      icon: <Package className="w-6 h-6" />,
      trend: { value: 3, isPositive: false, text: "items need restock" },
      iconBgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  // Time period options for charts
  const timePeriodOptions = [
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "year", label: "This Year" },
  ];

  // Helper function to determine badge variant
  const getStatusVariant = (
    status: string
  ): "success" | "warning" | "info" | "error" | "default" => {
    switch (status) {
      case "Completed":
        return "success";
      case "Processing":
        return "info";
      case "Shipped":
        return "info";
      case "Pending":
        return "warning";
      default:
        return "default";
    }
  };

  // Chart configurations
  const salesChartConfig = {
    type: "bar",
    data: {
      labels: salesChartData.map((item) => item.day),
      datasets: [
        {
          label: "Revenue",
          data: salesChartData.map((item) => item.sales),
          backgroundColor: "rgba(79, 70, 229, 0.8)",
          borderColor: "rgba(79, 70, 229, 1)",
          borderWidth: 1,
        },
        {
          label: "Orders",
          data: salesChartData.map((item) => item.orders * 50), // Scale up for visibility
          backgroundColor: "rgba(16, 185, 129, 0.8)",
          borderColor: "rgba(16, 185, 129, 1)",
          borderWidth: 1,
          type: "line",
          yAxisID: "orders",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Revenue ($)",
          },
        },
        orders: {
          position: "right",
          beginAtZero: true,
          title: {
            display: true,
            text: "Orders",
          },
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    },
  };

  const categoryChartConfig = {
    type: "doughnut",
    data: {
      labels: categoriesChartData.map((item) => item.category),
      datasets: [
        {
          data: categoriesChartData.map((item) => item.sales),
          backgroundColor: categoriesChartData.map((item) => item.color),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
      cutout: "70%",
    },
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Over Time Chart */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Sales Performance"
            icon={<BarChart2 className="w-5 h-5" />}
            tabs={timePeriodOptions}
            activeTab={chartPeriod}
            onTabChange={(tab) =>
              setChartPeriod(tab as "week" | "month" | "year")
            }
            chartConfig={salesChartConfig}
            chartHeight={300}
          />
        </div>

        {/* Category Distribution Chart */}
        <div className="lg:col-span-1">
          <ChartCard
            title="Sales by Category"
            icon={<PieChart className="w-5 h-5" />}
            chartConfig={categoryChartConfig}
            chartHeight={300}
            footer={
              <div className="pt-2 text-sm text-gray-500 flex items-center justify-center">
                <span>Total Products: 247</span>
              </div>
            }
          />
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <DataTable
          title="Recent Orders"
          data={recentOrders}
          columns={orderColumns}
          actionButton={
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View all
            </Button>
          }
        />

        {/* Top Products */}
        <DataTable
          title="Top Selling Products"
          data={topProducts}
          columns={productColumns}
          actionButton={
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View all
            </Button>
          }
        />
      </div>

      {/* Order Activity Calendar */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">
              Order Activity
            </h2>
          </div>
          <TabGroup
            tabs={[
              { id: "day", label: "Today" },
              { id: "week", label: "This Week" },
              { id: "month", label: "This Month" },
            ]}
            activeTab="week"
            onTabChange={() => {}}
            size="sm"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-center h-64 text-gray-500">
            Calendar component will go here
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

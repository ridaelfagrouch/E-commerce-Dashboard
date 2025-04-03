import React, { useState, useEffect } from "react";
import {
  DollarSign,
  CheckCircle,
  Users,
  Package,
  BarChart2,
  PieChart,
} from "lucide-react";
import StatCard from "../../components/molecules/StatCard/StatCard";
import Badge from "../../components/atoms/Badge/Badge";
import Button from "../../components/atoms/Button/Button";
import DataTable from "../../components/organisms/DataTable/DataTable";
import ChartCard from "../../components/molecules/ChartCard/ChartCard";
import OrderActivity from "../../components/organisms/OrderActivity/OrderActivity";

// Types
interface Order {
  id: string;
  customer: string;
  date: string;
  status: OrderStatus;
  amount: string;
  amountValue: number;
}

type OrderStatus = "completed" | "processing" | "pending";

interface Product {
  name: string;
  sales: string;
  revenue: string;
  revenueValue: number;
  inventory: ProductInventoryStatus;
  stock: number;
}

type ProductInventoryStatus = "in_stock" | "low_stock" | "out_of_stock";

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

interface ColumnCell<T, K extends keyof T> {
  value: T[K];
  row?: T;
}

interface BaseColumn<T> {
  header: string;
  accessor: keyof T;
  cellStyle?: string;
}

interface ColumnWithCell<T, K extends keyof T> extends BaseColumn<T> {
  accessor: K;
  Cell: (props: ColumnCell<T, K>) => React.ReactElement;
}

interface ColumnWithoutCell<T> extends BaseColumn<T> {
  Cell?: never;
}

type Column<T> = ColumnWithCell<T, keyof T> | ColumnWithoutCell<T>;

// Add new interfaces for order activity
interface DailyOrderStats {
  date: string;
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: {
    completed: number;
    processing: number;
    pending: number;
  };
}

const Dashboard: React.FC = () => {
  // State for chart period selection
  const [chartPeriod, setChartPeriod] = useState<"week" | "month" | "year">(
    "week"
  );
  // State for calendar period selection
  const [calendarPeriod, setCalendarPeriod] = useState<
    "day" | "week" | "month"
  >("week");
  // State for responsive layout
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Add state for order activity
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [orderStats, setOrderStats] = useState<DailyOrderStats | null>(null);

  // Check for mobile view on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initially
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Sample data for demonstration
  const recentOrders = [
    {
      id: "#ORD-5289",
      customer: "John Smith",
      date: "2024-03-15",
      status: "completed",
      amount: "$128.50",
    },
    {
      id: "#ORD-5288",
      customer: "Emma Wilson",
      date: "2024-03-15",
      status: "processing",
      amount: "$74.99",
    },
    {
      id: "#ORD-5287",
      customer: "Michael Brown",
      date: "2024-03-14",
      status: "processing",
      amount: "$219.00",
    },
    {
      id: "#ORD-5286",
      customer: "Sarah Davis",
      date: "2024-03-14",
      status: "pending",
      amount: "$65.25",
    },
    {
      id: "#ORD-5285",
      customer: "James Johnson",
      date: "2024-03-14",
      status: "completed",
      amount: "$189.99",
    },
    {
      id: "#ORD-5284",
      customer: "Lisa Anderson",
      date: "2024-03-13",
      status: "processing",
      amount: "$95.50",
    },
    {
      id: "#ORD-5283",
      customer: "Robert Miller",
      date: "2024-03-13",
      status: "completed",
      amount: "$157.75",
    },
    {
      id: "#ORD-5282",
      customer: "Emily Taylor",
      date: "2024-03-13",
      status: "pending",
      amount: "$42.99",
    },
  ];

  const topProducts = [
    {
      name: "Wireless Earbuds Pro",
      sales: "1,234",
      revenue: "$24,680",
      revenueValue: 24680,
      inventory: "in_stock",
      stock: 156,
    },
    {
      name: "Ultra HD Smart Watch",
      sales: "987",
      revenue: "$29,610",
      revenueValue: 29610,
      inventory: "low_stock",
      stock: 23,
    },
    {
      name: "Premium Yoga Mat",
      sales: "865",
      revenue: "$17,300",
      revenueValue: 17300,
      inventory: "in_stock",
      stock: 89,
    },
    {
      name: "Organic Coffee Beans",
      sales: "754",
      revenue: "$15,080",
      revenueValue: 15080,
      inventory: "in_stock",
      stock: 245,
    },
    {
      name: "Smart Home Security Camera",
      sales: "698",
      revenue: "$34,900",
      revenueValue: 34900,
      inventory: "in_stock",
      stock: 112,
    },
    {
      name: "Fitness Tracking Band",
      sales: "645",
      revenue: "$12,900",
      revenueValue: 12900,
      inventory: "low_stock",
      stock: 18,
    },
    {
      name: "Portable Power Bank",
      sales: "589",
      revenue: "$8,835",
      revenueValue: 8835,
      inventory: "out_of_stock",
      stock: 0,
    },
    {
      name: "Noise-Canceling Headphones",
      sales: "534",
      revenue: "$32,040",
      revenueValue: 32040,
      inventory: "in_stock",
      stock: 67,
    },
    {
      name: "Ergonomic Office Chair",
      sales: "478",
      revenue: "$47,800",
      revenueValue: 47800,
      inventory: "in_stock",
      stock: 34,
    },
    {
      name: "Air Purifier Plus",
      sales: "456",
      revenue: "$36,480",
      revenueValue: 36480,
      inventory: "low_stock",
      stock: 15,
    },
    {
      name: "Smart LED Light Bulbs",
      sales: "423",
      revenue: "$6,345",
      revenueValue: 6345,
      inventory: "in_stock",
      stock: 289,
    },
    {
      name: "Wireless Charging Pad",
      sales: "398",
      revenue: "$5,970",
      revenueValue: 5970,
      inventory: "in_stock",
      stock: 178,
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

  // Sample order activity data (in real app, this would come from an API)
  const generateOrderStats = (date: Date): DailyOrderStats => {
    return {
      date: date.toISOString().split("T")[0],
      totalOrders: Math.floor(Math.random() * 50) + 10,
      totalRevenue: Math.floor(Math.random() * 5000) + 1000,
      ordersByStatus: {
        completed: Math.floor(Math.random() * 20) + 5,
        processing: Math.floor(Math.random() * 15) + 3,
        pending: Math.floor(Math.random() * 10) + 2,
      },
    };
  };

  // Table definitions
  const orderColumns: Column<Order>[] = [
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
      Cell: ({ value }: { value: OrderStatus }) => (
        <Badge
          variant={
            value === "completed"
              ? "success"
              : value === "processing"
              ? "info"
              : "warning"
          }
        >
          {(value as string).charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      header: "Amount",
      accessor: "amount",
      cellStyle: "text-gray-900 font-medium",
    },
  ];

  const productColumns: Column<Product>[] = [
    {
      header: "Product",
      accessor: "name",
      cellStyle: "text-gray-900 font-medium",
    },
    {
      header: "Sales",
      accessor: "sales",
      cellStyle: "text-indigo-600 font-medium",
    },
    {
      header: "Revenue",
      accessor: "revenue",
      cellStyle: "text-green-600 font-medium",
    },
    {
      header: "Stock",
      accessor: "inventory",
      Cell: ({ value }: { value: ProductInventoryStatus }) => (
        <Badge
          variant={
            value === "in_stock"
              ? "success"
              : value === "low_stock"
              ? "warning"
              : "error"
          }
        >
          {value === "in_stock"
            ? "In Stock"
            : value === "low_stock"
            ? "Low Stock"
            : "Out of Stock"}
        </Badge>
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
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Revenue ($)",
          },
          ticks: {
            maxTicksLimit: isMobile ? 6 : 8,
          },
        },
        orders: {
          position: "right",
          beginAtZero: true,
          title: {
            display: !isMobile,
            text: "Orders",
          },
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            maxTicksLimit: isMobile ? 6 : 8,
          },
        },
        x: {
          ticks: {
            maxRotation: isMobile ? 45 : 0,
            minRotation: isMobile ? 45 : 0,
          },
        },
      },
      plugins: {
        legend: {
          position: isMobile ? "bottom" : "top",
          align: "center",
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
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          align: "center",
          labels: {
            padding: isMobile ? 10 : 20,
            boxWidth: isMobile ? 12 : 15,
          },
        },
      },
      layout: {
        padding: {
          top: 10,
          bottom: isMobile ? 0 : 10,
        },
      },
    },
  };

  // Function to handle date selection in calendar
  const handleCalendarDateSelect = (date: Date) => {
    setSelectedDate(date);
    setOrderStats(generateOrderStats(date));
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
            aspectRatio={isMobile ? 1.2 : 2}
          />
        </div>

        {/* Category Distribution Chart */}
        <div className="lg:col-span-1">
          <ChartCard
            title="Sales by Category"
            icon={<PieChart className="w-5 h-5" />}
            chartConfig={categoryChartConfig}
            chartHeight={300}
            aspectRatio={1}
            footer={
              <div className="pt-2 text-sm text-gray-500 flex items-center justify-center">
                <span>Total Products: 247</span>
              </div>
            }
          />
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="space-y-6">
        {/* Recent Orders */}
        <DataTable
          title="Recent Orders"
          data={recentOrders}
          columns={orderColumns}
          actionButton={
            <Button variant="ghost" className="text-sm">
              View all
            </Button>
          }
        />

        {/* Top Products */}
        <DataTable
          title="Top Products"
          data={topProducts}
          columns={productColumns}
          variant="product"
          actionButton={
            <Button variant="ghost" className="text-sm">
              View all
            </Button>
          }
        />
      </div>

      <OrderActivity
        period={calendarPeriod}
        onDateSelect={handleCalendarDateSelect}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  CheckCircle,
  Users,
  Package,
  BarChart2,
  PieChart,
  Edit,
  Eye,
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
}

interface BaseColumn<T> {
  id: string;
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

const Dashboard: React.FC = () => {
  // State for chart period selection
  const [chartPeriod, setChartPeriod] = useState<"week" | "month" | "year">(
    "week"
  );
  // State for responsive layout
  const [isMobile, setIsMobile] = useState<boolean>(false);

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
      status: "completed" as OrderStatus,
      amount: "$128.50",
    },
    {
      id: "#ORD-5288",
      customer: "Emma Wilson",
      date: "2024-03-15",
      status: "processing" as OrderStatus,
      amount: "$74.99",
    },
    {
      id: "#ORD-5287",
      customer: "Michael Brown",
      date: "2024-03-14",
      status: "processing" as OrderStatus,
      amount: "$219.00",
    },
    {
      id: "#ORD-5286",
      customer: "Sarah Davis",
      date: "2024-03-14",
      status: "pending" as OrderStatus,
      amount: "$65.25",
    },
    {
      id: "#ORD-5285",
      customer: "James Johnson",
      date: "2024-03-14",
      status: "completed" as OrderStatus,
      amount: "$189.99",
    },
    {
      id: "#ORD-5284",
      customer: "Lisa Anderson",
      date: "2024-03-13",
      status: "processing" as OrderStatus,
      amount: "$95.50",
    },
    {
      id: "#ORD-5283",
      customer: "Robert Miller",
      date: "2024-03-13",
      status: "completed" as OrderStatus,
      amount: "$157.75",
    },
    {
      id: "#ORD-5282",
      customer: "Emily Taylor",
      date: "2024-03-13",
      status: "pending" as OrderStatus,
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
      imageUrl:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Electronics",
    },
    {
      name: "Ultra HD Smart Watch",
      sales: "987",
      revenue: "$29,610",
      revenueValue: 29610,
      inventory: "low_stock",
      stock: 23,
      imageUrl:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Electronics",
    },
    {
      name: "Premium Yoga Mat",
      sales: "865",
      revenue: "$17,300",
      revenueValue: 17300,
      inventory: "in_stock",
      stock: 89,
      imageUrl:
        "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Fitness",
    },
    {
      name: "Organic Coffee Beans",
      sales: "754",
      revenue: "$15,080",
      revenueValue: 15080,
      inventory: "in_stock",
      stock: 245,
      imageUrl:
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Food & Beverage",
    },
    {
      name: "Smart Home Security Camera",
      sales: "698",
      revenue: "$34,900",
      revenueValue: 34900,
      inventory: "in_stock",
      stock: 112,
      imageUrl:
        "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Electronics",
    },
    {
      name: "Fitness Tracking Band",
      sales: "645",
      revenue: "$12,900",
      revenueValue: 12900,
      inventory: "low_stock",
      stock: 18,
      imageUrl:
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Electronics",
    },
    {
      name: "Portable Power Bank",
      sales: "589",
      revenue: "$8,835",
      revenueValue: 8835,
      inventory: "out_of_stock",
      stock: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1618410320928-25228d811631?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Electronics",
    },
    {
      name: "Premium Bluetooth Headphones",
      sales: "534",
      revenue: "$32,040",
      revenueValue: 32040,
      inventory: "in_stock",
      stock: 67,
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Electronics",
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
  const orderColumns: Column<Order>[] = [
    {
      id: "1",
      header: "Order ID",
      accessor: "id",
      cellStyle: "text-indigo-600 font-medium",
    },
    {
      id: "2",
      header: "Customer",
      accessor: "customer",
    },
    {
      id: "3",
      header: "Date",
      accessor: "date",
    },
    {
      id: "4",
      header: "Status",
      accessor: "status",
      Cell: (props: ColumnCell<Order, keyof Order>) => {
        const value = props.value as OrderStatus;
        const statusColors = {
          completed: { bg: "bg-green-100", text: "text-green-700" },
          processing: { bg: "bg-blue-100", text: "text-blue-700" },
          pending: { bg: "bg-yellow-100", text: "text-yellow-700" },
        };

        const colors = statusColors[value] || {
          bg: "bg-gray-100",
          text: "text-gray-700",
        };

        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      },
    },
    {
      id: "5",
      header: "Amount",
      accessor: "amount",
      cellStyle: "text-gray-900 font-medium",
    },
  ];

  // Stats cards data
  const statsCards = [
    {
      id: "1",
      title: "Today's Revenue",
      value: "$1,245.89",
      icon: <DollarSign className="w-6 h-6" />,
      trend: { value: 8.2, isPositive: true, text: "vs yesterday" },
      iconBgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      id: "2",
      title: "Orders Completed",
      value: "24",
      icon: <CheckCircle className="w-6 h-6" />,
      trend: { value: 4.7, isPositive: true, text: "vs yesterday" },
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: "3",
      title: "New Customers",
      value: "8",
      icon: <Users className="w-6 h-6" />,
      trend: { value: 12.5, isPositive: true, text: "vs yesterday" },
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "4",
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

  return (
    <div className="space-y-6 mb-6 mx-auto max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsCards.map((card) => (
          <StatCard
            key={card.id}
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
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-medium">Top Products</h2>
            <Button variant="ghost" className="text-sm">
              View all
            </Button>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {topProducts.map((product) => (
                <div
                  key={product.name}
                  className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.category}
                        </div>
                      </div>
                      <Badge
                        variant={
                          product.inventory === "in_stock"
                            ? "success"
                            : product.inventory === "low_stock"
                            ? "warning"
                            : "error"
                        }
                      >
                        {product.inventory === "in_stock"
                          ? "In Stock"
                          : product.inventory === "low_stock"
                          ? "Low Stock"
                          : "Out of Stock"}
                      </Badge>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-lg font-bold text-indigo-600">
                        {product.revenue}
                      </span>
                      <span className="text-sm text-gray-500">
                        {product.stock} in stock
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between text-sm text-gray-500">
                      <span>{product.sales} sales</span>
                      <span>#{product.name.slice(0, 8)}</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        leftIcon={<Edit size={16} />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        leftIcon={<Eye size={16} />}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <OrderActivity />
    </div>
  );
};

export default Dashboard;

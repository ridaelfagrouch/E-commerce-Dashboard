import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
import EditProduct from "../../components/organisms/ProductForms/EditProduct";
import ViewProduct from "../../components/organisms/ProductForms/ViewProduct";
import { Product } from "../../types/Product";

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
  const { t } = useTranslation();
  // State for chart period selection
  const [chartPeriod, setChartPeriod] = useState<"week" | "month" | "year">(
    "week"
  );
  // State for responsive layout
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

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

  const topProducts: Product[] = [
    {
      id: "PRD-001",
      name: "Wireless Earbuds Pro",
      category: "Electronics",
      price: 99.99,
      stock: 38,
      sales: 1234,
      status: "Active",
      imageUrl:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      revenue: 24680,
      revenueValue: 24680,
      inventory: "in_stock",
    },
    {
      id: "PRD-002",
      name: "Ultra HD Smart Watch",
      category: "Electronics",
      price: 199.99,
      stock: 15,
      sales: 987,
      status: "Low Stock",
      imageUrl:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      revenue: 29610,
      revenueValue: 29610,
      inventory: "low_stock",
    },
    {
      id: "PRD-003",
      name: "Premium Yoga Mat",
      category: "Fitness",
      price: 49.99,
      stock: 52,
      sales: 865,
      status: "Active",
      imageUrl:
        "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      revenue: 17300,
      revenueValue: 17300,
      inventory: "in_stock",
    },
    {
      id: "PRD-004",
      name: "Organic Coffee Beans",
      category: "Food & Beverage",
      price: 24.99,
      stock: 125,
      sales: 754,
      status: "Active",
      imageUrl:
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      revenue: 15080,
      revenueValue: 15080,
      inventory: "in_stock",
    },
    {
      id: "PRD-005",
      name: "Leather Wallet",
      category: "Accessories",
      price: 59.99,
      stock: 28,
      sales: 698,
      status: "Active",
      imageUrl:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      revenue: 34900,
      revenueValue: 34900,
      inventory: "in_stock",
    },
    {
      id: "PRD-006",
      name: "Portable Bluetooth Speaker",
      category: "Electronics",
      price: 79.99,
      stock: 3,
      sales: 645,
      status: "Low Stock",
      imageUrl:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      revenue: 12900,
      revenueValue: 12900,
      inventory: "low_stock",
    },
    {
      id: "PRD-007",
      name: "Stainless Steel Water Bottle",
      category: "Lifestyle",
      price: 34.99,
      stock: 0,
      sales: 589,
      status: "Out of Stock",
      imageUrl:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      revenue: 8835,
      revenueValue: 8835,
      inventory: "out_of_stock",
    },
    {
      id: "PRD-008",
      name: "Wireless Charging Pad",
      category: "Electronics",
      price: 29.99,
      stock: 42,
      sales: 534,
      status: "Active",
      imageUrl:
        "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      revenue: 32040,
      revenueValue: 32040,
      inventory: "in_stock",
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
        {
          category: "dashboard.charts.electronics",
          sales: 42,
          color: "#4f46e5",
        },
        {
          category: "dashboard.charts.clothing",
          sales: 28,
          color: "#06b6d4",
        },
        {
          category: "dashboard.charts.home&kitchen",
          sales: 15,
          color: "#10b981",
        },
        {
          category: "dashboard.charts.health&beauty",
          sales: 10,
          color: "#f59e0b",
        },
        { category: "dashboard.charts.other", sales: 5, color: "#6b7280" },
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
      title: t("dashboard.stats.today_revenue"),
      value: "$1,245.89",
      icon: <DollarSign className="w-6 h-6" />,
      trend: {
        value: 8.2,
        isPositive: true,
        text: t("dashboard.stats.vs_yesterday"),
      },
      iconBgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      id: "2",
      title: t("dashboard.stats.orders_completed"),
      value: "24",
      icon: <CheckCircle className="w-6 h-6" />,
      trend: {
        value: 4.7,
        isPositive: true,
        text: t("dashboard.stats.vs_yesterday"),
      },
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: "3",
      title: t("dashboard.stats.new_customers"),
      value: "8",
      icon: <Users className="w-6 h-6" />,
      trend: {
        value: 12.5,
        isPositive: true,
        text: t("dashboard.stats.vs_yesterday"),
      },
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "4",
      title: t("dashboard.stats.low_stock"),
      value: "12",
      icon: <Package className="w-6 h-6" />,
      trend: {
        value: 3,
        isPositive: false,
        text: t("dashboard.stats.items_need_restock"),
      },
      iconBgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  // Time period options for charts
  const timePeriodOptions = [
    { id: "week", label: t("dashboard.charts.time_periods.this_week") },
    { id: "month", label: t("dashboard.charts.time_periods.this_month") },
    { id: "year", label: t("dashboard.charts.time_periods.this_year") },
  ];

  // Chart configurations
  const salesChartConfig = {
    type: "bar",
    data: {
      labels: salesChartData.map((item) => item.day),
      datasets: [
        {
          label: t("dashboard.charts.revenue"),
          data: salesChartData.map((item) => item.sales),
          backgroundColor: "rgba(79, 70, 229, 0.8)",
          borderColor: "rgba(79, 70, 229, 1)",
          borderWidth: 1,
        },
        {
          label: t("dashboard.charts.orders"),
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
            text: t("dashboard.charts.revenue") + " ($)",
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
            text: t("dashboard.charts.orders"),
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
      labels: categoriesChartData.map((item) => t(item.category)),
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

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    // Here you would typically make an API call to update the product
    console.log("Saving product:", updatedProduct);
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6 mb-6 mx-auto max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
        <p className="text-gray-500">{t("dashboard.welcome")}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
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
            title={t("dashboard.charts.sales_performance")}
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
            title={t("dashboard.charts.sales_by_category")}
            icon={<PieChart className="w-5 h-5" />}
            chartConfig={categoryChartConfig}
            chartHeight={300}
            aspectRatio={1}
            footer={
              <div className="pt-2 text-sm text-gray-500 flex items-center justify-center">
                <span>{t("dashboard.charts.total_products")}: 247</span>
              </div>
            }
          />
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="space-y-6">
        {/* Recent Orders */}
        <DataTable
          title={t("dashboard.charts.recent_orders")}
          data={recentOrders}
          columns={orderColumns}
          actionButton={
            <Button variant="ghost" className="text-sm">
              {t("dashboard.charts.view_all")}
            </Button>
          }
        />

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-medium">
              {t("dashboard.charts.top_products")}
            </h2>
            <Button variant="ghost" className="text-sm">
              {t("dashboard.charts.view_all")}
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
                          ? t("dashboard.product_status.in_stock")
                          : product.inventory === "low_stock"
                          ? t("dashboard.product_status.low_stock")
                          : t("dashboard.product_status.out_of_stock")}
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
                        onClick={() => handleEditProduct(product)}
                      >
                        {t("dashboard.actions.edit")}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        leftIcon={<Eye size={16} />}
                        onClick={() => handleViewProduct(product)}
                      >
                        {t("dashboard.actions.view")}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isEditModalOpen && selectedProduct && (
        <EditProduct
          product={selectedProduct}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProduct}
        />
      )}
      {isViewModalOpen && selectedProduct && (
        <ViewProduct
          product={selectedProduct}
          onClose={() => setIsViewModalOpen(false)}
        />
      )}

      <OrderActivity />
    </div>
  );
};

export default Dashboard;

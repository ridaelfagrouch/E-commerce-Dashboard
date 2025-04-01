import React from "react";
import {
  DollarSign,
  CheckCircle,
  Users,
  Package,
  TrendingUp,
} from "lucide-react";
import StatCard from "../../components/molecules/StatCard/StatCard";
import Badge from "../../components/atoms/Badge/Badge";
import Button from "../../components/atoms/Button/Button";

interface Order {
  id: string;
  customer: string;
  date: string;
  status: "Completed" | "Processing" | "Shipped" | "Pending";
  amount: string;
}

interface Product {
  name: string;
  sales: number;
  revenue: string;
  inventory: number;
}

const Dashboard: React.FC = () => {
  // Sample data for demonstration
  const recentOrders: Order[] = [
    {
      id: "#ORD-5289",
      customer: "Sarah Johnson",
      date: "Apr 1, 2025",
      status: "Completed",
      amount: "$128.50",
    },
    {
      id: "#ORD-5288",
      customer: "Michael Chen",
      date: "Apr 1, 2025",
      status: "Processing",
      amount: "$74.99",
    },
    {
      id: "#ORD-5287",
      customer: "Emma Rodriguez",
      date: "Mar 31, 2025",
      status: "Shipped",
      amount: "$219.00",
    },
    {
      id: "#ORD-5286",
      customer: "Daniel Kim",
      date: "Mar 31, 2025",
      status: "Pending",
      amount: "$65.25",
    },
  ];

  const topProducts: Product[] = [
    {
      name: "Wireless Earbuds Pro",
      sales: 124,
      revenue: "$12,400",
      inventory: 38,
    },
    {
      name: "Ultra HD Smart Watch",
      sales: 98,
      revenue: "$19,600",
      inventory: 15,
    },
    { name: "Premium Yoga Mat", sales: 87, revenue: "$4,350", inventory: 52 },
    {
      name: "Organic Coffee Beans",
      sales: 76,
      revenue: "$1,900",
      inventory: 125,
    },
  ];

  // Get status variant mapping for Badge component
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

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <StatCard
          title="Today's Revenue"
          value="$1,245.89"
          icon={<DollarSign className="w-6 h-6" />}
          trend={{ value: 8.2, isPositive: true, text: "vs yesterday" }}
          iconBgColor="bg-indigo-100"
          iconColor="text-indigo-600"
        />

        <StatCard
          title="Orders Completed"
          value="24"
          icon={<CheckCircle className="w-6 h-6" />}
          trend={{ value: 4.7, isPositive: true, text: "vs yesterday" }}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />

        <StatCard
          title="New Customers"
          value="8"
          icon={<Users className="w-6 h-6" />}
          trend={{ value: 12.5, isPositive: true, text: "vs yesterday" }}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Low Stock Items"
          value="12"
          icon={<Package className="w-6 h-6" />}
          trend={{ value: 3, isPositive: false, text: "items need restock" }}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Orders
            </h2>
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<TrendingUp className="w-4 h-4" />}
            >
              View all
            </Button>
          </div>
          <div className="overflow-x-auto">
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
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Top Selling Products
            </h2>
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<TrendingUp className="w-4 h-4" />}
            >
              View all
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sales}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.revenue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={product.inventory < 20 ? "error" : "success"}
                      >
                        {product.inventory}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

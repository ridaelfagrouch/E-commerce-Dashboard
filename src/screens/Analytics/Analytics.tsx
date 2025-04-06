import React, { useEffect, useRef, useState } from "react";
import { Calendar, Download } from "lucide-react";
import Button from "../../components/atoms/Button/Button";
import Chart, { Scale, CoreScaleOptions } from "chart.js/auto";
import "leaflet/dist/leaflet.css";
import StatsGrid from "../../components/organisms/StatsGrid/StatsGrid";
import OrdersSection from "../../components/organisms/OrdersSection/OrdersSection";
import TrafficAnalytics from "../../components/organisms/TrafficAnalytics/TrafficAnalytics";
import UnfulfilledOrdersTable from "../../components/organisms/UnfulfilledOrdersTable/UnfulfilledOrdersTable";
import ExportModal from "../../components/organisms/ExportModal/ExportModal";

interface UnfulfilledOrder {
  orderNumber: string;
  customerName: string;
  orderDate: string;
  paymentStatus:
    | "paid"
    | "pending"
    | "failed"
    | "refunded"
    | "partially_refunded";
  totalPrice: string;
  items: number;
  tags?: string[];
  priority: "high" | "medium" | "low";
}

interface BestSeller {
  name: string;
  count: number;
}

interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  trend: number;
}

interface VisitorLocation {
  id: string;
  country: string;
  city: string;
  visitors: number;
  latitude: number;
  longitude: number;
}

const Analytics: React.FC = () => {
  const [showExportModal, setShowExportModal] = useState(false);
  const salesChartRef = useRef<HTMLCanvasElement | null>(null);
  const salesChartInstance = useRef<Chart | null>(null);

  // Sample data
  const salesData = {
    today: 17700,
    trend: -5.7,
    weeklyData: [15000, 13000, 16000, 15500, 16500],
    labels: ["1 Feb", "2 Feb", "3 Feb", "4 Feb", "5 Feb"],
  };

  const aovData = {
    value: 35.38,
    min: 0,
    max: 90,
  };

  const bestSellers: BestSeller[] = [
    { name: "Rouge lipstick", count: 278 },
    { name: "Honey lipstick", count: 211 },
    { name: "Max mascara", count: 115 },
    { name: "Lip tint", count: 103 },
    { name: "Brow beautiful", count: 87 },
  ];

  const unfulfilledOrders: UnfulfilledOrder[] = [
    {
      orderNumber: "#ORD-2024-1876",
      customerName: "Sarah Johnson",
      orderDate: "2024-03-15T09:23:00",
      paymentStatus: "paid",
      totalPrice: "$234.99",
      items: 3,
      tags: ["Express", "International"],
      priority: "high",
    },
    {
      orderNumber: "#ORD-2024-1875",
      customerName: "Michael Chen",
      orderDate: "2024-03-15T09:15:00",
      paymentStatus: "paid",
      totalPrice: "$189.50",
      items: 2,
      tags: ["Fragile"],
      priority: "medium",
    },
    {
      orderNumber: "#ORD-2024-1873",
      customerName: "Emma Davis",
      orderDate: "2024-03-15T08:45:00",
      paymentStatus: "partially_refunded",
      totalPrice: "$567.25",
      items: 5,
      tags: ["Priority"],
      priority: "high",
    },
    {
      orderNumber: "#ORD-2024-1872",
      customerName: "Alex Thompson",
      orderDate: "2024-03-15T08:30:00",
      paymentStatus: "pending",
      totalPrice: "$432.75",
      items: 4,
      tags: ["Urgent", "Express"],
      priority: "high",
    },
    {
      orderNumber: "#ORD-2024-1871",
      customerName: "Maria Garcia",
      orderDate: "2024-03-15T08:15:00",
      paymentStatus: "failed",
      totalPrice: "$156.80",
      items: 1,
      tags: ["International"],
      priority: "low",
    },
    {
      orderNumber: "#ORD-2024-1870",
      customerName: "James Wilson",
      orderDate: "2024-03-15T08:00:00",
      paymentStatus: "paid",
      totalPrice: "$789.99",
      items: 6,
      tags: ["Fragile", "Priority"],
      priority: "medium",
    },
    {
      orderNumber: "#ORD-2024-1869",
      customerName: "Sophie Martin",
      orderDate: "2024-03-15T07:45:00",
      paymentStatus: "pending",
      totalPrice: "$345.50",
      items: 3,
      tags: ["Express"],
      priority: "medium",
    },
    {
      orderNumber: "#ORD-2024-1868",
      customerName: "David Lee",
      orderDate: "2024-03-15T07:30:00",
      paymentStatus: "refunded",
      totalPrice: "$234.25",
      items: 2,
      tags: ["International", "Fragile"],
      priority: "low",
    },
    {
      orderNumber: "#ORD-2024-1867",
      customerName: "Emily Brown",
      orderDate: "2024-03-15T07:15:00",
      paymentStatus: "paid",
      totalPrice: "$678.00",
      items: 5,
      tags: ["Urgent", "Priority"],
      priority: "high",
    },
    {
      orderNumber: "#ORD-2024-1866",
      customerName: "Lucas Anderson",
      orderDate: "2024-03-15T07:00:00",
      paymentStatus: "partially_refunded",
      totalPrice: "$445.75",
      items: 4,
      tags: ["Express", "International"],
      priority: "medium",
    },
  ];

  const cancellationData = {
    total: 15,
    change: 67,
    reasons: [
      { reason: "customer", count: 9 },
      { reason: "declined", count: 2 },
      { reason: "fraud", count: 2 },
      { reason: "inventory", count: 2 },
    ],
  };

  const ordersData = {
    today: 156,
    todayTrend: 12.5,
    thisMonth: 3245,
    monthlyTrend: 8.2,
    monthlyData: [
      120, 145, 132, 156, 142, 138, 152, 148, 156, 142, 138, 152, 148, 156, 165,
      158, 162, 148, 152, 158, 162, 168, 172, 165, 170, 175, 168, 172, 178, 182,
    ],
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
  };

  const trafficSources: TrafficSource[] = [
    { source: "Direct", visitors: 12450, percentage: 35, trend: 12.3 },
    { source: "Organic Search", visitors: 8320, percentage: 28, trend: 8.7 },
    { source: "Social Media", visitors: 6240, percentage: 20, trend: 15.2 },
    { source: "Referral", visitors: 3120, percentage: 12, trend: -3.5 },
    { source: "Email", visitors: 1560, percentage: 5, trend: 5.8 },
  ];

  const visitorLocations: VisitorLocation[] = [
    {
      id: "1",
      country: "United States",
      city: "New York",
      visitors: 245,
      latitude: 40.7128,
      longitude: -74.006,
    },
    {
      id: "2",
      country: "United Kingdom",
      city: "London",
      visitors: 189,
      latitude: 51.5074,
      longitude: -0.1278,
    },
    {
      id: "3",
      country: "Japan",
      city: "Tokyo",
      visitors: 156,
      latitude: 35.6762,
      longitude: 139.6503,
    },
    {
      id: "4",
      country: "Germany",
      city: "Berlin",
      visitors: 132,
      latitude: 52.52,
      longitude: 13.405,
    },
    {
      id: "5",
      country: "Australia",
      city: "Sydney",
      visitors: 98,
      latitude: -33.8688,
      longitude: 151.2093,
    },
  ];

  const handleExportData = () => {
    setShowExportModal(true);
  };

  const handleExport = (format: string, dateRange: string) => {
    // Implement the actual export logic here
    console.log(`Exporting data in ${format} format for ${dateRange}`);
    // You can add the actual export implementation here
  };

  // Initialize sales chart
  useEffect(() => {
    if (!salesChartRef.current) return;

    if (salesChartInstance.current) {
      salesChartInstance.current.destroy();
    }

    const ctx = salesChartRef.current.getContext("2d");
    if (!ctx) return;

    salesChartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: salesData.labels,
        datasets: [
          {
            data: salesData.weeklyData,
            borderColor: "#3B82F6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            fill: true,
            tension: 0.4,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            grid: {
              color: "rgba(75, 85, 99, 0.2)",
            },
            ticks: {
              color: "#9CA3AF",
              callback: function (
                this: Scale<CoreScaleOptions>,
                tickValue: number | string
              ) {
                return `$${Number(tickValue) / 1000}K`;
              },
            },
            min: 0,
            max: 20000,
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#9CA3AF",
            },
          },
        },
      },
    });

    return () => {
      if (salesChartInstance.current) {
        salesChartInstance.current.destroy();
      }
    };
  }, [salesData]);

  return (
    <div className="container mx-auto mb-6  max-w-7xl">
      <div className="space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-sm sm:text-base text-gray-500 mt-1">
              Track your store's performance
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <Button
              variant="secondary"
              leftIcon={<Calendar className="w-4 h-4" />}
              onClick={() => {}}
              className="w-full sm:w-auto justify-center"
            >
              Last 7 days
            </Button>
            <Button
              variant="secondary"
              leftIcon={<Download className="w-4 h-4" />}
              onClick={handleExportData}
              className="w-full sm:w-auto justify-center"
            >
              Export
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsGrid
          salesData={salesData}
          aovData={aovData}
          bestSellers={bestSellers}
          cancellations={cancellationData}
        />

        {/* Orders Section */}
        <OrdersSection data={ordersData} />

        {/* Traffic Analytics */}
        <TrafficAnalytics
          trafficSources={trafficSources}
          visitorLocations={visitorLocations}
        />

        {/* Unfulfilled Orders Table */}
        <UnfulfilledOrdersTable
          orders={unfulfilledOrders}
          onFilter={() => {}}
          onPrevious={() => {}}
          onNext={() => {}}
        />

        {/* Export Modal */}
        {showExportModal && (
          <ExportModal
            onClose={() => setShowExportModal(false)}
            onExport={handleExport}
          />
        )}
      </div>
    </div>
  );
};

export default Analytics;

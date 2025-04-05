import React from "react";
import { DollarSign, ShoppingCart, TrendingUp, Star } from "lucide-react";
import LineChartCard from "../../molecules/LineChartCard/LineChartCard";
import GaugeChart from "../../molecules/GaugeChart/GaugeChart";

interface SalesData {
  today: number;
  trend: number;
  weeklyData: number[];
  labels: string[];
}

interface StatsGridProps {
  salesData: SalesData;
  aovData: {
    value: number;
    min: number;
    max: number;
  };
  bestSellers: Array<{
    name: string;
    count: number;
  }>;
  cancellations: {
    total: number;
    change: number;
    reasons: Array<{
      reason: string;
      count: number;
    }>;
  };
}

const StatsGrid: React.FC<StatsGridProps> = ({
  salesData,
  aovData,
  bestSellers,
  cancellations,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Sales Card */}
      <LineChartCard
        title="Sales"
        value={`$${(salesData.today / 1000).toFixed(1)}K`}
        trend={salesData.trend}
        data={salesData.weeklyData}
        labels={salesData.labels}
        icon={DollarSign}
        iconBgColor="bg-blue-50"
        iconColor="text-blue-600"
        chartColor="#3B82F6"
      />

      {/* AOV Card */}
      <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-shadow duration-300 p-4 sm:p-6">
        <div className="flex justify-between items-start mb-2 sm:mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500">
              Average Order Value
            </p>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">
              ${aovData.value.toFixed(2)}
            </h3>
          </div>
          <div className="bg-indigo-50 p-2 rounded-lg shadow-sm flex-shrink-0 ml-3">
            <ShoppingCart className="w-5 h-5 text-indigo-600" />
          </div>
        </div>
        <div className="mt-3 sm:mt-6 w-full max-w-[160px] sm:max-w-[180px] mx-auto">
          <GaugeChart
            value={aovData.value}
            min={aovData.min}
            max={aovData.max}
            height={80}
            color="rgba(79, 70, 229, 0.9)"
          />
        </div>
      </div>

      {/* Best Sellers Card */}
      <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-shadow duration-300 p-4 sm:p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Best Sellers</p>
          </div>
          <div className="bg-green-50 p-2 rounded-lg shadow-sm">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
        </div>
        <div className="space-y-3">
          {bestSellers.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="text-sm text-gray-600">{item.name}</span>
              <span className="text-sm font-medium text-gray-900">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cancellations Card */}
      <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-shadow duration-300 p-4 sm:p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Cancellations</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
              {cancellations.total}
            </h3>
          </div>
          <div className="bg-red-50 p-2 rounded-lg shadow-sm">
            <Star className="w-5 h-5 text-red-600" />
          </div>
        </div>
        <div className="flex items-center text-sm mb-4 p-2 rounded-md bg-red-50/50">
          <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
          <span className="text-red-500 font-medium">
            {cancellations.change}%
          </span>
          <span className="text-gray-500 ml-1">vs. last month</span>
        </div>
        <div className="space-y-2">
          {cancellations.reasons.map((reason, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="text-sm text-gray-600">{reason.reason}</span>
              <span className="text-sm font-medium text-gray-900">
                {reason.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    text?: string;
  };
  iconBgColor?: string;
  iconColor?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  iconBgColor = "bg-indigo-100",
  iconColor = "text-indigo-600",
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-lg shadow p-4 sm:p-6 ${className}`}>
      <div className="flex items-center">
        <div
          className={`p-3 rounded-full ${iconBgColor} ${iconColor} mr-4 flex-shrink-0`}
        >
          {icon}
        </div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-xl sm:text-2xl font-semibold text-gray-800">
            {value}
          </p>
          {trend && (
            <p
              className={`text-sm flex items-center ${
                trend.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend.isPositive ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {trend.value}%{" "}
              {trend.text || (trend.isPositive ? "increase" : "decrease")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 sm:p-6 h-full ${className}`}
    >
      <div className="flex items-start">
        <div
          className={`p-3 rounded-full ${iconBgColor} ${iconColor} mr-4 flex-shrink-0`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 text-sm mb-1">{t(title)}</p>
          <p className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            {value}
          </p>
          {trend && (
            <div
              className={`text-sm flex flex-wrap items-center ${
                trend.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              <span className="flex items-center">
                {trend.isPositive ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {trend.value}%
              </span>
              <span className="ml-1 whitespace-normal">
                {trend.text
                  ? t(trend.text)
                  : t(trend.isPositive ? "common.increase" : "common.decrease")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;

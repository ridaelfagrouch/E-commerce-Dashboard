import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TrendProps {
  value: number;
  suffix?: string;
  className?: string;
}

const Trend: React.FC<TrendProps> = ({
  value,
  suffix = "vs. last period",
  className = "",
}) => {
  const isPositive = value >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;
  const colorClass = isPositive ? "text-green-500" : "text-red-500";

  return (
    <div className={`flex items-center text-sm ${className}`}>
      <Icon className={`w-4 h-4 ${colorClass} mr-1`} />
      <span className={`font-medium ${colorClass}`}>
        {isPositive ? "+" : ""}
        {Math.abs(value)}%
      </span>
      {suffix && <span className="text-gray-500 ml-1">{suffix}</span>}
    </div>
  );
};

export default Trend;

import React from "react";

interface StatNumberProps {
  value: string | number;
  label: string;
  className?: string;
}

const StatNumber: React.FC<StatNumberProps> = ({
  value,
  label,
  className = "",
}) => {
  return (
    <div className={className}>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
    </div>
  );
};

export default StatNumber;

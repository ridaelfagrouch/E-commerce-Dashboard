import React from "react";
import Button from "../../atoms/Button/Button";

export interface FilterOption {
  id: string;
  label: string;
  color?: string;
}

interface FilterButtonGroupProps {
  options: FilterOption[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
  className?: string;
}

const FilterButtonGroup: React.FC<FilterButtonGroupProps> = ({
  options,
  activeFilter,
  onFilterChange,
  className = "",
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-indigo-100 text-indigo-800";
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option) => (
        <Button
          key={option.id}
          variant="filter"
          size="sm"
          isActive={activeFilter === option.id}
          activeColor={option.color || getStatusColor(option.id)}
          onClick={() => onFilterChange(option.id)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtonGroup;

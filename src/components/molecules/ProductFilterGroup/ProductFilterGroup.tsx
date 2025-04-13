import React from "react";
import Button from "../../atoms/Button/Button";
import { useTranslation } from "react-i18next";

export interface FilterOption {
  id: string;
  label: string;
}

interface ProductFilterGroupProps {
  options: FilterOption[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
  className?: string;
}

const ProductFilterGroup: React.FC<ProductFilterGroupProps> = ({
  options,
  activeFilter,
  onFilterChange,
  className = "",
}) => {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option) => (
        <Button
          key={option.id}
          variant="filter"
          size="sm"
          isActive={activeFilter === option.id}
          onClick={() => onFilterChange(option.id)}
        >
          {t(option.label)}
        </Button>
      ))}
    </div>
  );
};

export default ProductFilterGroup;

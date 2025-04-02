import React from "react";

type FilterButtonProps = {
  children: React.ReactNode;
  active: boolean;
  activeColor: string;
  onClick: () => void;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  children,
  active,
  activeColor,
  onClick,
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-md ${active ? activeColor : "bg-gray-100"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FilterButton;

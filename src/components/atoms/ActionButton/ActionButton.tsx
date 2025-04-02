import React from "react";

type ActionButtonProps = {
  icon?: React.ReactNode;
  label: string;
  variant: "primary" | "secondary" | "outline";
  onClick: () => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  variant,
  onClick,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-indigo-600 text-white";
      case "secondary":
        return "bg-gray-200 text-gray-800";
      case "outline":
        return "bg-transparent border border-indigo-600 text-indigo-600";
      default:
        return "bg-indigo-600 text-white";
    }
  };

  return (
    <button
      className={`${getVariantClasses()} px-4 py-2 rounded-md flex items-center gap-2`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
};

export default ActionButton;

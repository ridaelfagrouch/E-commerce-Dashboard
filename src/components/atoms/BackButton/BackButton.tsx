import React from "react";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  label = "Settings",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 bg-white hover:bg-indigo-50 rounded-lg border border-gray-200 hover:border-indigo-100 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      aria-label={`Go back to ${label}`}
    >
      <ChevronLeft className="w-5 h-5 mr-1.5 text-gray-500 group-hover:text-indigo-500 transition-colors" />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;

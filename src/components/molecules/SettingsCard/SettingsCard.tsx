import React from "react";
import { ChevronRight } from "lucide-react";

interface SettingsCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  description,
  icon,
  children,
  onClick,
}) => {
  const isClickable = !!onClick;

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden ${
        isClickable ? "cursor-pointer hover:border-gray-200" : ""
      }`}
      onClick={onClick}
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-start gap-4">
          {icon && (
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                {icon}
              </div>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                {title}
              </h3>
              {isClickable && (
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </div>
            {description && (
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            )}
            {children && <div className="mt-4">{children}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsCard;

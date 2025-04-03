import React from "react";

interface TabProps {
  tabs: Array<{ id: string; label: string }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  size?: "sm" | "md" | "lg";
}

const TabGroup: React.FC<TabProps> = ({
  tabs,
  activeTab,
  onTabChange,
  size = "md",
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xs px-2 py-1";
      case "md":
        return "text-sm px-3 py-1.5";
      case "lg":
        return "text-base px-4 py-2";
      default:
        return "text-sm px-3 py-1.5";
    }
  };

  return (
    <div className="flex bg-gray-100 rounded-md p-0.5">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${getSizeClasses()} rounded-md transition-colors ${
            activeTab === tab.id
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabGroup;

import React, { useState, useEffect, useRef } from "react";
import { Filter, ChevronDown } from "lucide-react";
import Button from "../../atoms/Button/Button";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

interface OrderFilterDropdownProps {
  onFilter: (filters: {
    status: string[];
    priority: string[];
    tags: string[];
  }) => void;
}

const OrderFilterDropdown: React.FC<OrderFilterDropdownProps> = ({
  onFilter,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    flipped: false,
  });
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const DROPDOWN_MAX_HEIGHT = 480; // Maximum height of the dropdown
  const MARGIN = 16; // Margin from edges of the screen

  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 288; // w-72 = 18rem = 288px
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - rect.bottom;
      const spaceAbove = rect.top;

      // Calculate left position to align with button's right edge
      let left = rect.right - dropdownWidth;

      // Ensure dropdown doesn't go off screen on the left
      left = Math.max(MARGIN, left);

      // If it would go off screen on the right, align with right edge of viewport
      if (left + dropdownWidth > window.innerWidth - MARGIN) {
        left = window.innerWidth - dropdownWidth - MARGIN;
      }

      // Check if we need to flip the dropdown
      const shouldFlip =
        spaceBelow < DROPDOWN_MAX_HEIGHT && spaceAbove > spaceBelow;

      setDropdownPosition({
        top: shouldFlip
          ? rect.top + window.scrollY - DROPDOWN_MAX_HEIGHT - 8 // 8px spacing
          : rect.bottom + window.scrollY + 8,
        left,
        flipped: shouldFlip,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };

    const handleResize = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const handleToggleDropdown = () => {
    if (!isOpen) {
      updateDropdownPosition();
    }
    setIsOpen(!isOpen);
  };

  const statusOptions = [
    {
      value: "paid",
      label: t("analytics.unfulfilledOrders.paymentStatus.paid"),
    },
    {
      value: "pending",
      label: t("analytics.unfulfilledOrders.paymentStatus.pending"),
    },
    {
      value: "failed",
      label: t("analytics.unfulfilledOrders.paymentStatus.failed"),
    },
    {
      value: "refunded",
      label: t("analytics.unfulfilledOrders.paymentStatus.refunded"),
    },
    {
      value: "partially_refunded",
      label: t("analytics.unfulfilledOrders.paymentStatus.partially_refunded"),
    },
  ];

  const priorityOptions = [
    {
      value: "high",
      label:
        t("analytics.unfulfilledOrders.priority.high") +
        " " +
        t("analytics.unfulfilledOrders.columns.priority"),
    },
    {
      value: "medium",
      label:
        t("analytics.unfulfilledOrders.priority.medium") +
        " " +
        t("analytics.unfulfilledOrders.columns.priority"),
    },
    {
      value: "low",
      label:
        t("analytics.unfulfilledOrders.priority.low") +
        " " +
        t("analytics.unfulfilledOrders.columns.priority"),
    },
  ];

  const tagOptions = [
    {
      value: "urgent",
      label: t("analytics.unfulfilledOrders.filters.tagOptions.urgent"),
    },
    {
      value: "express",
      label: t("analytics.unfulfilledOrders.filters.tagOptions.express"),
    },
    {
      value: "international",
      label: t("analytics.unfulfilledOrders.filters.tagOptions.international"),
    },
    {
      value: "fragile",
      label: t("analytics.unfulfilledOrders.filters.tagOptions.fragile"),
    },
    {
      value: "priority",
      label: t("analytics.unfulfilledOrders.filters.tagOptions.priority"),
    },
  ];

  const handleToggleStatus = (value: string) => {
    setSelectedStatus((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleTogglePriority = (value: string) => {
    setSelectedPriority((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleToggleTag = (value: string) => {
    setSelectedTags((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleApplyFilters = () => {
    onFilter({
      status: selectedStatus,
      priority: selectedPriority,
      tags: selectedTags,
    });
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedStatus([]);
    setSelectedPriority([]);
    setSelectedTags([]);
    onFilter({ status: [], priority: [], tags: [] });
  };

  const totalFiltersSelected =
    selectedStatus.length + selectedPriority.length + selectedTags.length;

  return (
    <div className="relative" ref={buttonRef}>
      <Button
        variant="secondary"
        leftIcon={<Filter size={16} />}
        rightIcon={
          <ChevronDown
            size={14}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        }
        onClick={handleToggleDropdown}
        className="whitespace-nowrap"
      >
        {t("analytics.unfulfilledOrders.filters.title")}
        {totalFiltersSelected > 0 && (
          <span className="ml-1.5 px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
            {totalFiltersSelected}
          </span>
        )}
      </Button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className={`fixed w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-[999] ${
              dropdownPosition.flipped
                ? "flex flex-col-reverse"
                : "flex flex-col"
            }`}
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              maxHeight: `${DROPDOWN_MAX_HEIGHT}px`,
            }}
          >
            <div className="flex-1 overflow-y-auto">
              {/* Status Filter */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  {t("analytics.unfulfilledOrders.filters.status")}
                </h3>
                <div className="space-y-2">
                  {statusOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStatus.includes(option.value)}
                        onChange={() => handleToggleStatus(option.value)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  {t("analytics.unfulfilledOrders.filters.priority")}
                </h3>
                <div className="space-y-2">
                  {priorityOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPriority.includes(option.value)}
                        onChange={() => handleTogglePriority(option.value)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags Filter */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  {t("analytics.unfulfilledOrders.filters.tags")}
                </h3>
                <div className="space-y-2">
                  {tagOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(option.value)}
                        onChange={() => handleToggleTag(option.value)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 sticky bottom-0">
              <div className="flex justify-between items-center">
                <button
                  onClick={handleClearFilters}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {t("analytics.unfulfilledOrders.filters.clearAll")}
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t("analytics.unfulfilledOrders.filters.apply")}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default OrderFilterDropdown;

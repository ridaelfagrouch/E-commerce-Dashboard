import React, { useState, useRef, useEffect } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";

interface FilterButtonProps {
  onFilterSelect: (filter: string) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onFilterSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
  });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filterOptions = [
    { id: "all", label: "All Customers" },
    { id: "active", label: "Active Customers" },
    { id: "new", label: "New Customers" },
    { id: "inactive", label: "Inactive Customers" },
    { id: "high_value", label: "High Value (>$500)" },
    { id: "recent", label: "Recent Orders (30d)" },
  ];

  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 224; // w-56 = 14rem = 224px

      // Calculate left position to align with button's right edge
      let left = rect.right - dropdownWidth;

      // Ensure dropdown doesn't go off screen on the left
      left = Math.max(16, left); // Keep 16px margin from left edge

      // If it would go off screen on the right, align with right edge of viewport
      if (left + dropdownWidth > window.innerWidth - 16) {
        left = window.innerWidth - dropdownWidth - 16;
      }

      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: left,
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

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

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

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggleDropdown}
        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <Filter size={16} className="text-gray-500" />
        <span className="font-medium">Filters</span>
        <ChevronDown
          size={14}
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-[999]"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
            }}
          >
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onFilterSelect(option.id);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-[15px] text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
              >
                {option.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default FilterButton;

import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  name?: string;
  required?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  name,
  required = false,
}) => {
  const id = React.useId();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <div
      className={`relative flex items-start ${disabled ? "opacity-50" : ""}`}
    >
      <div className="flex items-center h-6">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          required={required}
          aria-describedby={description ? `${id}-description` : undefined}
          className="sr-only peer"
        />
        <button
          role="switch"
          aria-checked={checked}
          aria-labelledby={label ? `${id}-label` : undefined}
          tabIndex={disabled ? -1 : 0}
          onClick={() => !disabled && onChange(!checked)}
          onKeyDown={handleKeyDown}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ease-in-out duration-200 ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          } ${
            checked
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <span
            className={`${
              checked ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out`}
          />
          <span className="sr-only">{label}</span>
        </button>
      </div>
      {(label || description) && (
        <div className="ml-3">
          {label && (
            <div
              id={`${id}-label`}
              className="text-sm font-medium text-gray-900 select-none"
            >
              {label}
              {required && (
                <span className="ml-1 text-red-500" aria-hidden="true">
                  *
                </span>
              )}
            </div>
          )}
          {description && (
            <div
              id={`${id}-description`}
              className="text-sm text-gray-500 select-none"
            >
              {description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Switch;

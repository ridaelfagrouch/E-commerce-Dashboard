import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "filter";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isActive?: boolean;
  activeColor?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  isActive = false,
  activeColor,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "rounded-md flex items-center gap-2 font-medium transition-colors";

  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
    filter: isActive
      ? `${activeColor || "bg-indigo-100 text-indigo-800"}`
      : "bg-gray-100 hover:bg-gray-200",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {leftIcon && <span className="w-4 h-4">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="w-4 h-4">{rightIcon}</span>}
    </button>
  );
};

export default Button;

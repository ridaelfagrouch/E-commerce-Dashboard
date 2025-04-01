import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isFullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isFullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  ...rest
}) => {
  const baseClasses =
    "font-medium rounded focus:outline-none transition-colors";

  const variantClasses = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    outline: "border border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    ghost: "text-indigo-600 hover:bg-indigo-50",
    link: "text-indigo-600 hover:underline p-0",
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  };

  const widthClass = isFullWidth ? "w-full" : "";

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${variant !== "link" ? sizeClasses[size] : ""}
    ${widthClass}
    ${className}
    ${leftIcon || rightIcon ? "flex items-center justify-center" : ""}
  `;

  return (
    <button className={classes} {...rest}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;

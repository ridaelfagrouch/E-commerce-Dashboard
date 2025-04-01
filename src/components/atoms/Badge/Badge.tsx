import React from "react";

type BadgeVariant = "success" | "warning" | "error" | "info" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  children,
  className = "",
}) => {
  const baseClasses =
    "px-2 py-1 text-xs font-semibold rounded-full inline-flex items-center justify-center";

  const variantClasses = {
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    default: "bg-gray-200 text-gray-800",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return <span className={classes}>{children}</span>;
};

export default Badge;

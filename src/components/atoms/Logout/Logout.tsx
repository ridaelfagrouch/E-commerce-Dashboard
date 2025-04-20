import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost";
  text?: string;
  iconOnly?: boolean;
}

export default function LogoutButton({
  onClick = () => console.log("Logout clicked"),
  size = "md",
  variant = "primary",
  text = "Logout",
  iconOnly = false,
}: LogoutButtonProps) {
  // Size classes
  const sizeClasses = {
    sm: "text-xs px-2 py-1 gap-1",
    md: "text-sm px-3 py-2 gap-2",
    lg: "text-base px-4 py-2 gap-2",
  };

  // Icon size based on button size
  const iconSize = {
    sm: 14,
    md: 16,
    lg: 20,
  };

  // Variant classes
  const variantClasses = {
    primary: "bg-red-600 hover:bg-red-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    ghost: "bg-white hover:bg-gray-100 hover:scal-1 text-black",
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center rounded font-medium transition-colors cursor-pointer
        focus:outline-none focus:ring-opacity-50
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${iconOnly ? "p-2" : ""}
      `}
      aria-label="Logout"
    >
      <div></div>
      <LogOut
        size={iconSize[size]}
        className={variant === "primary" ? "text-white" : "text-gray-700"}
      />
      {!iconOnly && <span>{text}</span>}
    </button>
  );
}

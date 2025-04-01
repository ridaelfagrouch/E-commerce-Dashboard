import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  BarChart,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Button from "../../atoms/Button/Button";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface SideNavigationProps {
  className?: string;
}

const SideNavigation: React.FC<SideNavigationProps> = ({ className = "" }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on route change in mobile view
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Set initial state based on window size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems: NavItem[] = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      path: "/orders",
      label: "Orders",
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      path: "/products",
      label: "Products",
      icon: <Package className="w-5 h-5" />,
    },
    {
      path: "/customers",
      label: "Customers",
      icon: <Users className="w-5 h-5" />,
    },
    {
      path: "/analytics",
      label: "Analytics",
      icon: <BarChart className="w-5 h-5" />,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <Button
          variant="ghost"
          onClick={toggleSidebar}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-indigo-800 text-white w-64 z-20
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:z-0
          ${className}
        `}
      >
        <div className="p-4 flex items-center border-b border-indigo-700">
          <ShoppingBag className="w-8 h-8 mr-2" />
          <span className="text-xl font-semibold">ShopDash</span>
        </div>

        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                p-4 flex items-center hover:bg-indigo-700 transition-colors
                ${location.pathname === item.path ? "bg-indigo-900" : ""}
              `}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default SideNavigation;

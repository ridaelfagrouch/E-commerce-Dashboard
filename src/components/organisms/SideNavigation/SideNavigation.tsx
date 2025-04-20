import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import LogoutButton from "../../atoms/Logout/Logout";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface SideNavigationProps {
  className?: string;
}

const SideNavigation: React.FC<SideNavigationProps> = ({ className = "" }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const username = "Jane Doe";
  const email = "admin@shopdash.com";
  const navigate = useNavigate();

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
      label: t("navigation.dashboard"),
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      path: "/orders",
      label: t("navigation.orders"),
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      path: "/products",
      label: t("navigation.products"),
      icon: <Package className="w-5 h-5" />,
    },
    {
      path: "/customers",
      label: t("navigation.customers"),
      icon: <Users className="w-5 h-5" />,
    },
    {
      path: "/analytics",
      label: t("navigation.analytics"),
      icon: <BarChart className="w-5 h-5" />,
    },
    {
      path: "/settings",
      label: t("navigation.settings"),
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 z-[99999]">
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
          className="fixed inset-0 bg-black/40 z-11 lg:hidden"
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
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-indigo-700 flex justify-between">
          <div className="flex-col gap-2 ">
            <div className="text-sm text-white">{username}</div>
            <div className="text-sm text-white">{email}</div>
          </div>
          <LogoutButton
            onClick={() => navigate("/")}
            size="md"
            variant="ghost"
            iconOnly={true}
          />
        </div>
      </aside>
    </>
  );
};

export default SideNavigation;

import React, { useState, useRef } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import NotificationPanel from "../NotificationPanel/NotificationPanel";

interface HeaderProps {
  username?: string;
  avatarUrl?: string;
  className?: string;
}

interface Notification {
  id: string;
  type: "order" | "alert" | "success";
  message: string;
  time: string;
  read: boolean;
}

const Header: React.FC<HeaderProps> = ({
  username = "Admin",
  avatarUrl,
  className = "",
}) => {
  const { t, i18n } = useTranslation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const notificationBtnRef = useRef<HTMLButtonElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "order",
      message: "New order #1234 has been placed",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: "2",
      type: "alert",
      message: "Low stock alert for Product XYZ",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: "3",
      type: "success",
      message: "Order #1233 has been delivered",
      time: "1 hour ago",
      read: true,
    },
    {
      id: "4",
      type: "order",
      message: "New order #1235 has been placed",
      time: "2 hours ago",
      read: true,
    },
  ]);

  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleNotificationClick = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const handleLanguageChange = async (lang: string) => {
    try {
      await i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
      document.documentElement.lang = lang;
      setShowLanguageMenu(false);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  // Close language menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className={`bg-white shadow-sm z-[9999] relative ${className}`}>
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center w-full max-w-xs lg:max-w-md pl-12 lg:pl-0">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder={t("header.search_placeholder")}
              className="border border-gray-300 rounded-lg w-full pl-10 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              ref={notificationBtnRef}
              className="relative p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-6 h-6 text-gray-500" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {showNotifications && (
              <NotificationPanel
                notifications={notifications}
                onClose={() => setShowNotifications(false)}
                onMarkAllRead={handleMarkAllRead}
                onNotificationClick={handleNotificationClick}
              />
            )}
          </div>

          <div className="relative" ref={languageMenuRef}>
            <button
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            >
              <span className="text-sm font-medium">
                {i18n.language?.substring(0, 2).toUpperCase()}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="language-menu"
                >
                  <button
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                      i18n.language === "en" ? "bg-gray-50" : ""
                    }`}
                    onClick={() => handleLanguageChange("en")}
                    role="menuitem"
                  >
                    English
                  </button>
                  <button
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                      i18n.language === "fr" ? "bg-gray-50" : ""
                    }`}
                    onClick={() => handleLanguageChange("fr")}
                    role="menuitem"
                  >
                    Français
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={username}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                {initials}
              </div>
            )}
            <span className="ml-2 text-sm text-gray-700 hidden md:block">
              {username}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

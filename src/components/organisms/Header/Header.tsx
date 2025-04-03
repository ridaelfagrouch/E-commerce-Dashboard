import React from "react";
import { Search, Bell } from "lucide-react";

interface HeaderProps {
  username?: string;
  avatarUrl?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  username = "Admin",
  avatarUrl,
  className = "",
}) => {
  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className={`bg-white shadow-sm ${className}`}>
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center w-full max-w-xs lg:max-w-md pl-12 lg:pl-0">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-lg w-full pl-10 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="relative p-1 rounded-full hover:bg-gray-100 focus:outline-none">
              <Bell className="w-6 h-6 text-gray-500" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
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

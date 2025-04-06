import React, { useEffect, useRef } from "react";
import { Bell, X, ShoppingCart, AlertCircle, CheckCircle } from "lucide-react";
import Button from "../../atoms/Button/Button";

interface Notification {
  id: string;
  type: "order" | "alert" | "success";
  message: string;
  time: string;
  read: boolean;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAllRead: () => void;
  onNotificationClick: (id: string) => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  onClose,
  onMarkAllRead,
  onNotificationClick,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="w-5 h-5 text-indigo-500" />;
      case "alert":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/5 z-40" aria-hidden="true" />
      <div
        ref={panelRef}
        className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-gray-500" />
            <h3 className="font-medium">Notifications</h3>
            {notifications.some((n) => !n.read) && (
              <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                New
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => {
                    onNotificationClick(notification.id);
                    onClose();
                  }}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-all duration-200 ${
                    !notification.read ? "bg-indigo-50/50" : ""
                  }`}
                >
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm ${
                          !notification.read
                            ? "font-medium text-gray-900"
                            : "text-gray-600"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <Button
              variant="ghost"
              className="w-full text-sm hover:bg-white/75 transition-colors"
              onClick={onMarkAllRead}
            >
              Mark all as read
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationPanel;

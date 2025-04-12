import React from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { X } from "lucide-react";
import Button from "../../atoms/Button/Button";
import { Order } from "../../../types/order";

interface ViewOrderProps {
  order: Order;
  onClose: () => void;
  onEdit?: (order: Order) => void;
}

const ViewOrder: React.FC<ViewOrderProps> = ({ order, onClose, onEdit }) => {
  const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCustomerName = (order: Order) => {
    if (typeof order.customer === "string") {
      return order.customer;
    }
    return order.customer.name || "";
  };

  const getCustomerEmail = (order: Order) => {
    if (typeof order.customer === "string") {
      return "";
    }
    return order.customer.email || "";
  };

  const getCustomerPhone = (order: Order) => {
    if (typeof order.customer === "string") {
      return "";
    }
    return order.customer.phone || "";
  };

  const getOrderAmount = (order: Order) => {
    return order.total || order.amount || 0;
  };

//   const getItemsCount = (order: Order) => {
//     if (typeof order.items === "number") {
//       return order.items;
//     }
//     return order.items.length;
//   };

  const renderOrderItems = () => {
    if (typeof order.items === "number") {
      return (
        <div className="text-sm text-gray-500">
          {order.items} {t("orders.table.items")}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
          >
            <div>
              <div className="font-medium text-gray-900">{item.name}</div>
              <div className="text-sm text-gray-500">
                {t("orders.view.quantity")}: {item.quantity}
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">
                ${item.price.toFixed(2)} {t("orders.view.each")}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold">
            {t("orders.view.title")} #{order.id}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={t("common.close")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span
                className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getStatusColor(
                  order.status
                )}`}
              >
                {t(`orders.status.${order.status.toLowerCase()}`)}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {format(new Date(order.date), "MMMM d, yyyy 'at' h:mm a")}
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">
              {t("orders.view.customer_info")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">
                  {t("orders.view.customer_name")}
                </div>
                <div className="font-medium">{getCustomerName(order)}</div>
              </div>
              {getCustomerEmail(order) && (
                <div>
                  <div className="text-sm text-gray-500">
                    {t("orders.view.email")}
                  </div>
                  <div className="font-medium">{getCustomerEmail(order)}</div>
                </div>
              )}
              {getCustomerPhone(order) && (
                <div>
                  <div className="text-sm text-gray-500">
                    {t("orders.view.phone")}
                  </div>
                  <div className="font-medium">{getCustomerPhone(order)}</div>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-medium mb-3">
              {t("orders.view.order_items")}
            </h3>
            {renderOrderItems()}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center text-lg font-medium">
              <div>{t("orders.view.total")}</div>
              <div>${getOrderAmount(order).toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t rounded-b-lg flex justify-end space-x-3">
          <Button variant="ghost" onClick={onClose}>
            {t("common.close")}
          </Button>
          {onEdit && (
            <Button variant="primary" onClick={() => onEdit(order)}>
              {t("orders.actions.edit")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;

import React from "react";
import { useTranslation } from "react-i18next";
import { X, AlertTriangle } from "lucide-react";
import Button from "../../atoms/Button/Button";
import { Order } from "../../../types/order";

interface DeleteOrderProps {
  order: Order;
  onClose: () => void;
  onConfirm: (order: Order) => void;
}

const DeleteOrder: React.FC<DeleteOrderProps> = ({
  order,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();

  const getCustomerName = (order: Order) => {
    if (typeof order.customer === "string") {
      return order.customer;
    }
    return order.customer.name || "";
  };

  const getOrderAmount = (order: Order) => {
    return order.total || order.amount || 0;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-red-600">
            {t("orders.delete.title")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={t("common.close")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-center text-red-600 mb-4">
            <AlertTriangle className="w-12 h-12" />
          </div>

          <p className="text-center text-gray-700">
            {t("orders.delete.confirmation_message")}
          </p>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">{t("orders.table.id")}:</span>
              <span className="font-medium">#{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">
                {t("orders.table.customer")}:
              </span>
              <span className="font-medium">{getCustomerName(order)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t("orders.table.date")}:</span>
              <span className="font-medium">
                {new Date(order.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t("orders.table.amount")}:</span>
              <span className="font-medium">
                ${getOrderAmount(order).toFixed(2)}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 text-center mt-4">
            {t("orders.delete.warning_message")}
          </p>
        </div>

        <div className="p-4 bg-gray-50 border-t rounded-b-lg flex justify-end space-x-3">
          <Button variant="ghost" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button variant="danger" onClick={() => onConfirm(order)}>
            {t("orders.delete.confirm_button")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteOrder;

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import Button from "../../atoms/Button/Button";
import { Order } from "../../../types/order";

interface EditOrderProps {
  order: Order;
  onClose: () => void;
  onSave: (updatedOrder: Order) => void;
}

const EditOrder: React.FC<EditOrderProps> = ({ order, onClose, onSave }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Order>({ ...order });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData({ ...order });
  }, [order]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("customer.")) {
      const customerField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        customer:
          typeof prev.customer === "string"
            ? { name: prev.customer, email: "", phone: "" }
            : { ...prev.customer, [customerField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate customer name
    if (typeof formData.customer === "string") {
      if (!formData.customer.trim()) {
        newErrors["customer.name"] = t(
          "orders.edit.errors.customer_name_required"
        );
      }
    } else {
      if (!formData.customer.name?.trim()) {
        newErrors["customer.name"] = t(
          "orders.edit.errors.customer_name_required"
        );
      }
    }

    // Validate status
    if (!formData.status) {
      newErrors.status = t("orders.edit.errors.status_required");
    }

    // Validate date
    if (!formData.date) {
      newErrors.date = t("orders.edit.errors.date_required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData);
    }
  };

  const getCustomerName = () => {
    if (typeof formData.customer === "string") {
      return formData.customer;
    }
    return formData.customer.name || "";
  };

  const getCustomerEmail = () => {
    if (typeof formData.customer === "string") {
      return "";
    }
    return formData.customer.email || "";
  };

  const getCustomerPhone = () => {
    if (typeof formData.customer === "string") {
      return "";
    }
    return formData.customer.phone || "";
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold">
            {t("orders.edit.title")} #{formData.id}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={t("common.close")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Order Status */}
          <div className="space-y-2">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              {t("orders.edit.status")}
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.status ? "border-red-500" : ""
              }`}
            >
              <option value="">{t("orders.edit.select_status")}</option>
              <option value="completed">{t("orders.status.completed")}</option>
              <option value="processing">
                {t("orders.status.processing")}
              </option>
              <option value="pending">{t("orders.status.pending")}</option>
              <option value="cancelled">{t("orders.status.cancelled")}</option>
            </select>
            {errors.status && (
              <p className="text-sm text-red-600">{errors.status}</p>
            )}
          </div>

          {/* Order Date */}
          <div className="space-y-2">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              {t("orders.edit.date")}
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.date ? "border-red-500" : ""
              }`}
            />
            {errors.date && (
              <p className="text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          {/* Customer Information */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-medium">
              {t("orders.edit.customer_info")}
            </h3>

            <div className="space-y-2">
              <label
                htmlFor="customer.name"
                className="block text-sm font-medium text-gray-700"
              >
                {t("orders.edit.customer_name")}
              </label>
              <input
                type="text"
                id="customer.name"
                name="customer.name"
                value={getCustomerName()}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors["customer.name"] ? "border-red-500" : ""
                }`}
              />
              {errors["customer.name"] && (
                <p className="text-sm text-red-600">
                  {errors["customer.name"]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="customer.email"
                className="block text-sm font-medium text-gray-700"
              >
                {t("orders.edit.email")}
              </label>
              <input
                type="email"
                id="customer.email"
                name="customer.email"
                value={getCustomerEmail()}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="customer.phone"
                className="block text-sm font-medium text-gray-700"
              >
                {t("orders.edit.phone")}
              </label>
              <input
                type="tel"
                id="customer.phone"
                name="customer.phone"
                value={getCustomerPhone()}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Order Items - Read Only */}
          <div>
            <h3 className="text-lg font-medium mb-3">
              {t("orders.edit.order_items")}
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">
                {t("orders.edit.items_read_only")}
              </p>
            </div>
          </div>

          {/* Order Total - Read Only */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center text-lg font-medium">
              <div>{t("orders.edit.total")}</div>
              <div>${(formData.total || formData.amount || 0).toFixed(2)}</div>
            </div>
          </div>
        </form>

        <div className="p-4 bg-gray-50 border-t rounded-b-lg flex justify-end space-x-3">
          <Button variant="ghost" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {t("common.save")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;

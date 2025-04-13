import React from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Customer } from "../../../screens/Customers/Customers";

type CustomerCardProps = {
  customer: Customer;
  onViewDetails: () => void;
};

const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  onViewDetails,
}) => {
  const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "new":
        return "bg-blue-100 text-blue-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const initials = customer.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4 border-b bg-indigo-50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center font-semibold">
          {initials}
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{customer.name}</h3>
          <p className="text-xs text-gray-500">{customer.id}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
            customer.status
          )}`}
        >
          {t(`customers.status.${customer.status}`)}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center text-sm mb-2">
          <Mail size={14} className="text-gray-400 mr-2" />
          <span className="text-gray-700">{customer.email}</span>
        </div>
        <div className="flex items-center text-sm mb-2">
          <Phone size={14} className="text-gray-400 mr-2" />
          <span className="text-gray-700">{customer.phone}</span>
        </div>
        <div className="flex items-center text-sm mb-4">
          <MapPin size={14} className="text-gray-400 mr-2" />
          <span className="text-gray-700">{customer.location}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500">
              {t("customers.customer.orders")}
            </p>
            <p className="font-medium">{customer.orders}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500">
              {t("customers.customer.spent")}
            </p>
            <p className="font-medium">${customer.spent.toFixed(2)}</p>
          </div>
        </div>
        <div className="border-t pt-3 flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {t("customers.customer.last_order")}: {customer.lastOrder}
          </span>
          <button
            onClick={onViewDetails}
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            {t("customers.actions.view_details")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;

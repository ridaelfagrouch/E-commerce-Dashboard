import React, { useState } from "react";
import {
  X,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  DollarSign,
  Calendar,
} from "lucide-react";
import Button from "../../atoms/Button/Button";
import Badge from "../../atoms/Badge/Badge";
import EditCustomer from "./EditCustomer";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  orders: number;
  spent: number;
  status: "Active" | "New" | "Inactive";
  lastOrder: string;
}

interface ViewCustomerProps {
  customer: Customer;
  onClose: () => void;
  onUpdate: (updatedCustomer: Customer) => void;
}

const ViewCustomer: React.FC<ViewCustomerProps> = ({
  customer,
  onClose,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "New":
        return "info";
      case "Inactive":
        return "error";
      default:
        return "default";
    }
  };

  const handleSaveEdit = (updatedCustomer: Customer) => {
    onUpdate(updatedCustomer);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditCustomer
        customer={customer}
        onClose={() => setIsEditing(false)}
        onSave={handleSaveEdit}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-50 flex items-center justify-center p-4 h-screen">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl transform transition-all duration-300 ease-out scale-100 opacity-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Customer Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              View detailed information about this customer.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Customer Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 pb-6 border-b">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-semibold text-indigo-600">
                {customer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-900">
                {customer.name}
              </h3>
              <p className="text-sm text-gray-500">
                Customer ID: {customer.id}
              </p>
              <div className="mt-2">
                <Badge variant={getStatusColor(customer.status)}>
                  {customer.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Customer Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Contact Information
              </h4>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm font-medium">{customer.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-sm font-medium">{customer.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-sm font-medium">{customer.location}</p>
                </div>
              </div>
            </div>

            {/* Order Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Order Information
              </h4>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-sm font-medium">
                    {customer.orders} orders
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-sm font-medium">
                    ${customer.spent.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Order</p>
                  <p className="text-sm font-medium">{customer.lastOrder}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order History Preview */}
          <div className="mt-8">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              Recent Activity
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-center text-sm text-gray-500">
                {customer.orders > 0 ? (
                  <p>
                    This customer has made {customer.orders} orders with a total
                    value of ${customer.spent.toLocaleString()}
                  </p>
                ) : (
                  <p>This customer hasn't made any orders yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 bg-gray-50 border-t rounded-b-xl">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            Edit Customer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;

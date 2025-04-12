import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Eye, Edit, Trash2 } from "lucide-react";
import Button from "../../atoms/Button/Button";
import { Order } from "../../../types/order";
import ViewOrder from "../OrderForms/ViewOrder";
import EditOrder from "../OrderForms/EditOrder";
import DeleteOrder from "../OrderForms/DeleteOrder";

// Re-export the Order type
export type { Order };

interface OrdersTableProps {
  orders: Order[];
  onUpdate?: (updatedOrder: Order) => void;
  onDelete?: (order: Order) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  onUpdate = () => console.log("Update action not implemented"),
  onDelete = () => console.log("Delete action not implemented"),
}) => {
  const { t } = useTranslation();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const getOrderAmount = (order: Order) => {
    return order.total || order.amount || 0;
  };

  const getCustomerName = (order: Order) => {
    if (typeof order.customer === "string") {
      return order.customer;
    }
    return order.customer.name || "";
  };

  const getItemsCount = (order: Order) => {
    if (typeof order.items === "number") {
      return order.items;
    }
    return order.items.length;
  };

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const handleDelete = (order: Order) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };

  const handleCloseView = () => {
    setIsViewModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCloseDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedOrder(null);
  };

  const handleSave = (updatedOrder: Order) => {
    onUpdate(updatedOrder);
    handleCloseEdit();
  };

  const handleConfirmDelete = (order: Order) => {
    onDelete(order);
    handleCloseDelete();
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {t("orders.table.id")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {t("orders.table.customer")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {t("orders.table.date")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {t("orders.table.status")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {t("orders.table.amount")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {t("orders.table.items")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {t("orders.table.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getCustomerName(order)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(order.date), "MMM d, yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {t(`orders.status.${order.status.toLowerCase()}`)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${getOrderAmount(order).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getItemsCount(order)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleView(order)}
                      aria-label={t("orders.actions.view")}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(order)}
                      aria-label={t("orders.actions.edit")}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(order)}
                      aria-label={t("orders.actions.delete")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <>
          {isViewModalOpen && (
            <ViewOrder
              order={selectedOrder}
              onClose={handleCloseView}
              onEdit={handleEdit}
            />
          )}
          {isEditModalOpen && (
            <EditOrder
              order={selectedOrder}
              onClose={handleCloseEdit}
              onSave={handleSave}
            />
          )}
          {isDeleteModalOpen && (
            <DeleteOrder
              order={selectedOrder}
              onClose={handleCloseDelete}
              onConfirm={handleConfirmDelete}
            />
          )}
        </>
      )}
    </>
  );
};

export default OrdersTable;

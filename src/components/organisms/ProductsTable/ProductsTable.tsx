import React from "react";
import { Edit, Eye, Image as ImageIcon } from "lucide-react";
import Button from "../../atoms/Button/Button";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  status: "Active" | "Low Stock" | "Out of Stock";
}

interface ProductsTableProps {
  products: Product[];
  onSort?: (field: string) => void;
  sortField?: string;
  sortDirection?: "asc" | "desc";
  className?: string;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onSort,
  sortField,
  sortDirection,
  className = "",
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const SortHeader: React.FC<{ field: string; label: string }> = ({
    field,
    label,
  }) => (
    <button
      className={`flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700`}
      onClick={() => onSort?.(field)}
    >
      {label}
      {sortField === field && (
        <span className="text-gray-400">
          {sortDirection === "asc" ? "↑" : "↓"}
        </span>
      )}
    </button>
  );

  return (
    <div className={className}>
      {/* Mobile View */}
      <div className="block sm:hidden">
        <div className="divide-y divide-gray-200">
          {products.map((product) => (
            <div key={product.id} className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ImageIcon size={20} className="text-gray-400" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.category}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Edit size={16} />}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Eye size={16} />}
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm font-medium">
                      ${product.price.toFixed(2)}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <div className="mt-1 flex justify-between text-sm text-gray-500">
                    <span>{product.stock} in stock</span>
                    <span>{product.sales} sales</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block p-5">
        <div className="mb-4 flex gap-4 items-center">
          <SortHeader field="name" label="Name" />
          <SortHeader field="category" label="Category" />
          <SortHeader field="price" label="Price" />
          <SortHeader field="stock" label="Stock" />
          <SortHeader field="sales" label="Sales" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <ImageIcon size={48} className="text-gray-400" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.category}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs text-center font-semibold rounded-full ${getStatusColor(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </span>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-indigo-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.stock} in stock
                  </span>
                </div>
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span>ID: {product.id}</span>
                  <span>{product.sales} sales</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    leftIcon={<Edit size={16} />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    leftIcon={<Eye size={16} />}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;

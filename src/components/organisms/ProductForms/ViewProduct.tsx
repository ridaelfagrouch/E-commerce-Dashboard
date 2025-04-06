import React from "react";
import { X } from "lucide-react";
import Button from "../../atoms/Button/Button";
import Badge from "../../atoms/Badge/Badge";
import { Product } from "../../../types/Product";

interface ViewProductProps {
  product: Product;
  onClose: () => void;
}

const ViewProduct: React.FC<ViewProductProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-50 flex items-center justify-center p-4 h-screen">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl transform transition-all duration-300 ease-out scale-100 opacity-100">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="md:col-span-2">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Product Name
                </h3>
                <p className="mt-1 text-lg font-semibold">{product.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="mt-1">{product.category}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
                <p className="mt-1 text-lg font-bold text-indigo-600">
                  {product.revenue}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Stock Status
                </h3>
                <div className="mt-1">
                  <Badge
                    variant={
                      product.inventory === "in_stock"
                        ? "success"
                        : product.inventory === "low_stock"
                        ? "warning"
                        : "error"
                    }
                  >
                    {product.inventory === "in_stock"
                      ? "In Stock"
                      : product.inventory === "low_stock"
                      ? "Low Stock"
                      : "Out of Stock"}
                  </Badge>
                  <span className="ml-2 text-sm text-gray-500">
                    {product.stock} units
                  </span>
                </div>
              </div>
            </div>

            {/* Sales Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Total Sales
                </h3>
                <p className="mt-1">{product.sales} units sold</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Total Revenue Value
                </h3>
                <p className="mt-1 text-lg font-bold text-green-600">
                  ${product.revenueValue.toLocaleString()}
                </p>
              </div>

              {product.description && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Description
                  </h3>
                  <p className="mt-1 text-gray-600">{product.description}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;

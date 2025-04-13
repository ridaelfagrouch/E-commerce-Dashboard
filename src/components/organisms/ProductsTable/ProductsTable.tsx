import React from "react";
import { Edit, Eye } from "lucide-react";
import Button from "../../atoms/Button/Button";
import Badge from "../../atoms/Badge/Badge";
import { Product } from "../../../types/Product";
import { useTranslation } from "react-i18next";

export interface ProductsTableProps {
  products: Product[];
  onSort?: (field: string) => void;
  sortField?: string;
  sortDirection?: "asc" | "desc";
  onEdit: (product: Product) => void;
  onView: (product: Product) => void;
  className?: string;
}

const getStatusKey = (status: string): string => {
  switch (status.toLowerCase()) {
    case "out of stock":
      return "out_of_stock";
    case "low stock":
      return "low_stock";
    case "active":
      return "in_stock";
    default:
      return status.toLowerCase().replace(" ", "_");
  }
};

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onSort,
  sortField,
  sortDirection,
  onEdit,
  onView,
  className = "",
}) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "low stock":
        return "warning";
      case "out of stock":
        return "error";
      default:
        return "default";
    }
  };

  const getDefaultImageUrl = (category: string): string => {
    // Default images based on product category
    const categoryImages: Record<string, string> = {
      Electronics:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      Fitness:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "Food & Beverage":
        "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      Accessories:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      Lifestyle:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    };

    return (
      categoryImages[category] ||
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    );
  };

  const SortHeader: React.FC<{ field: string; label: string }> = ({
    field,
    label,
  }) => (
    <button
      className={`flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700`}
      onClick={() => onSort?.(field)}
    >
      {t(label)}
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
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src={
                      product.imageUrl || getDefaultImageUrl(product.category)
                    }
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
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
                        onClick={() => onEdit(product)}
                        leftIcon={<Edit size={16} />}
                      >
                        {t("common.edit")}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(product)}
                        leftIcon={<Eye size={16} />}
                      >
                        {t("common.view")}
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm font-medium">
                      ${product.price.toFixed(2)}
                    </span>
                    <Badge variant={getStatusVariant(product.status)}>
                      {t(`products.status.${getStatusKey(product.status)}`)}
                    </Badge>
                  </div>
                  <div className="mt-1 flex justify-between text-sm text-gray-500">
                    <span>
                      {t("products.view.stock_units", { count: product.stock })}
                    </span>
                    <span>
                      {t("products.view.units_sold", { count: product.sales })}
                    </span>
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
          <SortHeader field="name" label="products.view.name_label" />
          <SortHeader field="category" label="products.view.category_label" />
          <SortHeader field="price" label="products.view.price_label" />
          <SortHeader field="stock" label="products.view.stock_status_label" />
          <SortHeader field="sales" label="products.view.total_sales_label" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={product.imageUrl || getDefaultImageUrl(product.category)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
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
                  <Badge variant={getStatusVariant(product.status)}>
                    {t(`products.status.${getStatusKey(product.status)}`)}
                  </Badge>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-indigo-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {t("products.view.stock_units", { count: product.stock })}
                  </span>
                </div>
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span>ID: {product.id}</span>
                  <span>
                    {t("products.view.units_sold", { count: product.sales })}
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onClick={() => onEdit(product)}
                    leftIcon={<Edit size={16} />}
                  >
                    {t("common.edit")}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onClick={() => onView(product)}
                    leftIcon={<Eye size={16} />}
                  >
                    {t("common.view")}
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

import React from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../../atoms/Button/Button";
import Badge from "../../atoms/Badge/Badge";
import { Product } from "../../../types/Product";

interface ViewProductProps {
  product: Product;
  onClose: () => void;
}

const ViewProduct: React.FC<ViewProductProps> = ({ product, onClose }) => {
  const { t } = useTranslation();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "in_stock":
        return "success";
      case "low_stock":
        return "warning";
      case "out_of_stock":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-[10000] flex items-center justify-center p-4 h-screen">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl transform transition-all duration-300 ease-out scale-100 opacity-100">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{t("products.view.title")}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={t("common.close")}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="md:col-span-2">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={product.imageUrl}
                  alt={t("products.view.image_alt", { name: product.name })}
                  className="w-full h-64 object-cover rounded-lg bg-gray-100"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("products.view.name_label")}
                </h3>
                <p className="mt-1 text-lg font-semibold">{product.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("products.view.category_label")}
                </h3>
                <p className="mt-1">
                  {t(`products.categories.${product.category.toLowerCase()}`)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("products.view.price_label")}
                </h3>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("products.view.stock_status_label")}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant={getStatusVariant(product.inventory)}>
                    {t(`products.status.${product.inventory}`)}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {t("products.view.stock_units", { count: product.stock })}
                  </span>
                </div>
              </div>
            </div>

            {/* Sales Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("products.view.total_sales_label")}
                </h3>
                <p className="mt-1 text-lg">
                  {t("products.view.units_sold", { count: product.sales })}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("products.view.total_revenue_label")}
                </h3>
                <p className="mt-1 text-lg font-bold text-green-600">
                  {formatCurrency(product.revenueValue)}
                </p>
              </div>

              {product.description && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {t("products.view.description_label")}
                  </h3>
                  <p className="mt-1 text-gray-600">{product.description}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="ghost" onClick={onClose}>
              {t("common.close")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;

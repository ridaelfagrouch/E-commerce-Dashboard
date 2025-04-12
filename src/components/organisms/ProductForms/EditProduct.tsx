import React, { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../../atoms/Button/Button";
import InputField from "../../atoms/InputField/InputField";
import SelectField from "../../atoms/SelectField/SelectField";
import TextAreaField from "../../atoms/TextAreaField/TextAreaField";
import { Product } from "../../../types/Product";

interface EditProductProps {
  product?: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
  isNew?: boolean;
}

const EditProduct: React.FC<EditProductProps> = ({
  product,
  onClose,
  onSave,
  isNew = false,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Product>({
    id: product?.id || `PRD-${Math.random().toString(36).substr(2, 9)}`,
    name: product?.name || "",
    category: product?.category || "",
    price: product?.price || 0,
    stock: product?.stock || 0,
    sales: product?.sales || 0,
    status: product?.status || "in_stock",
    imageUrl: product?.imageUrl || "",
    revenue: product?.revenue || 0,
    revenueValue: product?.revenueValue || 0,
    inventory: product?.inventory || "in_stock",
    description: product?.description || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.imageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setFormData(product);
      setImagePreview(product.imageUrl);
    }
  }, [product]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "sales"
          ? parseFloat(value) || 0
          : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: t("products.form.errors.image_size"),
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImagePreview(null);
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = t("products.form.errors.name_required");
    }
    if (!formData.category) {
      newErrors.category = t("products.form.errors.category_required");
    }
    if (formData.price <= 0) {
      newErrors.price = t("products.form.errors.price_positive");
    }
    if (formData.stock < 0) {
      newErrors.stock = t("products.form.errors.stock_negative");
    }
    if (!formData.imageUrl) {
      newErrors.image = t("products.form.errors.image_required");
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

  const categories = [
    "electronics",
    "fitness",
    "food_beverage",
    "accessories",
    "lifestyle",
  ].map((category) => ({
    label: t(`products.categories.${category}`),
    value: category,
  }));

  const statuses = ["in_stock", "low_stock", "out_of_stock"].map((status) => ({
    label: t(`products.status.${status}`),
    value: status,
  }));

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center z-[10000] p-4 h-screen">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out scale-100 opacity-100">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {isNew
                ? t("products.form.add_title")
                : t("products.form.edit_title")}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label={t("common.close")}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                {t("products.form.image_label")}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div
                className={`relative w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed transition-colors ${
                  errors.image
                    ? "border-red-300 hover:border-red-400"
                    : "border-gray-300 hover:border-indigo-500"
                } cursor-pointer`}
                onClick={handleImageClick}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt={t("products.form.image_preview_alt")}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <X size={16} className="text-gray-600" />
                    </button>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      {t("products.form.image_upload_text")}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {t("products.form.image_upload_hint")}
                    </p>
                  </div>
                )}
              </div>
              {errors.image && (
                <p className="text-sm text-red-500 mt-1">{errors.image}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label={t("products.form.name_label")}
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                required
                placeholder={t("products.form.name_placeholder")}
              />

              <SelectField
                label={t("products.form.category_label")}
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                options={categories}
                error={errors.category}
                required
              />

              <InputField
                label={t("products.form.price_label")}
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                error={errors.price}
                required
                placeholder={t("products.form.price_placeholder")}
              />

              <InputField
                label={t("products.form.stock_label")}
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                error={errors.stock}
                required
                placeholder={t("products.form.stock_placeholder")}
              />

              <InputField
                label={t("products.form.sales_label")}
                name="sales"
                type="number"
                value={formData.sales}
                onChange={handleInputChange}
                disabled={isNew}
                placeholder={t("products.form.sales_placeholder")}
              />

              <SelectField
                label={t("products.form.status_label")}
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                options={statuses}
                required
              />
            </div>

            <TextAreaField
              label={t("products.form.description_label")}
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              rows={4}
              placeholder={t("products.form.description_placeholder")}
            />

            <div className="flex justify-end gap-4">
              <Button variant="secondary" onClick={onClose} type="button">
                {t("common.cancel")}
              </Button>
              <Button variant="primary" type="submit">
                {isNew
                  ? t("products.form.add_button")
                  : t("products.form.save_button")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

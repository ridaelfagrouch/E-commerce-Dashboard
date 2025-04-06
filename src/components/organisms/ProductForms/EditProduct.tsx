import React, { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";
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
  const [formData, setFormData] = useState<Product>({
    id: product?.id || "",
    name: product?.name || "",
    category: product?.category || "",
    price: product?.price || 0,
    stock: product?.stock || 0,
    sales: product?.sales || 0,
    status: product?.status || "active",
    imageUrl: product?.imageUrl || "",
    revenue: product?.revenue || 0,
    revenueValue: product?.revenueValue || 0,
    inventory: product?.inventory || "in_stock",
    description: product?.description || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setFormData(product);
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
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL
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
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (formData.stock < 0) newErrors.stock = "Stock cannot be negative";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center z-50 h-screen">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out scale-100 opacity-100 mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {isNew ? "Add New Product" : "Edit Product"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <div
                className="relative w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors"
                onClick={handleImageClick}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview || formData.imageUrl ? (
                  <>
                    <img
                      src={imagePreview || formData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      <X size={16} className="text-gray-600" />
                    </button>
                  </>
                ) : (
                  <div className="text-center">
                    <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                required
              />

              <SelectField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                options={[
                  { value: "Electronics", label: "Electronics" },
                  { value: "Fitness", label: "Fitness" },
                  { value: "Food & Beverage", label: "Food & Beverage" },
                  { value: "Accessories", label: "Accessories" },
                  { value: "Lifestyle", label: "Lifestyle" },
                ]}
                error={errors.category}
                required
              />

              <InputField
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                error={errors.price}
                required
              />

              <InputField
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                error={errors.stock}
                required
              />

              <InputField
                label="Sales"
                name="sales"
                type="number"
                value={formData.sales}
                onChange={handleInputChange}
                required
              />

              <SelectField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Low Stock", label: "Low Stock" },
                  { value: "Out of Stock", label: "Out of Stock" },
                ]}
                required
              />
            </div>

            <TextAreaField
              label="Description"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              rows={4}
              placeholder="Enter product description..."
            />

            <div className="flex justify-end gap-4">
              <Button variant="secondary" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {isNew ? "Add Product" : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

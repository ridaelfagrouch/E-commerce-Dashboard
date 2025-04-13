import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import Button from "../../atoms/Button/Button";
import InputField from "../../atoms/InputField/InputField";

interface AddCustomerProps {
  onClose: () => void;
  onSave: (customer: {
    name: string;
    email: string;
    phone: string;
    location: string;
    id: string;
    orders: number;
    spent: number;
    lastOrder: string;
    status: string;
  }) => void;
}

const AddCustomer: React.FC<AddCustomerProps> = ({ onClose, onSave }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      location: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = t("customers.form.errors.name_required");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("customers.form.errors.email_required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("customers.form.errors.email_invalid");
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("customers.form.errors.phone_required");
    }

    if (!formData.location.trim()) {
      newErrors.location = t("customers.form.errors.location_required");
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        id: `CUS${Date.now()}`,
        orders: 0,
        spent: 0,
        lastOrder: "-",
        status: "active",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center z-[10000]">
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 transform transition-all duration-300 ease-out scale-100 opacity-100"
        style={{ maxHeight: "calc(100vh - 2rem)" }}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {t("customers.form.add_title")}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {t("customers.form.add_description")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="p-6 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 10rem)" }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label={t("customers.form.name_label")}
              name="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={errors.name}
              required
              placeholder={t("customers.form.name_placeholder")}
            />

            <InputField
              label={t("customers.form.email_label")}
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
              required
              placeholder={t("customers.form.email_placeholder")}
            />

            <InputField
              label={t("customers.form.phone_label")}
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              error={errors.phone}
              required
              placeholder={t("customers.form.phone_placeholder")}
            />

            <InputField
              label={t("customers.form.location_label")}
              name="location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              error={errors.location}
              required
              placeholder={t("customers.form.location_placeholder")}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="secondary"
                onClick={onClose}
                type="button"
                className="px-4 py-2"
              >
                {t("customers.actions.cancel")}
              </Button>
              <Button variant="primary" type="submit" className="px-4 py-2">
                {t("customers.actions.add_customer")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;

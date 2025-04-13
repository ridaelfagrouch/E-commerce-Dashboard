import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import Button from "../../atoms/Button/Button";
import InputField from "../../atoms/InputField/InputField";
import SelectField from "../../atoms/SelectField/SelectField";
import { Customer } from "../../../screens/Customers/Customers";

interface EditCustomerProps {
  customer: Customer;
  onClose: () => void;
  onSave: (updatedCustomer: Customer) => void;
}

const EditCustomer: React.FC<EditCustomerProps> = ({
  customer,
  onClose,
  onSave,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Customer>({ ...customer });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

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
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-[10000] flex items-center justify-center p-4 h-screen">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl transform transition-all duration-300 ease-out scale-100 opacity-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {t("customers.form.edit_title")}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {t("customers.form.edit_description")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {t("customers.form.basic_info")}
                </h4>

                <InputField
                  label={t("customers.form.name_label")}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  required
                  placeholder={t("customers.form.name_placeholder")}
                />

                <InputField
                  label={t("customers.form.email_label")}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  required
                  placeholder={t("customers.form.email_placeholder")}
                />

                <InputField
                  label={t("customers.form.phone_label")}
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  required
                  placeholder={t("customers.form.phone_placeholder")}
                />

                <InputField
                  label={t("customers.form.location_label")}
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  error={errors.location}
                  required
                  placeholder={t("customers.form.location_placeholder")}
                />
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {t("customers.form.additional_info")}
                </h4>

                <SelectField
                  label={t("customers.form.status_label")}
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  options={[
                    { value: "active", label: t("customers.status.active") },
                    { value: "new", label: t("customers.status.new") },
                    {
                      value: "inactive",
                      label: t("customers.status.inactive"),
                    },
                  ]}
                />

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("customers.customer.orders")}
                      </p>
                      <p className="text-sm font-medium">{customer.orders}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("customers.customer.spent")}
                      </p>
                      <p className="text-sm font-medium">
                        ${customer.spent.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {t("customers.form.order_history_note")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 bg-gray-50 border-t rounded-b-xl">
            <Button variant="ghost" type="button" onClick={onClose}>
              {t("customers.actions.cancel")}
            </Button>
            <Button variant="primary" type="submit">
              {t("customers.actions.save")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;

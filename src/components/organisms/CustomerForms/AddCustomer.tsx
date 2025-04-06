import React, { useState } from "react";
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
  }) => void;
}

const AddCustomer: React.FC<AddCustomerProps> = ({ onClose, onSave }) => {
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
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
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
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 transform transition-all duration-300 ease-out scale-100 opacity-100"
        style={{ maxHeight: "calc(100vh - 2rem)" }}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Add New Customer
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the information below to create a new customer.
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
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={errors.name}
              required
              placeholder="Enter customer's full name"
            />

            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
              required
              placeholder="customer@example.com"
            />

            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              error={errors.phone}
              required
              placeholder="(555) 123-4567"
            />

            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              error={errors.location}
              required
              placeholder="City, Country"
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="secondary"
                onClick={onClose}
                type="button"
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="px-4 py-2">
                Add Customer
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;

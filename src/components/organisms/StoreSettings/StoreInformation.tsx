import React, { useState } from "react";
import {
  Store,
  Building2,
  MapPin,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import BackButton from "../../atoms/BackButton/BackButton";
import SelectField from "../../atoms/SelectField/SelectField";

interface StoreInformationProps {
  onBack: () => void;
}

interface FormErrors {
  [key: string]: string;
}

const StoreInformation: React.FC<StoreInformationProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    storeName: "ShopDash Store",
    email: "contact@shopdash.com",
    phone: "+1 (555) 123-4567",
    timezone: "America/New_York",
    address: "123 Commerce Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "US",
    taxId: "123-45-6789",
    currency: "USD",
    website: "https://shopdash.com",
    description: "Your one-stop shop for everything you need.",
    businessType: "retail",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isDirty, setIsDirty] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.storeName.trim()) {
      newErrors.storeName = "Store name is required";
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.zip.trim()) {
      newErrors.zip = "ZIP code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted:", formData);
    }
  };

  const InputField = ({
    label,
    name,
    type = "text",
    required = false,
    placeholder = "",
    pattern = "",
  }: {
    label: string;
    name: keyof typeof formData;
    type?: string;
    required?: boolean;
    placeholder?: string;
    pattern?: string;
  }) => (
    <div className="relative">
      <label
        htmlFor={name}
        className="block text-sm font-medium mb-1.5 text-gray-900"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative group">
        <input
          type={type}
          name={name}
          id={name}
          value={formData[name]}
          onChange={handleInputChange}
          pattern={pattern}
          placeholder={placeholder}
          className={`
            peer
            w-full
            px-4
            py-2.5
            text-gray-900
            bg-white
            border
            rounded-lg
            transition-all
            duration-200
            ease-in-out
            ${
              errors[name]
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-gray-200 hover:border-gray-300 focus:border-indigo-500 focus:ring-indigo-100"
            }
            focus:outline-none
            focus:ring-4
            placeholder-gray-400
            text-sm
          `}
        />
        {errors[name] && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
        )}
        <div
          className={`
            absolute
            inset-0
            rounded-lg
            pointer-events-none
            transition-all
            duration-200
            ${
              errors[name]
                ? "peer-focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]"
                : "peer-focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)]"
            }
          `}
        />
      </div>
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  const TextAreaField = ({
    label,
    name,
    rows = 3,
    placeholder = "",
  }: {
    label: string;
    name: keyof typeof formData;
    rows?: number;
    placeholder?: string;
  }) => (
    <div className="relative">
      <label
        htmlFor={name}
        className="block text-sm font-medium mb-1.5 text-gray-900"
      >
        {label}
      </label>
      <div className="relative group">
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="
            w-full
            px-4
            py-2.5
            text-gray-900
            bg-white
            border
            border-gray-200
            rounded-lg
            transition-all
            duration-200
            ease-in-out
            hover:border-gray-300
            focus:border-indigo-500
            focus:ring-4
            focus:ring-indigo-100
            focus:outline-none
            text-sm
            resize-none
          "
        />
        <div className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 group-focus-within:shadow-[0_0_0_4px_rgba(99,102,241,0.1)]" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center justify-between">
          <BackButton onClick={onBack} />
          <button
            type="button"
            disabled={!isDirty}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isDirty
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Store className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Store Information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Update your store details and business information
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="space-y-6">
          <div className="flex items-center">
            <Building2 className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              Basic Information
            </h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <InputField
                label="Store Name"
                name="storeName"
                required
                placeholder="Enter your store name"
              />
              <InputField
                label="Business Email"
                name="email"
                type="email"
                required
                placeholder="contact@example.com"
              />
              <InputField
                label="Phone Number"
                name="phone"
                type="tel"
                required
                placeholder="+1 (555) 123-4567"
                pattern="[+]?[0-9\s-()]+"
              />
              <SelectField
                label="Timezone"
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                options={[
                  { value: "America/New_York", label: "Eastern Time (ET)" },
                  { value: "America/Chicago", label: "Central Time (CT)" },
                  { value: "America/Denver", label: "Mountain Time (MT)" },
                  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
                  { value: "Europe/London", label: "London (GMT)" },
                  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
                  { value: "Australia/Sydney", label: "Sydney (AEST)" },
                ]}
              />
              <InputField
                label="Website"
                name="website"
                type="url"
                placeholder="https://example.com"
              />
              <div className="sm:col-span-2">
                <TextAreaField
                  label="Store Description"
                  name="description"
                  placeholder="Describe your store..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-6">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              Business Address
            </h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <InputField
                  label="Street Address"
                  name="address"
                  required
                  placeholder="Enter your street address"
                />
              </div>
              <InputField
                label="City"
                name="city"
                required
                placeholder="Enter city"
              />
              <InputField
                label="State / Province"
                name="state"
                required
                placeholder="Enter state"
              />
              <InputField
                label="ZIP / Postal Code"
                name="zip"
                required
                placeholder="Enter ZIP code"
              />
              <SelectField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                options={[
                  { value: "US", label: "United States" },
                  { value: "CA", label: "Canada" },
                  { value: "GB", label: "United Kingdom" },
                  { value: "AU", label: "Australia" },
                  { value: "DE", label: "Germany" },
                  { value: "FR", label: "France" },
                  { value: "JP", label: "Japan" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="space-y-6">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              Business Details
            </h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <InputField
                label="Tax ID / VAT Number"
                name="taxId"
                placeholder="Enter tax ID or VAT number"
              />
              <SelectField
                label="Business Type"
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                options={[
                  { value: "retail", label: "Retail" },
                  { value: "wholesale", label: "Wholesale" },
                  { value: "manufacturing", label: "Manufacturing" },
                  { value: "service", label: "Service" },
                  { value: "digital", label: "Digital Products" },
                ]}
              />
              <SelectField
                label="Default Currency"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                options={[
                  { value: "USD", label: "US Dollar (USD)" },
                  { value: "EUR", label: "Euro (EUR)" },
                  { value: "GBP", label: "British Pound (GBP)" },
                  { value: "CAD", label: "Canadian Dollar (CAD)" },
                  { value: "AUD", label: "Australian Dollar (AUD)" },
                  { value: "JPY", label: "Japanese Yen (JPY)" },
                ]}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StoreInformation;

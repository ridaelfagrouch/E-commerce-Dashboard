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
import { useTranslation } from "react-i18next";

interface StoreInformationProps {
  onBack: () => void;
}

interface FormErrors {
  [key: string]: string;
}

const StoreInformation: React.FC<StoreInformationProps> = ({ onBack }) => {
  const { t } = useTranslation();

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
      newErrors.storeName = t("storeInformation.validation.storeName");
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = t("storeInformation.validation.email");
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("storeInformation.validation.phone");
    }

    if (!formData.address.trim()) {
      newErrors.address = t("storeInformation.validation.address");
    }

    if (!formData.city.trim()) {
      newErrors.city = t("storeInformation.validation.city");
    }

    if (!formData.state.trim()) {
      newErrors.state = t("storeInformation.validation.state");
    }

    if (!formData.zip.trim()) {
      newErrors.zip = t("storeInformation.validation.zip");
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

  // Create translated timezone options
  const timezoneOptions = [
    {
      value: "America/New_York",
      label: t("storeInformation.sections.basic.fields.timezone.options.et"),
    },
    {
      value: "America/Chicago",
      label: t("storeInformation.sections.basic.fields.timezone.options.ct"),
    },
    {
      value: "America/Denver",
      label: t("storeInformation.sections.basic.fields.timezone.options.mt"),
    },
    {
      value: "America/Los_Angeles",
      label: t("storeInformation.sections.basic.fields.timezone.options.pt"),
    },
    {
      value: "Europe/London",
      label: t("storeInformation.sections.basic.fields.timezone.options.gmt"),
    },
    {
      value: "Asia/Tokyo",
      label: t("storeInformation.sections.basic.fields.timezone.options.jst"),
    },
    {
      value: "Australia/Sydney",
      label: t("storeInformation.sections.basic.fields.timezone.options.aest"),
    },
  ];

  // Create translated country options
  const countryOptions = [
    {
      value: "US",
      label: t("storeInformation.sections.address.fields.country.options.us"),
    },
    {
      value: "CA",
      label: t("storeInformation.sections.address.fields.country.options.ca"),
    },
    {
      value: "GB",
      label: t("storeInformation.sections.address.fields.country.options.gb"),
    },
    {
      value: "AU",
      label: t("storeInformation.sections.address.fields.country.options.au"),
    },
    {
      value: "DE",
      label: t("storeInformation.sections.address.fields.country.options.de"),
    },
    {
      value: "FR",
      label: t("storeInformation.sections.address.fields.country.options.fr"),
    },
    {
      value: "JP",
      label: t("storeInformation.sections.address.fields.country.options.jp"),
    },
  ];

  // Create translated business type options
  const businessTypeOptions = [
    {
      value: "retail",
      label: t(
        "storeInformation.sections.business.fields.businessType.options.retail"
      ),
    },
    {
      value: "wholesale",
      label: t(
        "storeInformation.sections.business.fields.businessType.options.wholesale"
      ),
    },
    {
      value: "manufacturing",
      label: t(
        "storeInformation.sections.business.fields.businessType.options.manufacturing"
      ),
    },
    {
      value: "service",
      label: t(
        "storeInformation.sections.business.fields.businessType.options.service"
      ),
    },
    {
      value: "digital",
      label: t(
        "storeInformation.sections.business.fields.businessType.options.digital"
      ),
    },
  ];

  // Create translated currency options
  const currencyOptions = [
    {
      value: "USD",
      label: t(
        "storeInformation.sections.business.fields.currency.options.usd"
      ),
    },
    {
      value: "EUR",
      label: t(
        "storeInformation.sections.business.fields.currency.options.eur"
      ),
    },
    {
      value: "GBP",
      label: t(
        "storeInformation.sections.business.fields.currency.options.gbp"
      ),
    },
    {
      value: "CAD",
      label: t(
        "storeInformation.sections.business.fields.currency.options.cad"
      ),
    },
    {
      value: "AUD",
      label: t(
        "storeInformation.sections.business.fields.currency.options.aud"
      ),
    },
    {
      value: "JPY",
      label: t(
        "storeInformation.sections.business.fields.currency.options.jpy"
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center justify-between">
          <BackButton onClick={onBack} label={t("common.back")} />
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
            {t("storeInformation.saveChanges")}
          </button>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Store className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {t("storeInformation.title")}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {t("storeInformation.description")}
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
              {t("storeInformation.sections.basic.title")}
            </h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <InputField
                label={t(
                  "storeInformation.sections.basic.fields.storeName.label"
                )}
                name="storeName"
                required
                placeholder={t(
                  "storeInformation.sections.basic.fields.storeName.placeholder"
                )}
              />
              <InputField
                label={t("storeInformation.sections.basic.fields.email.label")}
                name="email"
                type="email"
                required
                placeholder={t(
                  "storeInformation.sections.basic.fields.email.placeholder"
                )}
              />
              <InputField
                label={t("storeInformation.sections.basic.fields.phone.label")}
                name="phone"
                type="tel"
                required
                placeholder={t(
                  "storeInformation.sections.basic.fields.phone.placeholder"
                )}
                pattern="[+]?[0-9\s-()]+"
              />
              <SelectField
                label={t(
                  "storeInformation.sections.basic.fields.timezone.label"
                )}
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                options={timezoneOptions}
              />
              <InputField
                label={t(
                  "storeInformation.sections.basic.fields.website.label"
                )}
                name="website"
                type="url"
                placeholder={t(
                  "storeInformation.sections.basic.fields.website.placeholder"
                )}
              />
              <div className="sm:col-span-2">
                <TextAreaField
                  label={t(
                    "storeInformation.sections.basic.fields.description.label"
                  )}
                  name="description"
                  placeholder={t(
                    "storeInformation.sections.basic.fields.description.placeholder"
                  )}
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
              {t("storeInformation.sections.address.title")}
            </h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <InputField
                  label={t(
                    "storeInformation.sections.address.fields.streetAddress.label"
                  )}
                  name="address"
                  required
                  placeholder={t(
                    "storeInformation.sections.address.fields.streetAddress.placeholder"
                  )}
                />
              </div>
              <InputField
                label={t("storeInformation.sections.address.fields.city.label")}
                name="city"
                required
                placeholder={t(
                  "storeInformation.sections.address.fields.city.placeholder"
                )}
              />
              <InputField
                label={t(
                  "storeInformation.sections.address.fields.state.label"
                )}
                name="state"
                required
                placeholder={t(
                  "storeInformation.sections.address.fields.state.placeholder"
                )}
              />
              <InputField
                label={t("storeInformation.sections.address.fields.zip.label")}
                name="zip"
                required
                placeholder={t(
                  "storeInformation.sections.address.fields.zip.placeholder"
                )}
              />
              <SelectField
                label={t(
                  "storeInformation.sections.address.fields.country.label"
                )}
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                options={countryOptions}
              />
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="space-y-6">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              {t("storeInformation.sections.business.title")}
            </h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <InputField
                label={t(
                  "storeInformation.sections.business.fields.taxId.label"
                )}
                name="taxId"
                placeholder={t(
                  "storeInformation.sections.business.fields.taxId.placeholder"
                )}
              />
              <SelectField
                label={t(
                  "storeInformation.sections.business.fields.businessType.label"
                )}
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                options={businessTypeOptions}
              />
              <SelectField
                label={t(
                  "storeInformation.sections.business.fields.currency.label"
                )}
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                options={currencyOptions}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StoreInformation;

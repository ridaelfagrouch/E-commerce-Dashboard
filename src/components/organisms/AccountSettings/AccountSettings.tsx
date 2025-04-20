import React, { useState } from "react";
import { User, Camera, Globe, AlertCircle } from "lucide-react";
import BackButton from "../../atoms/BackButton/BackButton";
import { useTranslation } from "react-i18next";

interface AccountSettingsProps {
  onBack: () => void;
}

interface FormErrors {
  [key: string]: string;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    language: "en",
    timezone: "America/New_York",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isDirty, setIsDirty] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t(
        "accountSettings.sections.personalInformation.fields.firstName.error"
      );
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t(
        "accountSettings.sections.personalInformation.fields.lastName.error"
      );
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = t(
        "accountSettings.sections.personalInformation.fields.email.error"
      );
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  const SelectField = ({
    label,
    name,
    children,
  }: {
    label: string;
    name: keyof typeof formData;
    children: React.ReactNode;
  }) => (
    <div className="relative">
      <label
        htmlFor={name}
        className="block text-sm font-medium mb-1.5 text-gray-900"
      >
        {label}
      </label>
      <div className="relative group">
        <select
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="
            appearance-none
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
          "
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 group-focus-within:shadow-[0_0_0_4px_rgba(99,102,241,0.1)]" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center justify-between">
          <BackButton onClick={onBack} label={t("settingCommon.back")} />
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
            {t("accountSettings.saveChanges")}
          </button>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
            <User className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {t("accountSettings.title")}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {t("accountSettings.description")}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Profile Picture */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            {t("accountSettings.sections.profilePicture.title")}
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 rounded-full bg-white p-1.5 border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors duration-200"
                >
                  <Camera className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {t("accountSettings.sections.profilePicture.changeText")}
                </p>
                <p className="text-sm text-gray-500">
                  {t("accountSettings.sections.profilePicture.fileTypes")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            {t("accountSettings.sections.personalInformation.title")}
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <InputField
                label={t(
                  "accountSettings.sections.personalInformation.fields.firstName.label"
                )}
                name="firstName"
                required
                placeholder={t(
                  "accountSettings.sections.personalInformation.fields.firstName.placeholder"
                )}
              />
              <InputField
                label={t(
                  "accountSettings.sections.personalInformation.fields.lastName.label"
                )}
                name="lastName"
                required
                placeholder={t(
                  "accountSettings.sections.personalInformation.fields.lastName.placeholder"
                )}
              />
              <InputField
                label={t(
                  "accountSettings.sections.personalInformation.fields.email.label"
                )}
                name="email"
                type="email"
                required
                placeholder={t(
                  "accountSettings.sections.personalInformation.fields.email.placeholder"
                )}
              />
              <InputField
                label={t(
                  "accountSettings.sections.personalInformation.fields.phone.label"
                )}
                name="phone"
                type="tel"
                placeholder={t(
                  "accountSettings.sections.personalInformation.fields.phone.placeholder"
                )}
                pattern="[+]?[0-9\s-()]+"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Globe className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              {t("accountSettings.sections.preferences.title")}
            </h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <SelectField
                label={t(
                  "accountSettings.sections.preferences.fields.language.label"
                )}
                name="language"
              >
                <option value="en">
                  {t(
                    "accountSettings.sections.preferences.fields.language.options.en"
                  )}
                </option>
                <option value="es">
                  {t(
                    "accountSettings.sections.preferences.fields.language.options.es"
                  )}
                </option>
                <option value="fr">
                  {t(
                    "accountSettings.sections.preferences.fields.language.options.fr"
                  )}
                </option>
                <option value="de">
                  {t(
                    "accountSettings.sections.preferences.fields.language.options.de"
                  )}
                </option>
              </SelectField>
              <SelectField
                label={t(
                  "accountSettings.sections.preferences.fields.timezone.label"
                )}
                name="timezone"
              >
                <option value="America/New_York">
                  {t(
                    "accountSettings.sections.preferences.fields.timezone.options.america_new_york"
                  )}
                </option>
                <option value="America/Chicago">
                  {t(
                    "accountSettings.sections.preferences.fields.timezone.options.america_chicago"
                  )}
                </option>
                <option value="America/Denver">
                  {t(
                    "accountSettings.sections.preferences.fields.timezone.options.america_denver"
                  )}
                </option>
                <option value="America/Los_Angeles">
                  {t(
                    "accountSettings.sections.preferences.fields.timezone.options.america_los_angeles"
                  )}
                </option>
                <option value="Europe/London">
                  {t(
                    "accountSettings.sections.preferences.fields.timezone.options.europe_london"
                  )}
                </option>
              </SelectField>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;

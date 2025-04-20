import React, { useState } from "react";
import { Shield, Key, Smartphone, AlertCircle } from "lucide-react";
import BackButton from "../../atoms/BackButton/BackButton";
import Switch from "../../atoms/Switch/Switch";
import { useTranslation } from "react-i18next";

interface SecuritySettingsProps {
  onBack: () => void;
}

interface FormErrors {
  [key: string]: string;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ onBack }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    sessionTimeout: "30",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isDirty, setIsDirty] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = t(
        "security.validation.currentPasswordRequired"
      );
    }

    if (formData.newPassword) {
      if (formData.newPassword.length < 8) {
        newErrors.newPassword = t("security.validation.passwordLength");
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = t("security.validation.passwordsMatch");
      }
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
  }: {
    label: string;
    name: keyof typeof formData;
    type?: string;
    required?: boolean;
    placeholder?: string;
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
            {t("security.saveChanges")}
          </button>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Shield className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {t("security.title")}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {t("security.description")}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Password Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            {t("security.sections.password.title")}
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-6">
              <InputField
                label={t("security.sections.password.fields.currentPassword")}
                name="currentPassword"
                type="password"
                required
                placeholder={t(
                  "security.sections.password.placeholders.currentPassword"
                )}
              />
              <InputField
                label={t("security.sections.password.fields.newPassword")}
                name="newPassword"
                type="password"
                placeholder={t(
                  "security.sections.password.placeholders.newPassword"
                )}
              />
              <InputField
                label={t("security.sections.password.fields.confirmPassword")}
                name="confirmPassword"
                type="password"
                placeholder={t(
                  "security.sections.password.placeholders.confirmPassword"
                )}
              />
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            {t("security.sections.twoFactor.title")}
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Smartphone className="w-6 h-6 text-gray-400" />
              </div>
              <div className="ml-3 flex-1">
                <Switch
                  checked={twoFactorEnabled}
                  onChange={setTwoFactorEnabled}
                  label={t("security.sections.twoFactor.enable")}
                  description={t("security.sections.twoFactor.description")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Session Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            {t("security.sections.session.title")}
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Key className="w-6 h-6 text-gray-400" />
                </div>
                <div className="ml-3 flex-1">
                  <SelectField
                    label={t("security.sections.session.timeout")}
                    name="sessionTimeout"
                  >
                    <option value="15">
                      {t("security.sections.session.timeoutOptions.15min")}
                    </option>
                    <option value="30">
                      {t("security.sections.session.timeoutOptions.30min")}
                    </option>
                    <option value="60">
                      {t("security.sections.session.timeoutOptions.1hour")}
                    </option>
                    <option value="120">
                      {t("security.sections.session.timeoutOptions.2hours")}
                    </option>
                    <option value="240">
                      {t("security.sections.session.timeoutOptions.4hours")}
                    </option>
                  </SelectField>
                  <p className="mt-2 text-sm text-gray-500">
                    {t("security.sections.session.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SecuritySettings;

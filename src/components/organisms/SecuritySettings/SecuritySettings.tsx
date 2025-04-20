import React, { useState } from "react";
import { Shield, Key, Smartphone } from "lucide-react";
import BackButton from "../../atoms/BackButton/BackButton";
import Switch from "../../atoms/Switch/Switch";
import { useTranslation } from "react-i18next";
import InputField from "../../atoms/InputField/InputField";
import SelectField from "../../atoms/SelectField/SelectField";

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

  // Create session timeout options
  const timeoutOptions = [
    {
      value: "15",
      label: t("security.sections.session.timeoutOptions.15min"),
    },
    {
      value: "30",
      label: t("security.sections.session.timeoutOptions.30min"),
    },
    {
      value: "60",
      label: t("security.sections.session.timeoutOptions.1hour"),
    },
    {
      value: "120",
      label: t("security.sections.session.timeoutOptions.2hours"),
    },
    {
      value: "240",
      label: t("security.sections.session.timeoutOptions.4hours"),
    },
  ];

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
                value={formData.currentPassword}
                onChange={handleInputChange}
                error={errors.currentPassword}
                required
                placeholder={t(
                  "security.sections.password.placeholders.currentPassword"
                )}
              />
              <InputField
                label={t("security.sections.password.fields.newPassword")}
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleInputChange}
                error={errors.newPassword}
                placeholder={t(
                  "security.sections.password.placeholders.newPassword"
                )}
              />
              <InputField
                label={t("security.sections.password.fields.confirmPassword")}
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
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
                    value={formData.sessionTimeout}
                    onChange={handleInputChange}
                    options={timeoutOptions}
                  />
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

import React, { useState } from "react";
import { User, Camera, Globe } from "lucide-react";
import BackButton from "../../atoms/BackButton/BackButton";
import { useTranslation } from "react-i18next";
import InputField from "../../atoms/InputField/InputField";
import SelectField from "../../atoms/SelectField/SelectField";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
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
    setIsDirty(true);
  };

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
                value={formData.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
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
                value={formData.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
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
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
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
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
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
                value={formData.language}
                onChange={handleInputChange}
                error={errors.language}
                options={[
                  {
                    value: "en",
                    label: t(
                      "accountSettings.sections.preferences.fields.language.options.en"
                    ),
                  },
                  {
                    value: "es",
                    label: t(
                      "accountSettings.sections.preferences.fields.language.options.es"
                    ),
                  },
                  {
                    value: "fr",
                    label: t(
                      "accountSettings.sections.preferences.fields.language.options.fr"
                    ),
                  },
                  {
                    value: "de",
                    label: t(
                      "accountSettings.sections.preferences.fields.language.options.de"
                    ),
                  },
                ]}
              />
              <SelectField
                label={t(
                  "accountSettings.sections.preferences.fields.timezone.label"
                )}
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                error={errors.timezone}
                options={[
                  {
                    value: "America/New_York",
                    label: t(
                      "accountSettings.sections.preferences.fields.timezone.options.america_new_york"
                    ),
                  },
                  {
                    value: "America/Chicago",
                    label: t(
                      "accountSettings.sections.preferences.fields.timezone.options.america_chicago"
                    ),
                  },
                  {
                    value: "America/Denver",
                    label: t(
                      "accountSettings.sections.preferences.fields.timezone.options.america_denver"
                    ),
                  },
                  {
                    value: "America/Los_Angeles",
                    label: t(
                      "accountSettings.sections.preferences.fields.timezone.options.america_los_angeles"
                    ),
                  },
                  {
                    value: "Europe/London",
                    label: t(
                      "accountSettings.sections.preferences.fields.timezone.options.europe_london"
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;

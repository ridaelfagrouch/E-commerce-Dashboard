import React, { useState } from "react";
import { Store, User, Bell, Shield } from "lucide-react";
import SettingsCard from "../../components/molecules/SettingsCard/SettingsCard";
import StoreInformation from "../../components/organisms/StoreSettings/StoreInformation";
import SecuritySettings from "../../components/organisms/SecuritySettings/SecuritySettings";
import NotificationSettings from "../../components/organisms/NotificationSettings/NotificationSettings";
import AccountSettings from "../../components/organisms/AccountSettings/AccountSettings";
import { useTranslation } from "react-i18next";

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleBack = () => {
    setActiveSection(null);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "store":
        return <StoreInformation onBack={handleBack} />;
      case "security":
        return <SecuritySettings onBack={handleBack} />;
      case "notifications":
        return <NotificationSettings onBack={handleBack} />;
      case "account":
        return <AccountSettings onBack={handleBack} />;
      default:
        return (
          <div className="space-y-8">
            {/* Store Settings */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {t("settings.sections.store.title")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SettingsCard
                  title={t("settings.sections.store.cards.storeInfo.title")}
                  description={t(
                    "settings.sections.store.cards.storeInfo.description"
                  )}
                  icon={<Store className="w-5 h-5" />}
                  onClick={() => setActiveSection("store")}
                />
              </div>
            </div>

            {/* Account Settings */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {t("settings.sections.account.title")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SettingsCard
                  title={t("settings.sections.account.cards.profile.title")}
                  description={t(
                    "settings.sections.account.cards.profile.description"
                  )}
                  icon={<User className="w-5 h-5" />}
                  onClick={() => setActiveSection("account")}
                />
                <SettingsCard
                  title={t("settings.sections.account.cards.security.title")}
                  description={t(
                    "settings.sections.account.cards.security.description"
                  )}
                  icon={<Shield className="w-5 h-5" />}
                  onClick={() => setActiveSection("security")}
                />
                <SettingsCard
                  title={t(
                    "settings.sections.account.cards.notifications.title"
                  )}
                  description={t(
                    "settings.sections.account.cards.notifications.description"
                  )}
                  icon={<Bell className="w-5 h-5" />}
                  onClick={() => setActiveSection("notifications")}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="mb-6">
      <div className="max-w-7xl mx-auto">
        {!activeSection && (
          <div className="mb-8">
            <h1 className="text-2xl font-bold">{t("settings.title")}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {t("settings.description")}
            </p>
          </div>
        )}
        {renderSection()}
      </div>
    </div>
  );
};

export default Settings;

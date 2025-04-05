import React, { useState } from "react";
import { Store, User, Bell, Shield } from "lucide-react";
import SettingsCard from "../../components/molecules/SettingsCard/SettingsCard";
import StoreInformation from "../../components/organisms/StoreSettings/StoreInformation";
import SecuritySettings from "../../components/organisms/SecuritySettings/SecuritySettings";
import NotificationSettings from "../../components/organisms/NotificationSettings/NotificationSettings";
import AccountSettings from "../../components/organisms/AccountSettings/AccountSettings";

const Settings: React.FC = () => {
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
                Store Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SettingsCard
                  title="Store Information"
                  description="Manage your store details and business information"
                  icon={<Store className="w-5 h-5" />}
                  onClick={() => setActiveSection("store")}
                />
              </div>
            </div>

            {/* Account Settings */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Account Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SettingsCard
                  title="Profile Settings"
                  description="Manage your personal information and preferences"
                  icon={<User className="w-5 h-5" />}
                  onClick={() => setActiveSection("account")}
                />
                <SettingsCard
                  title="Security"
                  description="Manage password, 2FA, and security settings"
                  icon={<Shield className="w-5 h-5" />}
                  onClick={() => setActiveSection("security")}
                />
                <SettingsCard
                  title="Notifications"
                  description="Configure email and push notifications"
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
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your store and account settings
            </p>
          </div>
        )}
        {renderSection()}
      </div>
    </div>
  );
};

export default Settings;

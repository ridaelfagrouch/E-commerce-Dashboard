import React, { useState } from "react";
import {
  Bell,
  Mail,
  Smartphone,
  Loader2,
  Globe,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import BackButton from "../../atoms/BackButton/BackButton";
import Switch from "../../atoms/Switch/Switch";
import { useTranslation } from "react-i18next";

interface NotificationSettingsProps {
  onBack: () => void;
}

interface NotificationSettings {
  // Email Notifications
  emailNotifications: boolean;
  orderUpdates: boolean;
  promotionalEmails: boolean;
  newsletterEmails: boolean;
  inventoryAlerts: boolean;
  customerReviews: boolean;

  // Push Notifications
  pushNotifications: boolean;
  orderAlerts: boolean;
  stockAlerts: boolean;
  securityAlerts: boolean;
  salesReports: boolean;
  newCustomers: boolean;

  // Browser Notifications
  browserNotifications: boolean;
  newOrders: boolean;
  chatMessages: boolean;
  systemUpdates: boolean;

  // Marketing Notifications
  marketingNotifications: boolean;
  promotions: boolean;
  campaigns: boolean;
  analytics: boolean;

  // System Notifications
  systemNotifications: boolean;
  maintenance: boolean;
  performance: boolean;
  errors: boolean;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  onBack,
}) => {
  const { t } = useTranslation();
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings>({
    // Email Notifications
    emailNotifications: true,
    orderUpdates: true,
    promotionalEmails: false,
    newsletterEmails: true,
    inventoryAlerts: true,
    customerReviews: true,

    // Push Notifications
    pushNotifications: true,
    orderAlerts: true,
    stockAlerts: true,
    securityAlerts: true,
    salesReports: false,
    newCustomers: true,

    // Browser Notifications
    browserNotifications: true,
    newOrders: true,
    chatMessages: true,
    systemUpdates: false,

    // Marketing Notifications
    marketingNotifications: false,
    promotions: false,
    campaigns: false,
    analytics: false,

    // System Notifications
    systemNotifications: true,
    maintenance: true,
    performance: true,
    errors: true,
  });

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: !prev[key] };

      // If main toggle is turned off, disable all related sub-settings
      if (key === "emailNotifications" && !newSettings.emailNotifications) {
        newSettings.orderUpdates = false;
        newSettings.promotionalEmails = false;
        newSettings.newsletterEmails = false;
        newSettings.inventoryAlerts = false;
        newSettings.customerReviews = false;
      }
      if (key === "pushNotifications" && !newSettings.pushNotifications) {
        newSettings.orderAlerts = false;
        newSettings.stockAlerts = false;
        newSettings.securityAlerts = false;
        newSettings.salesReports = false;
        newSettings.newCustomers = false;
      }
      if (key === "browserNotifications" && !newSettings.browserNotifications) {
        newSettings.newOrders = false;
        newSettings.chatMessages = false;
        newSettings.systemUpdates = false;
      }
      if (
        key === "marketingNotifications" &&
        !newSettings.marketingNotifications
      ) {
        newSettings.promotions = false;
        newSettings.campaigns = false;
        newSettings.analytics = false;
      }
      if (key === "systemNotifications" && !newSettings.systemNotifications) {
        newSettings.maintenance = false;
        newSettings.performance = false;
        newSettings.errors = false;
      }

      return newSettings;
    });
    setIsDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsDirty(false);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center justify-between mb-6">
          <BackButton onClick={onBack} label={t("settingCommon.back")} />
          <button
            type="button"
            disabled={!isDirty || isSaving}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isDirty && !isSaving
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
          >
            {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isSaving
              ? t("notifications.saving")
              : t("notifications.saveChanges")}
          </button>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Bell className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {t("notifications.title")}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {t("notifications.description")}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Email Notifications */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              {t("notifications.sections.email.title")}
            </h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <Switch
              checked={settings.emailNotifications}
              onChange={() => handleToggle("emailNotifications")}
              label={t("notifications.sections.email.enable")}
              description={t("notifications.sections.email.description")}
              name="emailNotifications"
              required
            />
            <div className="pl-8 space-y-6">
              <Switch
                checked={settings.orderUpdates}
                onChange={() => handleToggle("orderUpdates")}
                label={t("notifications.sections.email.orderUpdates.label")}
                description={t(
                  "notifications.sections.email.orderUpdates.description"
                )}
                disabled={!settings.emailNotifications}
                name="orderUpdates"
              />
              <Switch
                checked={settings.promotionalEmails}
                onChange={() => handleToggle("promotionalEmails")}
                label={t("notifications.sections.email.promotional.label")}
                description={t(
                  "notifications.sections.email.promotional.description"
                )}
                disabled={!settings.emailNotifications}
                name="promotionalEmails"
              />
              <Switch
                checked={settings.newsletterEmails}
                onChange={() => handleToggle("newsletterEmails")}
                label={t("notifications.sections.email.newsletter.label")}
                description={t(
                  "notifications.sections.email.newsletter.description"
                )}
                disabled={!settings.emailNotifications}
                name="newsletterEmails"
              />
              <Switch
                checked={settings.inventoryAlerts}
                onChange={() => handleToggle("inventoryAlerts")}
                label={t("notifications.sections.email.inventory.label")}
                description={t(
                  "notifications.sections.email.inventory.description"
                )}
                disabled={!settings.emailNotifications}
                name="inventoryAlerts"
              />
              <Switch
                checked={settings.customerReviews}
                onChange={() => handleToggle("customerReviews")}
                label={t("notifications.sections.email.reviews.label")}
                description={t(
                  "notifications.sections.email.reviews.description"
                )}
                disabled={!settings.emailNotifications}
                name="customerReviews"
              />
            </div>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Smartphone className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              {t("notifications.sections.push.title")}
            </h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <Switch
              checked={settings.pushNotifications}
              onChange={() => handleToggle("pushNotifications")}
              label={t("notifications.sections.push.enable")}
              description={t("notifications.sections.push.description")}
              name="pushNotifications"
              required
            />
            <div className="pl-8 space-y-6">
              <Switch
                checked={settings.orderAlerts}
                onChange={() => handleToggle("orderAlerts")}
                label={t("notifications.sections.push.orderAlerts.label")}
                description={t(
                  "notifications.sections.push.orderAlerts.description"
                )}
                disabled={!settings.pushNotifications}
                name="orderAlerts"
              />
              <Switch
                checked={settings.stockAlerts}
                onChange={() => handleToggle("stockAlerts")}
                label={t("notifications.sections.push.stockAlerts.label")}
                description={t(
                  "notifications.sections.push.stockAlerts.description"
                )}
                disabled={!settings.pushNotifications}
                name="stockAlerts"
              />
              <Switch
                checked={settings.securityAlerts}
                onChange={() => handleToggle("securityAlerts")}
                label={t("notifications.sections.push.securityAlerts.label")}
                description={t(
                  "notifications.sections.push.securityAlerts.description"
                )}
                disabled={!settings.pushNotifications}
                name="securityAlerts"
              />
              <Switch
                checked={settings.salesReports}
                onChange={() => handleToggle("salesReports")}
                label={t("notifications.sections.push.salesReports.label")}
                description={t(
                  "notifications.sections.push.salesReports.description"
                )}
                disabled={!settings.pushNotifications}
                name="salesReports"
              />
              <Switch
                checked={settings.newCustomers}
                onChange={() => handleToggle("newCustomers")}
                label={t("notifications.sections.push.newCustomers.label")}
                description={t(
                  "notifications.sections.push.newCustomers.description"
                )}
                disabled={!settings.pushNotifications}
                name="newCustomers"
              />
            </div>
          </div>
        </div>

        {/* Browser Notifications */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Globe className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              {t("notifications.sections.browser.title")}
            </h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <Switch
              checked={settings.browserNotifications}
              onChange={() => handleToggle("browserNotifications")}
              label={t("notifications.sections.browser.enable")}
              description={t("notifications.sections.browser.description")}
              name="browserNotifications"
              required
            />
            <div className="pl-8 space-y-6">
              <Switch
                checked={settings.newOrders}
                onChange={() => handleToggle("newOrders")}
                label={t("notifications.sections.browser.newOrders.label")}
                description={t(
                  "notifications.sections.browser.newOrders.description"
                )}
                disabled={!settings.browserNotifications}
                name="newOrders"
              />
              <Switch
                checked={settings.chatMessages}
                onChange={() => handleToggle("chatMessages")}
                label={t("notifications.sections.browser.chatMessages.label")}
                description={t(
                  "notifications.sections.browser.chatMessages.description"
                )}
                disabled={!settings.browserNotifications}
                name="chatMessages"
              />
              <Switch
                checked={settings.systemUpdates}
                onChange={() => handleToggle("systemUpdates")}
                label={t("notifications.sections.browser.systemUpdates.label")}
                description={t(
                  "notifications.sections.browser.systemUpdates.description"
                )}
                disabled={!settings.browserNotifications}
                name="systemUpdates"
              />
            </div>
          </div>
        </div>

        {/* Marketing Notifications */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              {t("notifications.sections.marketing.title")}
            </h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <Switch
              checked={settings.marketingNotifications}
              onChange={() => handleToggle("marketingNotifications")}
              label={t("notifications.sections.marketing.enable")}
              description={t("notifications.sections.marketing.description")}
              name="marketingNotifications"
            />
            <div className="pl-8 space-y-6">
              <Switch
                checked={settings.promotions}
                onChange={() => handleToggle("promotions")}
                label={t("notifications.sections.marketing.promotions.label")}
                description={t(
                  "notifications.sections.marketing.promotions.description"
                )}
                disabled={!settings.marketingNotifications}
                name="promotions"
              />
              <Switch
                checked={settings.campaigns}
                onChange={() => handleToggle("campaigns")}
                label={t("notifications.sections.marketing.campaigns.label")}
                description={t(
                  "notifications.sections.marketing.campaigns.description"
                )}
                disabled={!settings.marketingNotifications}
                name="campaigns"
              />
              <Switch
                checked={settings.analytics}
                onChange={() => handleToggle("analytics")}
                label={t("notifications.sections.marketing.analytics.label")}
                description={t(
                  "notifications.sections.marketing.analytics.description"
                )}
                disabled={!settings.marketingNotifications}
                name="analytics"
              />
            </div>
          </div>
        </div>

        {/* System Notifications */}
        <div className="space-y-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              {t("notifications.sections.system.title")}
            </h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <Switch
              checked={settings.systemNotifications}
              onChange={() => handleToggle("systemNotifications")}
              label={t("notifications.sections.system.enable")}
              description={t("notifications.sections.system.description")}
              name="systemNotifications"
              required
            />
            <div className="pl-8 space-y-6">
              <Switch
                checked={settings.maintenance}
                onChange={() => handleToggle("maintenance")}
                label={t("notifications.sections.system.maintenance.label")}
                description={t(
                  "notifications.sections.system.maintenance.description"
                )}
                disabled={!settings.systemNotifications}
                name="maintenance"
              />
              <Switch
                checked={settings.performance}
                onChange={() => handleToggle("performance")}
                label={t("notifications.sections.system.performance.label")}
                description={t(
                  "notifications.sections.system.performance.description"
                )}
                disabled={!settings.systemNotifications}
                name="performance"
              />
              <Switch
                checked={settings.errors}
                onChange={() => handleToggle("errors")}
                label={t("notifications.sections.system.errors.label")}
                description={t(
                  "notifications.sections.system.errors.description"
                )}
                disabled={!settings.systemNotifications}
                name="errors"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NotificationSettings;

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
          <BackButton onClick={onBack} label="Settings" />
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
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Bell className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Notification Settings
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage how you receive notifications and alerts
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
              Email Notifications
            </h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <Switch
              checked={settings.emailNotifications}
              onChange={() => handleToggle("emailNotifications")}
              label="Enable Email Notifications"
              description="Receive important updates and alerts via email"
              name="emailNotifications"
              required
            />
            <div className="pl-8 space-y-6">
              <Switch
                checked={settings.orderUpdates}
                onChange={() => handleToggle("orderUpdates")}
                label="Order Updates"
                description="Get notified about order status changes and shipping updates"
                disabled={!settings.emailNotifications}
                name="orderUpdates"
              />
              <Switch
                checked={settings.promotionalEmails}
                onChange={() => handleToggle("promotionalEmails")}
                label="Promotional Emails"
                description="Receive news about products, features, and special offers"
                disabled={!settings.emailNotifications}
                name="promotionalEmails"
              />
              <Switch
                checked={settings.newsletterEmails}
                onChange={() => handleToggle("newsletterEmails")}
                label="Newsletter"
                description="Receive our weekly newsletter with industry insights"
                disabled={!settings.emailNotifications}
                name="newsletterEmails"
              />
              <Switch
                checked={settings.inventoryAlerts}
                onChange={() => handleToggle("inventoryAlerts")}
                label="Inventory Alerts"
                description="Get notified when products are running low or out of stock"
                disabled={!settings.emailNotifications}
                name="inventoryAlerts"
              />
              <Switch
                checked={settings.customerReviews}
                onChange={() => handleToggle("customerReviews")}
                label="Customer Reviews"
                description="Receive notifications when customers leave reviews"
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
              Push Notifications
            </h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <Switch
              checked={settings.pushNotifications}
              onChange={() => handleToggle("pushNotifications")}
              label="Enable Push Notifications"
              description="Receive real-time notifications on your device"
              name="pushNotifications"
              required
            />
            <div className="pl-8 space-y-6">
              <Switch
                checked={settings.orderAlerts}
                onChange={() => handleToggle("orderAlerts")}
                label="Order Alerts"
                description="Get instant notifications for new orders and updates"
                disabled={!settings.pushNotifications}
                name="orderAlerts"
              />
              <Switch
                checked={settings.stockAlerts}
                onChange={() => handleToggle("stockAlerts")}
                label="Stock Alerts"
                description="Be notified when inventory levels are low"
                disabled={!settings.pushNotifications}
                name="stockAlerts"
              />
              <Switch
                checked={settings.securityAlerts}
                onChange={() => handleToggle("securityAlerts")}
                label="Security Alerts"
                description="Get notified about important security events"
                disabled={!settings.pushNotifications}
                name="securityAlerts"
              />
              <Switch
                checked={settings.salesReports}
                onChange={() => handleToggle("salesReports")}
                label="Sales Reports"
                description="Receive daily and weekly sales performance reports"
                disabled={!settings.pushNotifications}
                name="salesReports"
              />
              <Switch
                checked={settings.newCustomers}
                onChange={() => handleToggle("newCustomers")}
                label="New Customers"
                description="Get notified when new customers register"
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
              Browser Notifications
            </h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <Switch
              checked={settings.browserNotifications}
              onChange={() => handleToggle("browserNotifications")}
              label="Enable Browser Notifications"
              description="Receive notifications in your web browser"
              name="browserNotifications"
              required
            />
            <div className="pl-8 space-y-6">
              <Switch
                checked={settings.newOrders}
                onChange={() => handleToggle("newOrders")}
                label="New Orders"
                description="Get desktop notifications for new orders"
                disabled={!settings.browserNotifications}
                name="newOrders"
              />
              <Switch
                checked={settings.chatMessages}
                onChange={() => handleToggle("chatMessages")}
                label="Chat Messages"
                description="Be notified when you receive new chat messages"
                disabled={!settings.browserNotifications}
                name="chatMessages"
              />
              <Switch
                checked={settings.systemUpdates}
                onChange={() => handleToggle("systemUpdates")}
                label="System Updates"
                description="Get notified about system updates and maintenance"
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
              Marketing Notifications
            </h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <Switch
              checked={settings.marketingNotifications}
              onChange={() => handleToggle("marketingNotifications")}
              label="Enable Marketing Notifications"
              description="Receive updates about marketing activities"
              name="marketingNotifications"
            />
            <div className="pl-8 space-y-6">
              <Switch
                checked={settings.promotions}
                onChange={() => handleToggle("promotions")}
                label="Promotions"
                description="Get notified about new promotional campaigns"
                disabled={!settings.marketingNotifications}
                name="promotions"
              />
              <Switch
                checked={settings.campaigns}
                onChange={() => handleToggle("campaigns")}
                label="Campaign Updates"
                description="Receive updates about ongoing marketing campaigns"
                disabled={!settings.marketingNotifications}
                name="campaigns"
              />
              <Switch
                checked={settings.analytics}
                onChange={() => handleToggle("analytics")}
                label="Analytics Reports"
                description="Get periodic marketing analytics reports"
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
              System Notifications
            </h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <Switch
              checked={settings.systemNotifications}
              onChange={() => handleToggle("systemNotifications")}
              label="Enable System Notifications"
              description="Receive important system alerts and updates"
              name="systemNotifications"
              required
            />
            <div className="pl-8 space-y-6">
              <Switch
                checked={settings.maintenance}
                onChange={() => handleToggle("maintenance")}
                label="Maintenance Updates"
                description="Get notified about scheduled maintenance"
                disabled={!settings.systemNotifications}
                name="maintenance"
              />
              <Switch
                checked={settings.performance}
                onChange={() => handleToggle("performance")}
                label="Performance Alerts"
                description="Receive alerts about system performance issues"
                disabled={!settings.systemNotifications}
                name="performance"
              />
              <Switch
                checked={settings.errors}
                onChange={() => handleToggle("errors")}
                label="Error Notifications"
                description="Get notified about critical system errors"
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

import React, { useState } from "react";
import { Plug, ExternalLink, Plus } from "lucide-react";
import BackButton from "../../atoms/BackButton/BackButton";
import Switch from "../../atoms/Switch/Switch";

interface IntegrationSettingsProps {
  onBack: () => void;
}

const IntegrationSettings: React.FC<IntegrationSettingsProps> = ({
  onBack,
}) => {
  const [isDirty, setIsDirty] = useState(false);
  const [integrations, setIntegrations] = useState({
    googleAnalytics: true,
    mailchimp: false,
    stripe: true,
    slack: false,
  });

  const handleToggle = (key: keyof typeof integrations) => {
    setIntegrations((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Integrations saved:", integrations);
  };

  const IntegrationCard = ({
    name,
    title,
    description,
    icon,
    connected = false,
  }: {
    name: keyof typeof integrations;
    title: string;
    description: string;
    icon: string;
    connected?: boolean;
  }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
            <img src={icon} alt={title} className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900">{title}</h4>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
            {connected && (
              <div className="mt-2 flex items-center">
                <span className="flex h-2 w-2 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-gray-500">Connected</span>
              </div>
            )}
          </div>
        </div>
        <Switch
          checked={integrations[name]}
          onChange={() => handleToggle(name)}
          label=""
        />
      </div>
      {integrations[name] && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center"
          >
            Configure
            <ExternalLink className="ml-2 h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 ">
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
            <Plug className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Integrations
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Connect and manage third-party services
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Active Integrations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Active Integrations
            </h3>
            <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="h-5 w-5 mr-1" />
              Add New
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <IntegrationCard
              name="googleAnalytics"
              title="Google Analytics"
              description="Track website traffic and user behavior"
              icon="/icons/google-analytics.svg"
              connected={integrations.googleAnalytics}
            />
            <IntegrationCard
              name="mailchimp"
              title="Mailchimp"
              description="Email marketing and automation platform"
              icon="/icons/mailchimp.svg"
              connected={integrations.mailchimp}
            />
            <IntegrationCard
              name="stripe"
              title="Stripe"
              description="Payment processing and subscriptions"
              icon="/icons/stripe.svg"
              connected={integrations.stripe}
            />
            <IntegrationCard
              name="slack"
              title="Slack"
              description="Team communication and notifications"
              icon="/icons/slack.svg"
              connected={integrations.slack}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default IntegrationSettings;

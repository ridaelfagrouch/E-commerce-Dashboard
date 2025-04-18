import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import English translation files
import enCommon from "./locales/en/common.json";
import enHeader from "./locales/en/header.json";
import enNavigation from "./locales/en/navigation.json";
import enDashboard from "./locales/en/dashboard.json";
import enOrders from "./locales/en/orders.json";
import enProducts from "./locales/en/products.json";
import enCustomers from "./locales/en/customers.json";
import enAnalytics from "./locales/en/analytics.json"

// Import French translation files
import frCommon from "./locales/fr/common.json";
import frHeader from "./locales/fr/header.json";
import frNavigation from "./locales/fr/navigation.json";
import frDashboard from "./locales/fr/dashboard.json";
import frOrders from "./locales/fr/orders.json";
import frProducts from "./locales/fr/products.json";
import frCustomers from "./locales/fr/customers.json";
import frAnalytics from "./locales/fr/analytics.json"


const resources = {
  en: {
    translation: {
      ...enCommon,
      ...enHeader,
      ...enNavigation,
      ...enDashboard,
      ...enOrders,
      ...enProducts,
      ...enCustomers,
      ...enAnalytics
    },
  },
  fr: {
    translation: {
      ...frCommon,
      ...frHeader,
      ...frNavigation,
      ...frDashboard,
      ...frOrders,
      ...frProducts,
      ...frCustomers,
      ...frAnalytics
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    debug: true, // Enable debug temporarily to see if translations are loading
  });

export default i18n;

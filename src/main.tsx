import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import i18n from "./i18n.ts";

// Wait for i18n initialization before rendering
i18n.init().then(() => {
  // Initialize language from localStorage or default to 'en'
  const savedLanguage = localStorage.getItem("language") || "en";
  document.documentElement.lang = savedLanguage;

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});

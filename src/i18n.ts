import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nextHttpBackend from "i18next-http-backend";

i18n
  .use(i18nextHttpBackend)
  .use(initReactI18next)
  .init({
    lng:
      localStorage.getItem("arisan") !== null
        ? JSON.parse(localStorage.getItem("arisan") || "")?.language
        : "id",
    fallbackLng: "id",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

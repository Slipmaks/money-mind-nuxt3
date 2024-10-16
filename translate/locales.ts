export default defineI18nConfig(() => ({
  legacy: false,
  locale: "ua",
  fallbackLocale: "ua",
  messages: {
    ua: require("./locales/ua.json"),
    en: require("./locales/en.json"),
  },
}));

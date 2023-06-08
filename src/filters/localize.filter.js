import store from "@/store";
import en from "../locales/en.json";
import ua from "../locales/ua.json";

const locales = {
  "en-US": en,
  "ua-UA": ua,
};
export default function localizeFilter(key) {
  const locale = store.getters.info.locale || "en-US";
  return locales[locale][key] || `[Localize error]: key ${key} not found`;
}

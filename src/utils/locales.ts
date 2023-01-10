import i18nConfig from "i18n";

const displayLocales = ["ENG", "IND", "中文", "日本語"];

const locales = i18nConfig.locales.map((locale, index) => ({
  label: displayLocales[index],
  value: locale,
}));

export default locales;

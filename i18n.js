module.exports = {
  defaultLocale: "en", // Default language of your website
  locales: ["en", "zh", "ja"], // Array with the languages that you want to use
  pages: {
    "*": ["common"], // Namespaces that you want to import per page
    "/": ["home"],
  },
};

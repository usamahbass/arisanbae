export const getCurrentLanguage = () =>
  JSON.parse(localStorage.getItem("arisan") || "")?.language;

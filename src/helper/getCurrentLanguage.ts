export const getCurrentLanguage = () => {
  const localStorageNotEmpty = localStorage.getItem("arisan") !== null;

  if (localStorageNotEmpty) {
    return JSON.parse(localStorage.getItem("arisan") || "")?.language;
  }

  return "id";
};

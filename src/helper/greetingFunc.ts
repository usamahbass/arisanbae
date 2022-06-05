export const greetingFunc = () => {
  const localData = localStorage.getItem("arisan");
  const isLanguage = JSON.parse(localData || "")?.language;

  const enData = [
    "Good Night",
    "Good Morning",
    "Good Evening",
    "Good Afternoon",
  ];
  const idData = [
    "Selamat Malam",
    "Selamat Pagi",
    "Selamat Siang",
    "Selamat Sore",
  ];

  const greetData = isLanguage === "id" ? idData : enData;

  const isDate: string | any = (new Date().getHours() / 24) * 4;

  let greet = greetData[parseInt(isDate)];

  return greet;
};

export const greetingFunc = () => {
  const isDate: string | any = (new Date().getHours() / 24) * 4;

  let greet = [
    "Selamat Malam",
    "Selamat Pagi",
    "Selamat Siang",
    "Selamat Sore",
  ][parseInt(isDate)];

  return greet;
};

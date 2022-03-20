import { replaceAll } from "./replaceAll";

export const convertPriceToInt = (price: string) => {
  const replaceRP = replaceAll(price, "Rp", "");
  const replaceSymbol = replaceAll(replaceRP, ",", "");

  return parseInt(replaceSymbol);
};

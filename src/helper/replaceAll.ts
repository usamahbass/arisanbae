export const replaceAll = (
  text: string,
  replaceFrom: string,
  replaceAfter: string
) => {
  const regex = new RegExp(replaceFrom, "g");
  const results = text?.replace(regex, replaceAfter);

  return results;
};

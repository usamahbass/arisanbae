export const createPaymentTermCount = (termType: string) => {
  const minimCount = termType === "day" ? 30 : 12;

  let results = [];

  for (let i = 1; i <= minimCount; i++) {
    results.push(i);
  }

  return results;
};

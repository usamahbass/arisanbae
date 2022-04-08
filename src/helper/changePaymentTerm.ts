export const changePaymentTerm = (paymentTerm: any) => {
  if (paymentTerm.type === "day") {
    return `${paymentTerm.content} Hari`;
  }

  return `${paymentTerm.content} Bulan`;
};

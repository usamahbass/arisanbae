export const toRupiah = (angka: number) => {
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
  return `${rupiah} ,-`;
};

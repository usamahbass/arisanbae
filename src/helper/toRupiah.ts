export const toRupiah = (angka: number | any) => {
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
  return `${rupiah} ,-`;
};

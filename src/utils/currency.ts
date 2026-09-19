/**
 * Format number to Indonesian Rupiah currency format
 * e.g. 100000 -> "Rp 100.000"
 */
export const formatRupiah = (amount: number | string | undefined | null): string => {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return 'Rp 0';
  }
  const num = typeof amount === 'string' ? parseInt(amount.replace(/\D/g, ''), 10) || 0 : amount;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

/**
 * Parse string like "Rp 100.000" or "100.000" to number 100000
 */
export const parseRupiah = (value: string | number): number => {
  if (typeof value === 'number') return value;
  const digits = value.replace(/\D/g, '');
  return digits ? parseInt(digits, 10) : 0;
};

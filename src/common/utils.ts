export const formatCurrency = (value: number) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(value));
};

export function formatPercentage(value: number, decimalPlaces = 1): string {
  const absValue = Math.abs(value);

  if (absValue < 1000) {
    return `${value.toFixed(decimalPlaces)}%`;
  }

  const suffixes = ["", "k", "M", "B", "T"];
  const suffixNum = Math.floor(Math.log10(absValue) / 3);
  const shortValue = absValue / Math.pow(1000, suffixNum);

  const formattedValue = shortValue.toFixed(decimalPlaces);
  const suffix = suffixes[suffixNum];

  return `${formattedValue}${suffix}%`;
}

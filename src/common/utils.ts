export const format = (value: number) => {
  return (
    "$" +
    value
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
};

export function formatPercentage(
  value: number,
  decimalPlaces = 1
): string {
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

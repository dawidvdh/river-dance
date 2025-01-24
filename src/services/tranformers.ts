import { ChartPrice, NormalizedValues } from "./types";

export const selectMetaData = (data: NormalizedValues) => {
  const openingPrice = data[0].value;
  const closingPrice = data[data.length - 1].value;

  const absoluteChange = closingPrice - openingPrice;
  const percentageChange = (closingPrice / openingPrice - 1) * 100;

  const highPrice = Math.max(...data.map(({ value }) => value));
  const lowPrice = Math.min(...data.map(({ value }) => value));

  const lastUpdate = data[data.length - 1].date;

  return {
    openingPrice,
    closingPrice,
    highPrice,
    lowPrice,
    absoluteChange,
    percentageChange,
    lastUpdate,
  };
};

export const transformChartData = (data: ChartPrice[]): NormalizedValues =>
  data
    .map(({ datetime, rate }) => ({
      date: new Date(datetime),
      value: parseFloat(rate),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

import { useQuery } from "@tanstack/react-query";
import {
  ChartDataRes,
  CurrentPrice,
  CurrentPriceRes,
  TimeFrameValues,
} from "./types";
import { selectMetaData, transformChartData } from "./tranformers";
import { chartQuery, priceQuery } from "./queries";
import { CHART_CACHE_EXPIRY, PRICE_CACHE_EXPIRY } from "./constants";

const endpoint = "https://river.com/api";

const bitcoinPriceRequest = async () => {
  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({ query: priceQuery }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

const chartHistoryRequest = async (timeFrame: TimeFrameValues) => {
  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({ query: chartQuery, variables: { timeFrame } }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export const useGetBitcoinPriceQuery = () =>
  useQuery({
    queryKey: ["price"],
    queryFn: async (): Promise<CurrentPriceRes> => bitcoinPriceRequest(),
    select: ({ data }) => ({
      price: parseFloat(data.currentPrice.mid),
      date: new Date(data.currentPrice.datetime),
    }),
    staleTime: PRICE_CACHE_EXPIRY,
  });

export const useRiverChartHistory = ({
  timeFrame,
}: {
  timeFrame: TimeFrameValues;
}) =>
  useQuery({
    queryKey: ["chart", timeFrame],
    queryFn: async ({ queryKey }): Promise<ChartDataRes> =>
      chartHistoryRequest(queryKey[1] as TimeFrameValues),
    select: ({ data }) => {
      const normalizedValues = transformChartData(data.chartPrices);

      return {
        chart: normalizedValues,
        currentPrice: parseFloat(data.currentPrice.mid),
        meta: selectMetaData(normalizedValues),
      };
    },
    staleTime: CHART_CACHE_EXPIRY[timeFrame],
  });

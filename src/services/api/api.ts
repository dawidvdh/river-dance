import { useQuery } from "@tanstack/react-query";
import { ChartDataRes, CurrentPriceRes, TimeFrameValues } from "./types";
import { selectMetaData, transformChartData } from "./tranformers";
import { chartQuery, priceQuery } from "./queries";
import { CHART_CACHE_EXPIRY, PRICE_CACHE_EXPIRY } from "./constants";

const API_ENDPOINT = "https://river.com/api";

const fetchFromApi = async (body: object) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const useGetBitcoinPriceQuery = () =>
  useQuery({
    queryKey: ["price"],
    queryFn: async (): Promise<CurrentPriceRes> =>
      fetchFromApi({ query: priceQuery }),
    select: ({ data }) => ({
      price: parseFloat(data.currentPrice.mid),
      date: new Date(data.currentPrice.datetime),
    }),
    staleTime: PRICE_CACHE_EXPIRY,
  });

export const useGetBitcoinChartQuery = ({
  timeFrame,
}: {
  timeFrame: TimeFrameValues;
}) =>
  useQuery({
    queryKey: ["chart", timeFrame],
    queryFn: async ({ queryKey }): Promise<ChartDataRes> =>
      fetchFromApi({
        query: chartQuery,
        variables: { timeFrame: queryKey[1] },
      }),
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

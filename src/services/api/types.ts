export type CurrentPrice = {
  mid: string;
  datetime: string;
};

export type ChartPrice = {
  datetime: string;
  rate: string;
};

export type ApiResponse<T> = {
  data: T;
};

export type ApiError = {
  errors: {
    message: string;
    locations: { line: number; column: number }[];
  }[];
};

export type ChartDataRes = ApiResponse<{
  chartPrices: ChartPrice[];
  currentPrice: CurrentPrice;
}>;

export type CurrentPriceRes = ApiResponse<{ currentPrice: CurrentPrice }>;

export type NormalizedValues = { date: Date; value: number }[];

export type TimeFrameValues = "ALL" | "YEAR" | "MONTH" | "WEEK" | "DAY";

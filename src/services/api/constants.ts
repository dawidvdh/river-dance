import { TimeFrameValues } from "./types";
import { hoursToMilliseconds, minutesToMilliseconds } from "date-fns";

export const PRICE_CACHE_EXPIRY = minutesToMilliseconds(60);

export const CHART_CACHE_EXPIRY: Record<TimeFrameValues, number> = {
  DAY: minutesToMilliseconds(15),
  WEEK: minutesToMilliseconds(30),
  MONTH: hoursToMilliseconds(2),
  YEAR: hoursToMilliseconds(12),
  ALL: hoursToMilliseconds(24),
};

export const TIME_FRAMES: { label: string; value: TimeFrameValues }[] = [
  { label: "1D", value: "DAY" },
  { label: "1W", value: "WEEK" },
  { label: "1M", value: "MONTH" },
  { label: "1Y", value: "YEAR" },
  { label: "All", value: "ALL" },
];

import { Skia } from "@shopify/react-native-skia";
import {
  GRAPH_PADDING_Y,
  GRAPH_PADDING_X,
  GRAPH_HEIGHT,
  GRAPH_WIDTH,
} from "./constants";
import * as d3 from "d3";
import { GraphPoint } from "./types";

/**
 * Creates graph path with scales and path boundaries
 * @returns Object with max, min values and Skia path
 */
export const createGraphPath = ({
  data,
  width = GRAPH_WIDTH,
  height = GRAPH_HEIGHT,
  paddingX = GRAPH_PADDING_X,
  paddingY = GRAPH_PADDING_Y,
}: {
  data: GraphPoint[];
  width?: number;
  height?: number;
  paddingX?: number;
  paddingY?: number;
}) => {
  // Extract value range
  const rates = data.map((val) => val.value);
  const max = d3.max(rates) ?? 0;
  const min = d3.min(rates) ?? 0;

  // Create scales
  const y = d3
    .scaleLinear()
    .domain([min, max])
    .range([height - paddingY, paddingY]);

  const x = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.date) as [Date, Date])
    .range([paddingX, width - paddingX]);

  // Generate curved line path
  const curvedLine = d3
    .line<GraphPoint>()
    .x((d) => x(d.date))
    .y((d) => y(d.value))
    .curve(d3.curveBasis)(data);

  const path = curvedLine
    ? Skia.Path.MakeFromSVGString(curvedLine) ?? Skia.Path.Make()
    : Skia.Path.Make();

  return {
    max,
    min,
    path,
  };
};

/**
 * Creates a straight horizontal line path
 * @returns Skia path representing a horizontal line
 */
export const createStraightLine = ({
  numPoints = GRAPH_WIDTH,
  width = GRAPH_WIDTH,
  height = GRAPH_HEIGHT,
  paddingX = GRAPH_PADDING_X,
}: {
  numPoints?: number;
  width?: number;
  height?: number;
  paddingX?: number;
}) => {
  // Generate evenly spaced x coordinates
  const xValues = Array.from({ length: numPoints }, (_, i) =>
    d3.interpolateNumber(paddingX, width - paddingX)(i / (numPoints - 1))
  );

  // Create line data points
  const straightLineData = xValues.map((x) => ({
    x,
    y: height,
  }));

  const straightLine = d3
    .line<{ x: number; y: number }>()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(d3.curveBasis)(straightLineData);

  return Skia.Path.MakeFromSVGString(straightLine || "") ?? Skia.Path.Make();
};

/**
 * Resample time series data to a consistent number of points
 *
 * @param data Original time series data points
 * @param numPoints Desired number of output points
 * @returns Evenly distributed data points across the time range
 */
export const resampleData = (
  data: GraphPoint[],
  numPoints = GRAPH_WIDTH
): GraphPoint[] => {
  // Calculate time domain
  const [startTime, endTime] = d3.extent(data, (d) => d.date) as [Date, Date];
  const totalTimeSpan = endTime.getTime() - startTime.getTime();

  // Create normalized time scale
  const xScale = d3.scaleTime().domain([startTime, endTime]).range([0, 1]);

  // Resample data points
  return Array.from({ length: numPoints }, (_, index) => {
    const normalizedPosition = index / (numPoints - 1);
    const closestIndex = d3.minIndex(data, (d) =>
      Math.abs(xScale(d.date) - normalizedPosition)
    );

    // Interpolate date and use closest point's value
    return {
      date: new Date(startTime.getTime() + normalizedPosition * totalTimeSpan),
      value: data[closestIndex].value,
    };
  });
};

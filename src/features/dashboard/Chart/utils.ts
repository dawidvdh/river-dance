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
 * Creates the graph path and scales.
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
  const rates = data.map((val) => val.value);

  const max = d3.max(rates) ?? 0;
  const min = d3.min(rates) ?? 0;

  const y = d3
    .scaleLinear()
    .domain([min, max])
    .range([height - paddingY, paddingY]);

  const x = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.date) as [Date, Date])
    .range([paddingX, width - paddingX]);

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
 * Creates a straight line path
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
  const xValues = Array.from({ length: numPoints }, (_, i) =>
    d3.interpolateNumber(paddingX, width - paddingX)(i / (numPoints - 1))
  );

  const yValue = height;

  const straightLineData = xValues.map((x) => ({
    x,
    y: yValue,
  }));

  const straightLine = d3
    .line<{ x: number; y: number }>()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(d3.curveBasis)(straightLineData);

  return Skia.Path.MakeFromSVGString(straightLine || "") ?? Skia.Path.Make();
};

/**
 * Resamples data to a specified number of points
 */
export const resampleData = (data: GraphPoint[], numPoints = GRAPH_WIDTH) => {
  const timeExtent = d3.extent(data, (d) => d.date) as [Date, Date];

  const xScale = d3.scaleTime().domain(timeExtent).range([0, 1]);

  return Array.from({ length: numPoints }, (_, i) => {
    const t = i / (numPoints - 1);

    const closestIndex = d3.minIndex(data, (d) => Math.abs(xScale(d.date) - t));

    return {
      date: new Date(
        timeExtent[0].getTime() +
          t * (timeExtent[1].getTime() - timeExtent[0].getTime())
      ),
      value: data[closestIndex].value,
    };
  });
};

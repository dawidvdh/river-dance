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

  const max = Math.max(...rates);
  const min = Math.min(...rates);

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
 * Resamples data to a specified number of points
 */
export const resampleData = (data: GraphPoint[], numPoints: number) => {
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

/**
 * Creates a straight line path
 */
export const createStraightLine = ({
  height = GRAPH_HEIGHT,
  width = GRAPH_WIDTH,
}: {
  height?: number;
  width?: number;
}) => {
  const path = Skia.Path.Make();
  path.moveTo(0, height / 2);

  const controlPointHeight = height / 10; // Adjust for more/less curve

  for (let i = 0; i < width - 1; i += 1) {
    const x = i;
    const y = height / 2 + Math.sin(i * 0.05) * controlPointHeight;
    path.lineTo(x, y);
  }

  return path;
};

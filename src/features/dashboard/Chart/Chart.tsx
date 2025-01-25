import {
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { GraphPoint } from "./types";
import {
  Canvas,
  LinearGradient,
  Path,
  SkPath,
  vec,
} from "@shopify/react-native-skia";
import { GRAPH_HEIGHT, GRAPH_WIDTH, GRAPH_GRADIENT_COLORS } from "./constants";
import { useEffect, useMemo } from "react";
import { createGraphPath, createStraightLine, resampleData } from "./utils";

type Props = {
  data?: GraphPoint[];
};

export const Chart = ({ data }: Props) => {
  const paths = useSharedValue<{ from?: SkPath; to?: SkPath }>({});
  const transition = useSharedValue(0);

  const straightLine = useMemo(
    () =>
      createStraightLine({
        numPoints: GRAPH_WIDTH,
      }),
    []
  );

  const path = useDerivedValue(() => {
    const from = paths.value.from ?? straightLine;
    const to = paths.value.to ?? straightLine;

    return to.interpolate(from, transition.value)!;
  }, [transition]);

  useEffect(() => {
    if (!data?.length) return;

    const resampled = resampleData(data);
    const { path } = createGraphPath({
      data: resampled,
    });

    const previous = paths.value;
    const from = previous.to ?? straightLine;

    paths.value = {
      from: path.isInterpolatable(from) ? from : path,
      to: path,
    };

    transition.value = 0;
    transition.value = withSpring(1, {
      mass: 1,
      stiffness: 500,
      damping: 400,
      velocity: 0,
    });
  }, [data]);

  return (
    <Canvas style={{ width: GRAPH_WIDTH, height: GRAPH_HEIGHT }}>
      <Path path={path} style="stroke" strokeWidth={2}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(GRAPH_WIDTH, 0)}
          colors={GRAPH_GRADIENT_COLORS}
        />
      </Path>
    </Canvas>
  );
};

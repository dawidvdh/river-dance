import { formatCurrency, formatPercentage } from "@/src/common/utils";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type Props = {
  changeAmount?: number;
  percentChange?: number;
};

export const ChartPriceIndicator = ({
  changeAmount = 0,
  percentChange = 0,
}: Props) => {
  const status = useSharedValue(0);
  // const status = useDerivedValue(() => {
  //   if (changeAmount > 0) return 1;
  //   if (changeAmount < 0) return -1;
  //   return 0;
  // }, [changeAmount]);
  const opacity = useSharedValue(0);

  const indicatorStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      status.value,
      [-1, 0, 1],
      ["#F0616D", "#FFFFFF", "#27AD75"]
    );

    return {
      color,
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    status.value = changeAmount
      ? withTiming(changeAmount >= 0 ? 1 : -1)
      : withTiming(0);

    opacity.value = changeAmount
      ? withTiming(1)
      : withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, [changeAmount]);

  return (
    <View>
      <Animated.Text style={[styles.changeText, indicatorStyle]}>
        {changeAmount >= 0 ? "\u25B2 " : "\u25BC "}
        {formatCurrency(changeAmount ?? 0)} ({formatPercentage(percentChange)})
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  changeText: {
    fontSize: 16,
    fontWeight: "light",
    color: "white",
  },
});

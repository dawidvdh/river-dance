import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { ChartPriceIndicator } from "./ChartPriceIndicator";

type Props = {
  headerText: string;
  subText?: string | null;
  absoluteChange?: number;
  percentChange?: number;
  isLoading?: boolean;
};

export const ChartLabel = ({
  headerText,
  subText,
  absoluteChange,
  percentChange,
}: Props) => {
  const priceOpacity = useSharedValue(0);

  useEffect(() => {
    priceOpacity.value = subText
      ? withTiming(1, { duration: 300 })
      : withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, [subText]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{headerText}</Text>
      <View>
        <Animated.Text style={[styles.price, { opacity: priceOpacity }]}>
          {subText}
        </Animated.Text>
        <ChartPriceIndicator
          changeAmount={absoluteChange}
          percentChange={percentChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  updatedAtText: {
    fontSize: 10,
    color: "#8A919E",
    textAlign: "right",
  },
  price: {
    fontSize: 26,
    fontWeight: "light",
    color: "white",
  },
});

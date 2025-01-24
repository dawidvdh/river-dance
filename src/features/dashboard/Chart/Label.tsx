import { View, Text, StyleSheet } from "react-native";
import { format, formatPercentage } from "../../../common/utils";

type Props = {
  headerText: string;
  subText: string;
  absoluteChange: number;
  percentChange: number;
  isLoading?: boolean;
};

export const ChartLabel = ({
  headerText,
  subText,
  absoluteChange,
  percentChange,
}: Props) => {
  const formattedPercentChange = formatPercentage(percentChange);
  const positiveChange = absoluteChange >= 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{headerText}</Text>
      <View>
        <Text style={styles.price}>{subText}</Text>
        <Text
          style={[styles.changeText, positiveChange && styles.changeNegative]}
        >
          {positiveChange ? "\u25B2 " : "\u25BC "}
          {format(absoluteChange ?? 0)} ({formattedPercentChange})
        </Text>
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
  changeText: {
    fontSize: 16,
    fontWeight: "light",
    color: "#F0616D",
  },
  changeNegative: {
    color: "#27AD75",
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

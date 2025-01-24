import { SafeAreaView } from "react-native-safe-area-context";
import { Chart } from "./Chart/Chart";
import {
  useGetBitcoinPriceQuery,
  useRiverChartHistory,
} from "../../services/api";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { format } from "../../common/utils";
import { SegmentedControl } from "./SegmentedButtons";
import { ChartLabel } from "./Chart/Label";
import { Notice } from "./Notice";
import { TimeFrameValues } from "../../services/types";
import { ErrorScreen } from "./ErrorScreen";
import { TIME_FRAMES } from "@/src/services/constants";

export const HomeScreen = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrameValues>("MONTH");
  const { data: priceData, error: priceError } = useGetBitcoinPriceQuery();
  const { data, error } = useRiverChartHistory({
    timeFrame,
  });

  if (error || priceError) {
    return <ErrorScreen />;
  }

  const { price } = priceData ?? { price: 0, date: new Date() };

  const { chart, meta } = data ?? {
    chart: [
      { date: new Date(1993), value: 0 },
      { date: new Date(), value: 0 },
    ],
    meta: { absoluteChange: 0, percentageChange: 0, lastUpdate: null },
    currentPrice: 0,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChartLabel
        absoluteChange={meta.absoluteChange}
        headerText="Bitcoin"
        subText={format(price)}
        percentChange={meta.percentageChange}
      />

      <Chart data={chart} />

      <Notice lastUpdate={meta.lastUpdate} />

      <SegmentedControl
        data={TIME_FRAMES}
        onValueChange={(value) => setTimeFrame(value as TimeFrameValues)}
        selectedValue={timeFrame}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0B0D",
  },
});

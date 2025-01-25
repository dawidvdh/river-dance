import { SafeAreaView } from "react-native-safe-area-context";
import { Chart } from "./Chart/Chart";
import {
  useGetBitcoinPriceQuery,
  useGetBitcoinChartQuery,
} from "../../services/api/api";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { formatCurrency } from "../../common/utils";
import { SegmentedControl } from "../../common/components/SegmentedButtons";
import { ChartLabel } from "./Chart/ChartLabel";
import { Notice } from "./Notice";
import { TimeFrameValues } from "../../services/api/types";
import { ErrorScreen } from "../../common/components/ErrorScreen";
import { TIME_FRAMES } from "@/src/services/api/constants";

export const HomeScreen = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrameValues>("MONTH");
  const {
    data: priceData,
    error: priceError,
    refetch: refetchPrice,
  } = useGetBitcoinPriceQuery();
  const { data, error, refetch } = useGetBitcoinChartQuery({
    timeFrame,
  });

  if (error || priceError) {
    return (
      <ErrorScreen
        onRetry={() => {
          refetchPrice();
          refetch();
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ChartLabel
        absoluteChange={data?.meta.absoluteChange}
        headerText="Bitcoin"
        subText={priceData?.price ? formatCurrency(priceData.price) : null}
        percentChange={data?.meta.percentageChange}
      />

      <Chart data={data?.chart} />

      <Notice lastUpdate={data?.meta.lastUpdate} />

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

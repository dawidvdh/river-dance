import { formatRelative } from "date-fns";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  lastUpdate?: Date;
};

export const Notice = ({ lastUpdate }: Props) => {
  const updateLabel = lastUpdate
    ? `updated ${formatRelative(new Date(lastUpdate), new Date())}`
    : "updating...";

  return (
    <View style={styles.container}>
      <Text style={styles.label}>source: river.com</Text>
      <Text style={styles.label}>{updateLabel}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 4,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  label: {
    fontSize: 10,
    color: "#8A919E",
  },
});

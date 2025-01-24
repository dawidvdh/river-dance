import { View, Text, StyleSheet } from "react-native";

export const ErrorScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Error fetching data</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0B0D",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "white",
  },
});

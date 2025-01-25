import { View, Text, StyleSheet, Button } from "react-native";

type ErrorScreenProps = {
  message?: string;
  onRetry?: () => void;
};

export const ErrorScreen = ({
  message = "Error fetching data",
  onRetry,
}: ErrorScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText} accessibilityRole="alert">
        {message}
      </Text>
      {onRetry && <Button title="Retry" onPress={onRetry} color="#FF5A5F" />}
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

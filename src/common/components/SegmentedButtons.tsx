import { View, Text, Pressable, StyleSheet } from "react-native";

type Value = string | number;

type Props = {
  data: { value: Value; label: string }[];
  selectedValue: Value;
  onValueChange: (value: Value) => void;
};

export const SegmentedControl = ({
  data,
  selectedValue,
  onValueChange,
}: Props) => {
  return (
    <View style={styles.container}>
      {data.map(({ label, value }) => (
        <Pressable
          key={value}
          onPress={() => {
            onValueChange(value);
          }}
          style={styles.buttonContainer}
          disabled={value === selectedValue}
        >
          <View
            style={[
              styles.button,
              selectedValue === value && styles.buttonActive,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedValue === value && styles.buttonTextActive,
              ]}
            >
              {label}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  buttonContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  button: {
    padding: 10,
    borderRadius: 10,
  },
  buttonActive: {
    backgroundColor: "#001033",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8A919E",
  },
  buttonTextActive: {
    color: "#F7931A",
  },
});

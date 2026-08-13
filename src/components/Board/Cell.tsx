import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type CellProps = {
  row: number;
  col: number;
  value: number | null;
  given?: boolean;
  selected?: boolean;
  highlighted?: boolean;
  sameValue?: boolean;
  onPress?: () => void;
};

export const Cell: React.FC<CellProps> = ({
  row,
  col,
  value,
  given,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.cell,
        selected ? styles.selected : null,
        given ? styles.given : null,
        highlighted ? styles.highlighted : null,
        sameValue ? styles.sameValue : null,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View>
        <Text style={[styles.text, given ? styles.givenText : null]}>
          {value ?? ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 36,
    height: 36,
    borderWidth: 0.5,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  selected: {
    backgroundColor: "#e6f7ff",
  },
  highlighted: {
    backgroundColor: "#fff7e6",
  },
  sameValue: {
    backgroundColor: "#e8f5e9",
  },
  given: {
    backgroundColor: "#f4f4f4",
  },
  text: {
    fontSize: 16,
    color: "#111",
  },
  givenText: {
    fontWeight: "700",
  },
});

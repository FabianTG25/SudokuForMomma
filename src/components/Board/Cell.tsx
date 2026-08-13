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
  conflict?: boolean;
  confirmed?: boolean;
  incorrect?: boolean;
  size?: number;
  onPress?: () => void;
};

export const Cell: React.FC<CellProps> = ({
  row,
  col,
  value,
  given,
  selected,
  highlighted,
  sameValue,
  conflict,
  confirmed,
  incorrect,
  size = 44,
  onPress,
}) => {
  const borderStyle = {
    borderLeftWidth:
      col % 3 === 0
        ? Math.max(2, Math.round(size * 0.05))
        : Math.max(0.5, Math.round(size * 0.01)),
    borderTopWidth:
      row % 3 === 0
        ? Math.max(2, Math.round(size * 0.05))
        : Math.max(0.5, Math.round(size * 0.01)),
    borderRightWidth:
      col % 3 === 2
        ? Math.max(2, Math.round(size * 0.05))
        : Math.max(0.5, Math.round(size * 0.01)),
    borderBottomWidth:
      row % 3 === 2
        ? Math.max(2, Math.round(size * 0.05))
        : Math.max(0.5, Math.round(size * 0.01)),
  };

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        {
          width: size,
          height: size,
          borderRadius: Math.max(6, Math.round(size * 0.06)),
        },
        borderStyle,
        selected ? styles.selected : null,
        given ? styles.given : null,
        highlighted ? styles.highlighted : null,
        sameValue ? styles.sameValue : null,
        conflict ? styles.conflict : null,
        confirmed ? styles.confirmed : null,
        incorrect ? styles.incorrect : null,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View>
        <Text
          style={[
            styles.text,
            given ? styles.givenText : null,
            { fontSize: Math.max(18, Math.round(size * 0.45)) },
          ]}
        >
          {value ?? ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 0.5,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  selected: {
    backgroundColor: "#e6f7ff",
  },
  conflict: {
    borderColor: "#c62828",
    backgroundColor: "#fff0f0",
  },
  incorrect: {
    borderColor: '#c62828',
    backgroundColor: '#fff7f7',
  },
  confirmed: {
    backgroundColor: '#e8f5e9',
    borderColor: '#2e7d32',
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
    color: "#111",
  },
  givenText: {
    fontWeight: "700",
  },
});

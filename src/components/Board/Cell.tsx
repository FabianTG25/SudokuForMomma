import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type CellProps = {
  row: number;
  col: number;
  value: number | null;
  given?: boolean;
  notes?: number[];
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
  notes,
  size = 44,
  onPress,
}) => {
  const borderStyle = {
    borderLeftWidth: col % 3 === 0 && col !== 0 ? 2 : 0.5,
    borderTopWidth: row % 3 === 0 && row !== 0 ? 2 : 0.5,
    borderRightWidth: col % 3 === 2 && col !== 8 ? 2 : 0.5,
    borderBottomWidth: row % 3 === 2 && row !== 8 ? 2 : 0.5,
    borderLeftColor: col % 3 === 0 && col !== 0 ? "#5D4037" : "#D7CCC8",
    borderTopColor: row % 3 === 0 && row !== 0 ? "#5D4037" : "#D7CCC8",
    borderRightColor: col % 3 === 2 && col !== 8 ? "#5D4037" : "#D7CCC8",
    borderBottomColor: row % 3 === 2 && row !== 8 ? "#5D4037" : "#D7CCC8",
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
      <View style={styles.inner}>
        {value === null && notes && notes.length > 0 ? (
          <View style={styles.notesGrid}>
            {[0, 1, 2].map((r) => (
              <View key={r} style={styles.notesRow}>
                {[0, 1, 2].map((c) => {
                  const n = r * 3 + c + 1;
                  const has = notes.includes(n);
                  return (
                    <View key={c} style={styles.noteCell}>
                      {has ? (
                        <Text
                          style={[
                            styles.noteText,
                            { fontSize: Math.max(8, Math.round(size * 0.18)) },
                          ]}
                        >
                          {n}
                        </Text>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        ) : (
          <Text
            style={[
              given ? styles.givenText : styles.userText,
              {
                fontSize: given
                  ? Math.max(24, Math.round(size * 0.64))
                  : Math.max(18, Math.round(size * 0.45)),
              },
            ]}
          >
            {value ?? ""}
          </Text>
        )}
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
    borderColor: "#c62828",
    backgroundColor: "#fff7f7",
  },
  confirmed: {
    backgroundColor: "#e8f5e9",
    borderColor: "#2e7d32",
  },
  highlighted: {
    backgroundColor: "#fff7e6",
  },
  sameValue: {
    backgroundColor: "#e8f5e9",
  },
  given: {
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#5C6BC0",
  },
  givenText: {
    fontWeight: "700",
    color: "#3E2723",
  },
  userText: {
    fontWeight: "400",
    color: "#8D6E63",
  },
  inner: { alignItems: "center", justifyContent: "center" },
  notesGrid: { width: "100%", height: "100%", padding: 2 },
  notesRow: { flex: 1, flexDirection: "row" },
  noteCell: { flex: 1, alignItems: "center", justifyContent: "center" },
  noteText: { color: "#6d5448" },
});

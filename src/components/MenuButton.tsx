import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  label: string;
  iconName?: string;
  onPress?: () => void;
};

export const MenuButton: React.FC<Props> = ({
  label,
  iconName = "",
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {iconName ? (
          <MaterialIcons
            name={iconName as any}
            size={22}
            color="#fff"
            style={styles.icon}
          />
        ) : null}
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "80%",
    backgroundColor: "#8D6E63",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#4A3B2F",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { marginRight: 12 },
  label: { color: "#fff", fontSize: 18, fontWeight: "600" },
});

export default MenuButton;

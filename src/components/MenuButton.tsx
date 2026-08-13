import { COLORS } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  label: string;
  iconName?: string;
  onPress?: () => void;
  disabled?: boolean;
};

export const MenuButton: React.FC<Props> = ({
  label,
  iconName = "",
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, disabled ? styles.buttonDisabled : null]}
      onPress={onPress}
      disabled={disabled}
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
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    backgroundColor: COLORS.mocha,
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { marginRight: 12 },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default MenuButton;

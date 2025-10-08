import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { mode, toggleTheme } = useThemeContext();
  return (
    <TouchableOpacity
      style={[styles.button, mode === "dark" ? styles.dark : styles.light]}
      onPress={toggleTheme}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, mode === "dark" ? styles.textDark : styles.textLight]}>
        {mode === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  light: { backgroundColor: "#f0f0f0" },
  dark: { backgroundColor: "#0d3b66" },
  text: { fontWeight: "bold", fontSize: 14 },
  textLight: { color: "#0d3b66" },
  textDark: { color: "#fff" },
});

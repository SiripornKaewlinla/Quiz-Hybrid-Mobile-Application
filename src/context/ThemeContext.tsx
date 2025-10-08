import React, { createContext, useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// -------- Theme Context ----------
const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleTheme = () =>
    setMode(prev => (prev === "dark" ? "light" : "dark"));

  const themeColors = {
    light: {
      background: "#f2f6ff",
      text: "#0d3b66",
      button: "#0d3b66",
      buttonText: "#fff",
    },
    dark: {
      background: "#0d3b66",
      text: "#f2f6ff",
      button: "#f2f6ff",
      buttonText: "#0d3b66",
    },
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

// -------- Theme Toggle Button ----------
export const ThemeToggle = () => {
  const { mode, toggleTheme, themeColors } = useThemeContext();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: themeColors[mode].button },
      ]}
      onPress={toggleTheme}
    >
      <Text style={[styles.text, { color: themeColors[mode].buttonText }]}>
        Theme: {mode.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  text: {
    fontWeight: "bold",
    fontSize: 14,
  },
});

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import useTheme from "@/hooks/useTheme";

const SettingsScreen = () => {
  const { toggleDarkMode } = useTheme();
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <TouchableOpacity onPress={() => toggleDarkMode()}>
        <Text>toggle theme</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;

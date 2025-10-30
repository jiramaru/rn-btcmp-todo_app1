import { api } from "@/convex/_generated/api";
import { addTodo, clearAllTodos } from "@/convex/todos";
import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.one}>Hello, Deo</Text>
      <TouchableOpacity style={styles.two} onPress={toggleDarkMode}>
        <Text>Toggle Mode</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.bg,
    },
    one: {
      fontSize: 22,
    },
    two: {
      fontSize: 18,
      backgroundColor: "#eee",
      color: "#123",
      padding: 5,
      borderRadius: 5,
      elevation: 5,
      margin: 5,
    },
  });
  return styles;
};

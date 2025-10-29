import { api } from "@/convex/_generated/api";
import { addTodo, clearAllTodos } from "@/convex/todos";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { Link } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Index() {
  const { toggleDarkMode } = useTheme();

  const todos = useQuery(api.todos.getTodos);

  const addTodo = useMutation(api.todos.addTodo);

  const clearTodos = useMutation(api.todos.clearAllTodos);

  return (
    <View style={styles.container}>
      <Text style={styles.one}>Hello, Deo</Text>
      <TouchableOpacity style={styles.two} onPress={toggleDarkMode}>
        <Text>Toggle Mode</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.two}
        onPress={() => addTodo({ text: "Learn React Native" })}
      >
        <Text>Add A Todo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.two} onPress={() => clearTodos()}>
        <Text>Clear Todos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefefe",
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

import { api } from "@/convex/_generated/api";
import { addTodo, clearAllTodos } from "@/convex/todos";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import { createHomeStyles } from "../../assets/styles/home.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/home/Header";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const homeStyle = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const addTodo = useMutation(api.todos.addTodo);
  console.log(todos);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyle.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyle.safeArea}>
        <Header />
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>Toggle Mode</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

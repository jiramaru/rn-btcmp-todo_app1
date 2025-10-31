import { api } from "@/convex/_generated/api";
import { addTodo, clearAllTodos, toggleTodo } from "@/convex/todos";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import { createHomeStyles } from "../../assets/styles/home.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/home/Header";
import TodoInput from "@/components/home/TodoInput";
import LoadingSpinner from "@/components/home/LoadingSpinner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";

type Todo = Doc<"todos">;

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const homeStyle = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos);

  const toggleTodo = useMutation(api.todos.toggleTodo);

  const isLoading = todos === undefined;

  if (isLoading) return <LoadingSpinner />;

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (e) {
      console.log(e);
    }
  };

  const renderTodoItem = ({ item }: { item: Todo }) => {
    return (
      <View style={homeStyle.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyle.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyle.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                homeStyle.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : colors.border,
                },
              ]}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={18} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View style={homeStyle.todoTextContainer}>
            {" "}
            <Text
              style={[
                homeStyle.todoText,
                item.isCompleted && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.text}
            </Text>
            <View style={homeStyle.todoActions}>
              <TouchableOpacity onPress={() => { }} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={homeStyle.actionButton}
                >
                  <Ionicons name="pencil" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { }} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={homeStyle.actionButton}
                >
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyle.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyle.safeArea}>
        <Header />
        <TodoInput />
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyle.todoList}
          contentContainerStyle={homeStyle.todoListContent}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}



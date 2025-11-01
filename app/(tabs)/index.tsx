import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import { createHomeStyles } from "../../assets/styles/home.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/home/Header";
import TodoInput from "@/components/home/TodoInput";
import LoadingSpinner from "@/components/home/LoadingSpinner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "@/components/home/EmptyState";
import { useState } from "react";

type Todo = Doc<"todos">;

export default function Index() {
  const { colors } = useTheme();
  const homeStyle = createHomeStyles(colors);

  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editText, setEditText] = useState("");

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  const isLoading = todos === undefined;

  if (isLoading) return <LoadingSpinner />;

  const handleToggleTodo = async (id: Id<"todos">) => {
    if (!editingId) {
      try {
        await toggleTodo({ id });
        setEditingId(null);
        setEditText("");
      } catch (e) {
        console.log("Error updating the todo :", e);
        Alert.alert("Error", "Failed to update the todo");
      }
    }
  };

  const handleDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTodo({ id }),
      },
    ]);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditText(todo.text);
    setEditingId(todo._id);
  };
  const handleSaveEdit = async () => {
    if (editingId) {
      try {
        await updateTodo({ id: editingId, text: editText.trim() });
        setEditingId(null);
        setEditText("");
      } catch (error) { }
    }
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;
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

          {isEditing ? (
            <View style={homeStyle.editContainer}>
              <TextInput
                style={homeStyle.editInput}
                value={editText}
                onChangeText={setEditText}
                autoFocus
                placeholder="Edit your todo..."
                placeholderTextColor={colors.textMuted}
              />

              <View style={homeStyle.editButtons}>
                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                  <LinearGradient
                    colors={colors.gradients.success}
                    style={homeStyle.editButton}
                  >
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleCancelEdit}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.muted}
                    style={homeStyle.editButton}
                  >
                    <Ionicons name="close" size={16} color="#fff" />
                    <Text style={homeStyle.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={homeStyle.todoTextContainer}>
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
                <TouchableOpacity
                  onPress={() => {
                    handleEditTodo(item);
                  }}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.warning}
                    style={homeStyle.actionButton}
                  >
                    <Ionicons name="pencil" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteTodo(item._id)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.danger}
                    style={homeStyle.actionButton}
                  >
                    <Ionicons name="trash" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
































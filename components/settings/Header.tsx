import { createHomeStyles } from "@/assets/styles/home.style";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";

const Header = () => {
  const { colors } = useTheme();
  const settingsStyles = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const totalCount = todos ? todos.length : 0;
  const completedCout = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  return (
    <View style={settingsStyles.header}>
      <View style={settingsStyles.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={settingsStyles.iconContainer}
        >
          <Ionicons name="settings" size={28} color="#fff" />
        </LinearGradient>

        <View style={settingsStyles.titleTextContainer}>
          <Text style={settingsStyles.title}>Settings</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;

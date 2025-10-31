import { createHomeStyles } from "@/assets/styles/home.style";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";

interface todo {
  text: string;
  isCompleted: boolean;
}

const Header = () => {
  const { colors } = useTheme();
  const homeStyle = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const totalCount = todos ? todos.length : 0;
  const completedCout = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  const progressionPercentage =
    totalCount > 0 ? (completedCout / totalCount) * 100 : 0;
  return (
    <View style={homeStyle.header}>
      <View style={homeStyle.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={homeStyle.iconContainer}
        >
          <Ionicons name="flash-outline" size={28} color="#fff" />
        </LinearGradient>

        <View style={homeStyle.titleTextContainer}>
          <Text style={homeStyle.title}>Today's Tasks 👀</Text>
          <Text style={homeStyle.subtitle}>
            {completedCout} of {totalCount} completed
          </Text>
        </View>
      </View>

      {totalCount > 0 && (
        <View style={homeStyle.progressContainer}>
          <View style={homeStyle.progressBarContainer}>
            <View style={homeStyle.progressBar}>
              <LinearGradient
                colors={colors.gradients.success}
                style={[
                  homeStyle.progressFill,
                  { width: `${progressionPercentage}%` },
                ]}
              />
            </View>
            <Text style={homeStyle.progressText}>
              {Math.round(progressionPercentage)}%
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;

import { createSettingsStyles } from "@/assets/styles/settings.style";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View, Text, Switch } from "react-native";

const Preferences = () => {
  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationsEnabled, setIsNotificationEnabled] = useState(true);

  const { colors, isDarkMode, toggleDarkMode } = useTheme();

  const settingsStyles = createSettingsStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyles.section}
    >
      <Text style={settingsStyles.sectionTitle}> Preferences</Text>

      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={settingsStyles.settingIcon}
          >
            <Ionicons name="moon" size={18} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Dark Mode</Text>
        </View>

        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor="#fff"
          trackColor={{ false: colors.border, true: colors.primary }}
          ios_backgroundColor={colors.border}
        />
      </View>
    </LinearGradient>
  );
};

export default Preferences;

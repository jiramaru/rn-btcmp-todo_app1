import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import useTheme from "@/hooks/useTheme";
import Header from "@/components/settings/Header";
import { LinearGradient } from "expo-linear-gradient";
import { createSettingsStyles } from "@/assets/styles/settings.style";
import ProgressStats from "@/components/settings/ProgressStats";
import Preferences from "@/components/settings/Preferences";

const SettingsScreen = () => {
  const { toggleDarkMode, colors, isDarkMode } = useTheme();
  const settingsStyles = createSettingsStyles(colors);

  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationsEnabled, setIsNotificationEnabled] = useState(true);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={settingsStyles.container}
    >
      <SafeAreaView style={settingsStyles.safeArea}>
        <StatusBar />
        <Header />
        <ScrollView
          style={settingsStyles.scrollView}
          contentContainerStyle={settingsStyles.content}
          showsVerticalScrollIndicator={false}
        >
          <ProgressStats />
          <Preferences />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SettingsScreen;

import React from "react";
import { View, StyleSheet, ScrollView, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  ThemedView,
  ThemedText,
  ThemedSubtext,
  ThemedCard,
  IconButton,
} from "../components/ThemedComponents";
import { useTheme } from "../contexts/ThemeContext";
import { themes } from "../utils/themes";

export default function Settings() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const navigateBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <IconButton
          onPress={navigateBack}
          icon={
            <Ionicons
              name="arrow-back"
              size={24}
              color={theme.colors.primary}
            />
          }
        />
        <ThemedText style={styles.headerTitle}>Settings</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      {/* Theme Selection */}
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText style={styles.sectionTitle}>Choose Theme</ThemedText>
        <ThemedSubtext style={styles.sectionSubtext}>
          Select a color theme for the app
        </ThemedSubtext>

        <View style={styles.themesContainer}>
          {themes.map((t) => (
            <Pressable
              key={t.id}
              onPress={() => setTheme(t)}
              style={({ pressed }) => [
                styles.themeButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <ThemedCard
                style={[
                  styles.themeCard,
                  {
                    backgroundColor: t.colors.card,
                    borderWidth: theme.id === t.id ? 3 : 1,
                    borderColor:
                      theme.id === t.id
                        ? theme.colors.primary
                        : t.colors.border,
                  },
                ]}
              >
                <View style={styles.themePreview}>
                  <View style={styles.colorDots}>
                    <View
                      style={[
                        styles.colorDot,
                        { backgroundColor: t.colors.background },
                      ]}
                    />
                    <View
                      style={[
                        styles.colorDot,
                        { backgroundColor: t.colors.primary },
                      ]}
                    />
                    <View
                      style={[
                        styles.colorDot,
                        { backgroundColor: t.colors.text },
                      ]}
                    />
                  </View>
                  {theme.id === t.id && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color={theme.colors.primary}
                    />
                  )}
                </View>
                <View style={styles.themeInfo}>
                  <Text style={[styles.themeName, { color: t.colors.text }]}>
                    {t.name}
                  </Text>
                  <Text style={[styles.themeType, { color: t.colors.subtext }]}>
                    {t.dark ? "Dark" : "Light"} Theme
                  </Text>
                </View>
              </ThemedCard>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  sectionSubtext: {
    fontSize: 14,
    marginBottom: 24,
  },
  themesContainer: {
    gap: 12,
  },
  themeButton: {
    marginBottom: 0,
  },
  themeCard: {
    padding: 16,
  },
  themePreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  colorDots: {
    flexDirection: "row",
    gap: 8,
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  themeInfo: {
    gap: 4,
  },
  themeName: {
    fontSize: 16,
    fontWeight: "600",
  },
  themeType: {
    fontSize: 14,
  },
});

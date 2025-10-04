import React, { useState, useCallback } from "react";
import { FlatList, StyleSheet, View, Pressable } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  ThemedView,
  ThemedText,
  ThemedSubtext,
  ThemedCard,
  IconButton,
} from "../components/ThemedComponents";
import { useTheme } from "../contexts/ThemeContext";
import { getCrimes } from "../utils/storage";
import { Crime } from "../types";

export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();
  const [crimes, setCrimes] = useState<Crime[]>([]);

  // Load crimes when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadCrimes();
    }, [])
  );

  const loadCrimes = async () => {
    const loadedCrimes = await getCrimes();
    // Sort by date (newest first)
    const sorted = loadedCrimes.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
    setCrimes(sorted);
  };

  const navigateToDetail = (crimeId?: string) => {
    if (crimeId) {
      router.push(`/detail?id=${crimeId}`);
    } else {
      router.push("/detail");
    }
  };

  const navigateToSettings = () => {
    router.push("./settings");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderCrimeItem = ({ item }: { item: Crime }) => (
    <Pressable onPress={() => navigateToDetail(item.id)}>
      <ThemedCard style={styles.crimeCard}>
        <View style={styles.crimeContent}>
          <View style={styles.crimeInfo}>
            <ThemedText style={styles.crimeTitle}>
              {item.title || "Untitled Crime"}
            </ThemedText>
            <ThemedSubtext style={styles.crimeDate}>
              {formatDate(item.date)}
            </ThemedSubtext>
          </View>
          {item.solved && (
            <Ionicons
              name="checkmark-done"
              size={24}
              color={theme.colors.primary}
            />
          )}
        </View>
      </ThemedCard>
    </Pressable>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <ThemedText style={styles.headerTitle}>Criminal Intent</ThemedText>
        <View style={styles.headerButtons}>
          <IconButton
            onPress={() => navigateToDetail()}
            icon={
              <Ionicons name="add" size={28} color={theme.colors.primary} />
            }
          />
          <IconButton
            onPress={navigateToSettings}
            icon={
              <Ionicons
                name="settings-outline"
                size={24}
                color={theme.colors.primary}
              />
            }
          />
        </View>
      </View>

      {/* Crime List */}
      {crimes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="folder-open-outline"
            size={64}
            color={theme.colors.subtext}
          />
          <ThemedSubtext style={styles.emptyText}>
            No crimes recorded yet
          </ThemedSubtext>
          <ThemedSubtext style={styles.emptySubtext}>
            Tap the + button to add a new crime
          </ThemedSubtext>
        </View>
      ) : (
        <FlatList
          data={crimes}
          renderItem={renderCrimeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  headerButtons: {
    flexDirection: "row",
    gap: 8,
  },
  listContent: {
    padding: 16,
  },
  crimeCard: {
    marginBottom: 12,
  },
  crimeContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  crimeInfo: {
    flex: 1,
    marginRight: 12,
  },
  crimeTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  crimeDate: {
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    marginTop: 16,
    fontWeight: "500",
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});

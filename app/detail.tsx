import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Platform,
  Alert,
  Switch,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  ThemedView,
  ThemedText,
  ThemedTextInput,
  ThemedButton,
  IconButton,
  ThemedCard,
} from "../components/ThemedComponents";
import { useTheme } from "../contexts/ThemeContext";
import { getCrime, saveCrime, generateUUID } from "../utils/storage";
import { Crime } from "../types";

export default function Detail() {
  const router = useRouter();
  const { theme } = useTheme();
  const params = useLocalSearchParams();
  const crimeId = params.id as string | undefined;

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState(new Date());
  const [solved, setSolved] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load crime data if editing existing crime
  useEffect(() => {
    loadCrime();
  }, [crimeId]);

  const loadCrime = async () => {
    if (crimeId) {
      const crime = await getCrime(crimeId);
      if (crime) {
        setTitle(crime.title);
        setDetails(crime.details);
        setDate(crime.date);
        setSolved(crime.solved);
        setPhotoUri(crime.photoUri);
      }
    }
    setIsLoading(false);
  };

  const navigateBack = () => {
    router.back();
  };

  const navigateToSettings = () => {
    router.push("/settings");
  };

  const handleSave = async () => {
    try {
      const crime: Crime = {
        id: crimeId || generateUUID(),
        title: title.trim() || "Untitled Crime",
        details: details.trim(),
        date,
        solved,
        photoUri,
      };

      await saveCrime(crime);

      // Show success message
      if (Platform.OS === "ios" || Platform.OS === "android") {
        Alert.alert("Success", "Crime saved successfully!");
      } else {
        alert("Crime saved successfully!");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save crime");
      console.error("Error saving crime:", error);
    }
  };

  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Camera roll permission is required to select photos"
      );
      return;
    }

    // Launch image picker (FIXED - removed deprecated MediaTypeOptions)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ThemedText>Loading...</ThemedText>
        </View>
      </ThemedView>
    );
  }

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
        <ThemedText style={styles.headerTitle}>Crime Details</ThemedText>
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

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Photo Section */}
        {photoUri && (
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: photoUri }}
              style={styles.photo}
              resizeMode="cover"
            />
          </View>
        )}

        <ThemedCard style={styles.card}>
          {/* Title Input */}
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Title</ThemedText>
            <ThemedTextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Enter crime title"
              style={styles.input}
            />
          </View>

          {/* Details Input */}
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Details</ThemedText>
            <ThemedTextInput
              value={details}
              onChangeText={setDetails}
              placeholder="Enter crime details"
              multiline
              numberOfLines={4}
              style={{ ...styles.input, ...styles.textArea }}
              textAlignVertical="top"
            />
          </View>

          {/* Date Button */}
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Date</ThemedText>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              style={[
                styles.dateButton,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Ionicons
                name="calendar-outline"
                size={20}
                color={theme.colors.primary}
              />
              <ThemedText style={styles.dateText}>
                {formatDate(date)}
              </ThemedText>
            </Pressable>
          </View>

          {/* Solved Checkbox */}
          <View style={styles.solvedContainer}>
            <View style={styles.solvedLeft}>
              <Ionicons
                name={solved ? "checkmark-circle" : "checkmark-circle-outline"}
                size={24}
                color={solved ? theme.colors.primary : theme.colors.subtext}
              />
              <ThemedText style={styles.solvedLabel}>Case Solved</ThemedText>
            </View>
            <Switch
              value={solved}
              onValueChange={setSolved}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Camera Button */}
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Evidence Photo</ThemedText>
            <Pressable
              onPress={pickImage}
              style={[
                styles.cameraButton,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Ionicons
                name="camera-outline"
                size={24}
                color={theme.colors.primary}
              />
              <ThemedText style={styles.cameraText}>
                {photoUri ? "Change Photo" : "Add Photo"}
              </ThemedText>
            </Pressable>
          </View>
        </ThemedCard>

        {/* Save Button */}
        <ThemedButton
          title="Save Crime"
          onPress={handleSave}
          style={styles.saveButton}
        />
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateChange}
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
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photoContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: 200,
  },
  card: {
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
  },
  dateText: {
    fontSize: 16,
  },
  solvedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 20,
  },
  solvedLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  solvedLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
  },
  cameraText: {
    fontSize: 16,
    fontWeight: "500",
  },
  saveButton: {
    marginTop: 8,
  },
});

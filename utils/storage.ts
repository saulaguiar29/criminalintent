import AsyncStorage from "@react-native-async-storage/async-storage";
import { Crime } from "../types";

const CRIMES_STORAGE_KEY = "@criminal_intent_crimes";

// Get all crimes
export async function getCrimes(): Promise<Crime[]> {
  try {
    const crimesJson = await AsyncStorage.getItem(CRIMES_STORAGE_KEY);
    if (crimesJson) {
      const crimes = JSON.parse(crimesJson);
      // Convert date strings back to Date objects
      return crimes.map((crime: any) => ({
        ...crime,
        date: new Date(crime.date),
      }));
    }
    return [];
  } catch (error) {
    console.error("Error loading crimes:", error);
    return [];
  }
}

// Get a single crime by ID
export async function getCrime(id: string): Promise<Crime | null> {
  try {
    const crimes = await getCrimes();
    return crimes.find((crime) => crime.id === id) || null;
  } catch (error) {
    console.error("Error loading crime:", error);
    return null;
  }
}

// Save or update a crime
export async function saveCrime(crime: Crime): Promise<void> {
  try {
    const crimes = await getCrimes();
    const existingIndex = crimes.findIndex((c) => c.id === crime.id);

    if (existingIndex >= 0) {
      // Update existing crime
      crimes[existingIndex] = crime;
    } else {
      // Add new crime
      crimes.push(crime);
    }

    await AsyncStorage.setItem(CRIMES_STORAGE_KEY, JSON.stringify(crimes));
  } catch (error) {
    console.error("Error saving crime:", error);
    throw error;
  }
}

// Delete a crime
export async function deleteCrime(id: string): Promise<void> {
  try {
    const crimes = await getCrimes();
    const filteredCrimes = crimes.filter((crime) => crime.id !== id);
    await AsyncStorage.setItem(
      CRIMES_STORAGE_KEY,
      JSON.stringify(filteredCrimes)
    );
  } catch (error) {
    console.error("Error deleting crime:", error);
    throw error;
  }
}

// Generate a UUID (simple version)
export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

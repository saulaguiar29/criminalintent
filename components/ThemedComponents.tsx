import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

// Themed View
export function ThemedView({
  style,
  ...props
}: React.ComponentProps<typeof View>) {
  const { theme } = useTheme();
  return (
    <View
      style={[{ backgroundColor: theme.colors.background }, style]}
      {...props}
    />
  );
}

// Themed Card/Container
export function ThemedCard({
  style,
  ...props
}: React.ComponentProps<typeof View>) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.card,
          borderRadius: 8,
          padding: 16,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        style,
      ]}
      {...props}
    />
  );
}

// Themed Text
export function ThemedText({
  style,
  ...props
}: React.ComponentProps<typeof Text>) {
  const { theme } = useTheme();
  return <Text style={[{ color: theme.colors.text }, style]} {...props} />;
}

// Themed Subtext
export function ThemedSubtext({
  style,
  ...props
}: React.ComponentProps<typeof Text>) {
  const { theme } = useTheme();
  return (
    <Text
      style={[{ color: theme.colors.subtext, fontSize: 14 }, style]}
      {...props}
    />
  );
}

// Themed TextInput
interface ThemedTextInputProps extends TextInputProps {
  style?: TextStyle;
}

export function ThemedTextInput({ style, ...props }: ThemedTextInputProps) {
  const { theme } = useTheme();
  return (
    <TextInput
      style={[
        {
          backgroundColor: theme.colors.card,
          color: theme.colors.text,
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 8,
          padding: 12,
          fontSize: 16,
        },
        style,
      ]}
      placeholderTextColor={theme.colors.subtext}
      {...props}
    />
  );
}

// Themed Button
interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  style?: ViewStyle;
  disabled?: boolean;
}

export function ThemedButton({
  title,
  onPress,
  variant = "primary",
  style,
  disabled = false,
}: ThemedButtonProps) {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.border;
    switch (variant) {
      case "primary":
        return theme.colors.primary;
      case "danger":
        return theme.colors.danger;
      case "secondary":
        return theme.colors.card;
      default:
        return theme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (variant === "secondary") {
      return theme.colors.primary;
    }
    return "#FFFFFF";
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          backgroundColor: getBackgroundColor(),
          padding: 14,
          borderRadius: 8,
          alignItems: "center",
          borderWidth: variant === "secondary" ? 1 : 0,
          borderColor: theme.colors.primary,
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: getTextColor(),
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}

// Icon Button for Headers
interface IconButtonProps {
  onPress: () => void;
  icon: React.ReactNode;
  style?: ViewStyle;
}

export function IconButton({ onPress, icon, style }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          padding: 8,
          justifyContent: "center",
          alignItems: "center",
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      {icon}
    </Pressable>
  );
}

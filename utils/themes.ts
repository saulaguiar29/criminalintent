import { Theme } from "../types";

export const themes: Theme[] = [
  {
    id: "light-blue",
    name: "Ocean Light",
    dark: false,
    colors: {
      background: "#F0F9FF",
      card: "#FFFFFF",
      text: "#0F172A",
      subtext: "#64748B",
      border: "#CBD5E1",
      primary: "#0EA5E9",
      danger: "#EF4444",
    },
  },
  {
    id: "light-green",
    name: "Nature Light",
    dark: false,
    colors: {
      background: "#F0FDF4",
      card: "#FFFFFF",
      text: "#0F172A",
      subtext: "#64748B",
      border: "#CBD5E1",
      primary: "#10B981",
      danger: "#EF4444",
    },
  },
  {
    id: "light-purple",
    name: "Lavender Light",
    dark: false,
    colors: {
      background: "#FAF5FF",
      card: "#FFFFFF",
      text: "#0F172A",
      subtext: "#64748B",
      border: "#CBD5E1",
      primary: "#A855F7",
      danger: "#EF4444",
    },
  },
  {
    id: "dark-slate",
    name: "Midnight Dark",
    dark: true,
    colors: {
      background: "#0F172A",
      card: "#1E293B",
      text: "#F1F5F9",
      subtext: "#94A3B8",
      border: "#334155",
      primary: "#38BDF8",
      danger: "#F87171",
    },
  },
  {
    id: "dark-emerald",
    name: "Forest Dark",
    dark: true,
    colors: {
      background: "#022C22",
      card: "#064E3B",
      text: "#F0FDF4",
      subtext: "#86EFAC",
      border: "#065F46",
      primary: "#34D399",
      danger: "#F87171",
    },
  },
  {
    id: "dark-violet",
    name: "Galaxy Dark",
    dark: true,
    colors: {
      background: "#1E1B4B",
      card: "#2E1065",
      text: "#F5F3FF",
      subtext: "#C4B5FD",
      border: "#4C1D95",
      primary: "#A78BFA",
      danger: "#F87171",
    },
  },
];

export const defaultTheme = themes[0];

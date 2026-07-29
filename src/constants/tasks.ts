import {
  BrushCleaning,
  ShoppingCart,
  GraduationCap,
  Heart,
  Wallet,
  Utensils,
  Folder,
  Circle,
} from "lucide-react";

export const WEEKDAY_LABELS: Record<number, string> = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

export const TASK_CATEGORIES = [
  {
    key: "cleaning",
    label: "Cleaning",
    icon: BrushCleaning,
  },
  {
    key: "cooking",
    label: "Cooking",
    icon: Utensils,
  },
  {
    key: "shopping",
    label: "Shopping",
    icon: ShoppingCart,
  },
  {
    key: "education",
    label: "Education",
    icon: GraduationCap,
  },
  {
    key: "health",
    label: "Health",
    icon: Heart,
  },
  {
    key: "finance",
    label: "Finance",
    icon: Wallet,
  },
  {
    key: "other",
    label: "Other",
    icon: Folder,
  },
] as const;

export const RECURRENCE_OPTIONS = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "none", label: "One-time" },
] as const;


export const TASK_PRIORITIES = [
  {
    key: "low",
    label: "Low",
    icon: Circle,
    color: "fill-success text-success",
  },
  {
    key: "normal",
    label: "Normal",
    icon: Circle,
    color: "fill-warning text-warning",
  },
  {
    key: "high",
    label: "High",
    icon: Circle,
    color: "fill-danger text-danger",
  },
] as const;

export const TASK_CATEGORIES_FOR_TABLE = {
  cleaning: {
    label: "Cleaning",
    icon: BrushCleaning,
  },
  cooking: {
    label: "Cooking",
    icon: Utensils,
  },
  shopping: {
    label: "Shopping",
    icon: ShoppingCart,
  },
  education: {
    label: "Education",
    icon: GraduationCap,
  },
  health: {
    label: "Health",
    icon: Heart,
  },
  finance: {
    label: "Finance",
    icon: Wallet,
  },
  other: {
    label: "Other",
    icon: Folder,
  },
} as const;

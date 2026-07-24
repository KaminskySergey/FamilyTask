import {
  BrushCleaning,
  ShoppingCart,
  GraduationCap,
  Heart,
  Wallet,
  Utensils,
  Folder,
} from "lucide-react";

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
] as const;



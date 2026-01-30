import { TodoCategory } from "../domain";

export interface TodoCategoryConfig {
  id: TodoCategory;
  label: string;
  description: string;
  icon: string; // We'll use emoji or icon names
}

export const TODO_CATEGORIES: TodoCategoryConfig[] = [
  {
    id: "ThisEvening",
    label: "Today",
    description: "Complete by end of day",
    icon: "calendar",
  },
  {
    id: "TomorrowMorning",
    label: "Tomorrow",
    description: "Start tomorrow morning",
    icon: "sunny",
  },
  {
    id: "NextWeek",
    label: "Upcoming",
    description: "Within the next week",
    icon: "calendar-outline",
  },
  {
    id: "Someday",
    label: "Someday",
    description: "No specific deadline",
    icon: "bulb",
  },
];

export const getCategoryConfig = (
  category: TodoCategory,
): TodoCategoryConfig | undefined => {
  return TODO_CATEGORIES.find((cat) => cat.id === category);
};

export const getDefaultCategory = (): TodoCategory => "ThisEvening";

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { TodoCategory, TODO_CATEGORIES, TodoItem } from "../../domain";
import { colors } from "@shared/colors";
import { spacing } from "@shared/spacing";
import { typography } from "@shared/typography";
import { Text } from "@shared/ui/components";
import { TodoItem as TodoItemComponent } from "./TodoItem";
import { Ionicons } from "@expo/vector-icons";

interface CategorySectionProps {
  category: TodoCategory;
  todos: TodoItem[];
  onAddPress: (category: TodoCategory) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isToggling: Record<string, boolean>;
  isDeleting: Record<string, boolean>;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  todos,
  onAddPress,
  onToggle,
  onEdit,
  onDelete,
  isToggling,
  isDeleting,
}) => {
  const categoryConfig = TODO_CATEGORIES.find((cat) => cat.id === category);
  const categoryTodos = todos.filter((todo) => todo.category === category);

  if (!categoryConfig) return null;

  return (
    <View style={styles.section}>
      {/* Section Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons
            name={categoryConfig.icon as any}
            size={20}
            color={colors.primary}
            style={styles.categoryIcon}
          />
          <Text variant="header" style={styles.categoryTitle}>
            {categoryConfig.label}
          </Text>
          <Text variant="caption" style={styles.todoCount}>
            ({categoryTodos.length})
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => onAddPress(category)}
        >
          <Ionicons name="add" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Todo Items */}
      {categoryTodos.map((todo, index) => (
        <View key={todo.id}>
          {index > 0 && <View style={styles.itemSeparator} />}
          <TodoItemComponent
            item={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            isToggling={isToggling[todo.id] || false}
            isDeleting={isDeleting[todo.id] || false}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: spacing.xs,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    marginRight: spacing.sm,
  },
  categoryTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.black,
  },
  todoCount: {
    marginLeft: spacing.sm,
    color: colors.gray,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  itemSeparator: {
    height: 1,
    backgroundColor: colors.secondary,
    marginHorizontal: spacing.md,
  },
});

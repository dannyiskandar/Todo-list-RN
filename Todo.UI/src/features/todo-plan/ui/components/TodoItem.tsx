import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TodoItem as TodoItemType } from "../../domain";
import { colors } from "@shared/colors";
import { spacing } from "@shared/spacing";
import { typography } from "@shared/typography";
import { Text } from "@shared/ui/components";
import { Ionicons } from "@expo/vector-icons";

interface TodoItemProps {
  item: TodoItemType;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isToggling: boolean;
  isDeleting: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  item,
  onToggle,
  onEdit,
  onDelete,
  isToggling,
  isDeleting,
}) => {
  return (
    <View style={styles.todoItem}>
      <View
        style={styles.checkbox}
        onTouchEnd={() => !isToggling && onToggle(item.id)}
      >
        {isToggling ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : item.isCompleted ? (
          <Ionicons name="checkbox" size={20} color={colors.green} />
        ) : (
          <Ionicons name="square-outline" size={20} color={colors.secondary} />
        )}
      </View>

      <View style={styles.todoContent}>
        <Text
          style={[styles.todoTitle, item.isCompleted && styles.completedText]}
        >
          {item.title}
        </Text>
        <View style={styles.actions}>
          {!item.isCompleted && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => onEdit(item.id)}
            >
              <Ionicons name="pencil" size={18} color={colors.secondary} />
            </TouchableOpacity>
          )}

          {item.isCompleted && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => !isDeleting && onDelete(item.id)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <ActivityIndicator size="small" color={colors.red} />
              ) : (
                <Ionicons name="trash" size={18} color={colors.secondary} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.sm,
  },
  checkbox: {
    marginRight: spacing.sm,
  },
  todoContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoTitle: {
    fontSize: typography.fontSize.md,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: colors.gray,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  iconButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});

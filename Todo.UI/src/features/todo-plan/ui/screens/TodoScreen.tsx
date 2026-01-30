import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { useTodoStore } from "../../application/todo-plan-store";
import { TODO_CATEGORIES, TodoCategory, TodoItem } from "../../domain";
import { colors } from "@shared/colors";
import { spacing } from "@shared/spacing";
import { Text, Loading, Error } from "@shared/ui/components";
import { CategorySection } from "../components/CategorySection";
import { AddTodoModal } from "../components/AddTodoModal";

export default function TodoScreen() {
  const {
    todos,
    loading,
    error,
    isToggling,
    isDeleting,
    fetchTodos,
    addTodo,
    updateTodo,
    toggleTodo,
    removeTodo,
    clearError,
  } = useTodoStore();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<TodoItem | null>(null);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleModalAdd = (
    title: string,
    notes: string,
    category: TodoCategory,
  ) => {
    if (editingItem) {
      // Editing existing item
      updateTodo(editingItem.id, { title, notes, category });
    } else {
      // Adding new item
      addTodo(title, notes, undefined, category);
    }
    setEditingItem(null);
    setIsModalVisible(false);
    setSelectedCategory(null);
  };

  const handleCategoryAddPress = (category: string) => {
    setSelectedCategory(category);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedCategory(null);
    setEditingItem(null);
  };

  const handleToggleTodo = (id: string) => {
    toggleTodo(id);
  };

  const handleRemoveTodo = (id: string) => {
    removeTodo(id);
  };

  const handleEditTodo = (id: string) => {
    const item = todos.find((todo) => todo.id === id);
    if (item) {
      setEditingItem(item);
      setIsModalVisible(true);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={clearError} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text
          variant="header"
          style={{ textAlign: "center", marginBottom: spacing.md }}
        >
          Todo List
        </Text>

        <View style={styles.categories}>
          {TODO_CATEGORIES.map((category) => (
            <CategorySection
              key={category.id}
              category={category.id}
              todos={todos}
              onAddPress={handleCategoryAddPress}
              onToggle={handleToggleTodo}
              onEdit={handleEditTodo}
              onDelete={handleRemoveTodo}
              isToggling={isToggling}
              isDeleting={isDeleting}
            />
          ))}
        </View>
      </ScrollView>

      <AddTodoModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onAdd={handleModalAdd}
        initialCategory={selectedCategory as any}
        editingItem={editingItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 0,
  },
  categories: {
    flex: 1,
  },
});

import { create } from "zustand";
import { TodoRepository } from "../infrastructure/todo-repository";
import { TodoService } from "./todo-service";
import { TodoCategory, TodoItem } from "../domain";
import type { ApiError } from "@shared/api/client";

// Initialize dependencies
const repository = new TodoRepository();
const todoService = new TodoService(repository);

// Helper function to format error messages
const formatErrorMessage = (
  error: unknown,
  fallbackMessage: string,
): string => {
  if (error && typeof error === "object" && "title" in error) {
    const apiError = error as ApiError;
    let errorMessage = apiError.title + "\n";

    // Add detailed errors if available
    if (apiError.errors && Object.keys(apiError.errors).length > 0) {
      const errorDetails = Object.entries(apiError.errors)
        .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
        .join("; ");
      errorMessage += `\n${errorDetails}`;
    }

    return errorMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};

interface TodoState {
  todos: TodoItem[];
  loading: boolean;
  error: string | null;
  isToggling: Record<string, boolean>;
  isDeleting: Record<string, boolean>;
  fetchTodos: () => Promise<void>;
  addTodo: (
    title: string,
    notes?: string,
    dueDate?: Date,
    category?: TodoCategory,
  ) => Promise<void>;
  updateTodo: (
    id: string,
    updates: {
      title?: string;
      notes?: string;
      dueDate?: Date;
      category?: TodoCategory;
    },
  ) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  loading: false,
  error: null,
  isToggling: {},
  isDeleting: {},

  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const todos = await todoService.getTodos();
      set({ todos });
    } catch (error) {
      set({
        error: formatErrorMessage(error, "Failed to fetch todos"),
      });
    } finally {
      set({ loading: false });
    }
  },

  addTodo: async (title, notes = "", dueDate, category = "Custom") => {
    // Optimistic update
    const tempId = `temp-${Date.now()}`;
    const optimisticTodo = new TodoItem(
      tempId,
      title,
      notes,
      false,
      dueDate,
      category,
      new Date(),
      new Date(),
    );
    set({
      todos: [...get().todos, optimisticTodo],
      error: null,
    });

    try {
      const realTodo = await todoService.createTodo(
        title,
        notes,
        dueDate,
        category,
      );
      // Replace temp with real
      set({
        todos: get().todos.map((t) => (t.id === tempId ? realTodo : t)),
      });
    } catch (error) {
      // Revert on error
      set({
        todos: get().todos.filter((t) => t.id !== tempId),
        error: formatErrorMessage(error, "Failed to add todo"),
      });
      throw error; // Re-throw to handle in UI
    }
  },

  updateTodo: async (id, updates) => {
    // Optimistic update
    const currentTodos = get().todos;
    const todo = currentTodos.find((t) => t.id === id);
    if (!todo) return;

    const optimisticTodo = todo.update(updates);
    set({
      todos: currentTodos.map((t) => (t.id === id ? optimisticTodo : t)),
      error: null,
    });

    try {
      await todoService.updateTodo(id, updates);
      // If successful, keep the optimistic update
    } catch (error) {
      // Revert on error
      set({
        todos: currentTodos,
        error: formatErrorMessage(error, "Failed to update todo"),
      });
      throw error; // Re-throw to handle in UI
    }
  },

  toggleTodo: async (id) => {
    // Optimistic update
    const currentTodos = get().todos;
    const todo = currentTodos.find((t) => t.id === id);
    if (!todo) return;

    const optimisticTodo = new TodoItem(
      todo.id,
      todo.title,
      todo.notes,
      !todo.isCompleted,
      todo.dueDate,
      todo.category,
      todo.createdAt,
      new Date(),
    );

    set({
      todos: currentTodos.map((t) => (t.id === id ? optimisticTodo : t)),
      isToggling: { ...get().isToggling, [id]: true },
      error: null,
    });

    try {
      await todoService.toggleTodo(id);
      // If successful, keep the optimistic update
    } catch (error) {
      // Revert on error
      set({
        todos: currentTodos,
        error: formatErrorMessage(error, "Failed to toggle todo"),
      });
    } finally {
      set({ isToggling: { ...get().isToggling, [id]: false } });
    }
  },

  removeTodo: async (id) => {
    // Optimistic update
    const currentTodos = get().todos;
    set({
      todos: currentTodos.filter((t) => t.id !== id),
      isDeleting: { ...get().isDeleting, [id]: true },
      error: null,
    });

    try {
      await todoService.deleteTodo(id);
      // If successful, keep the optimistic update
    } catch (error) {
      // Revert on error
      set({
        todos: currentTodos,
        error: formatErrorMessage(error, "Failed to delete todo"),
      });
    } finally {
      set({ isDeleting: { ...get().isDeleting, [id]: false } });
    }
  },

  clearError: () => set({ error: null }),
}));

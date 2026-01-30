import { api } from "@shared/api/client";
import type {
  TodoItemCreateDto,
  TodoItemDto,
  TodoItemUpdateDto,
} from "../domain";

export const todoPlanApi = {
  // Get all todo items
  getTodoItems: async (): Promise<TodoItemDto[]> => {
    const { data, error } = await api.GET("/api/TodoItems", {});
    if (error) {
      throw error;
    }
    return data || [];
  },

  // Get a specific todo item by ID
  getTodoItem: async (id: string): Promise<TodoItemDto> => {
    const { data, error } = await api.GET("/api/TodoItems/{id}", {
      params: { path: { id } },
    });
    if (error) {
      throw error;
    }
    if (!data) {
      throw new Error("Todo item not found");
    }
    return data;
  },

  // Create a new todo item
  createTodoItem: async (todoItem: TodoItemCreateDto): Promise<TodoItemDto> => {
    const { data, error } = await api.POST("/api/TodoItems", {
      body: todoItem,
    });
    if (error) {
      throw error;
    }
    if (!data) {
      throw new Error("Failed to create todo item");
    }
    return data;
  },

  // Update an existing todo item
  updateTodoItem: async (
    id: string,
    todoItem: TodoItemUpdateDto,
  ): Promise<void> => {
    const { error } = await api.PUT("/api/TodoItems/{id}", {
      params: { path: { id } },
      body: todoItem,
    });
    if (error) {
      throw error;
    }
  },

  // Delete a todo item
  deleteTodoItem: async (id: string): Promise<void> => {
    const { error } = await api.DELETE("/api/TodoItems/{id}", {
      params: { path: { id } },
    });
    if (error) {
      throw error;
    }
  },
};

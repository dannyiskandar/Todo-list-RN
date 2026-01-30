import { components } from "@shared/api/schema";
import { TodoItem } from "./todo-item";

// Service interfaces - use case contracts
export interface ITodoService {
  getTodos(): Promise<TodoItem[]>;
  createTodo(
    title: string,
    notes?: string,
    dueDate?: Date,
    category?: components["schemas"]["TodoCategory"],
  ): Promise<TodoItem>;
  updateTodo(
    id: string,
    updates: Partial<
      Pick<TodoItem, "title" | "notes" | "dueDate" | "category">
    >,
  ): Promise<TodoItem>;
  toggleTodo(id: string): Promise<TodoItem>;
  deleteTodo(id: string): Promise<void>;
}

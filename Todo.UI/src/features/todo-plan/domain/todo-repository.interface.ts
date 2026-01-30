import { TodoItem } from "./todo-item";

// Repository interfaces - data access contracts
export interface ITodoRepository {
  getAll(): Promise<TodoItem[]>;
  getById(id: string): Promise<TodoItem | null>;
  create(
    todo: Omit<TodoItem, "id" | "createdAt" | "updatedAt">,
  ): Promise<TodoItem>;
  update(id: string, todo: TodoItem): Promise<TodoItem>;
  delete(id: string): Promise<void>;
}

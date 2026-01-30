import { components } from "@shared/api/schema";

// Re-export API types for external use
export type TodoItemDto = components["schemas"]["TodoItemDto"];
export type TodoItemCreateDto = components["schemas"]["TodoItemCreateDto"];
export type TodoItemUpdateDto = components["schemas"]["TodoItemUpdateDto"];
export type TodoCategory = components["schemas"]["TodoCategory"];

// Re-export domain entities
export { TodoItem } from "./todo-item";
export {
  TODO_CATEGORIES,
  getCategoryConfig,
  getDefaultCategory,
} from "./todo-categories";

// Re-export domain interfaces
export type { ITodoRepository } from "./todo-repository.interface";
export type { ITodoService } from "./todo-service.interface";

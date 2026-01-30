import { ITodoRepository, TodoItem } from "../domain";
import { todoPlanApi } from "./todo-plan-api";

export class TodoRepository implements ITodoRepository {
  async getAll(): Promise<TodoItem[]> {
    const dtos = await todoPlanApi.getTodoItems();
    return dtos.map((dto) => TodoItem.fromDto(dto));
  }

  async getById(id: string): Promise<TodoItem | null> {
    const dto = await todoPlanApi.getTodoItem(id);
    return TodoItem.fromDto(dto);
  }

  async create(
    todo: Omit<TodoItem, "id" | "createdAt" | "updatedAt">,
  ): Promise<TodoItem> {
    const createDto = {
      title: todo.title,
      notes: todo.notes,
      isCompleted: todo.isCompleted,
      dueDate: todo.dueDate?.toISOString() || null,
      category: todo.category,
    };

    const createdDto = await todoPlanApi.createTodoItem(createDto);
    return TodoItem.fromDto(createdDto);
  }

  async update(id: string, todo: TodoItem): Promise<TodoItem> {
    const updateDto = {
      id,
      title: todo.title,
      notes: todo.notes,
      isCompleted: todo.isCompleted,
      dueDate: todo.dueDate?.toISOString() || null,
      category: todo.category,
    };

    await todoPlanApi.updateTodoItem(id, updateDto);
    return todo;
  }

  async delete(id: string): Promise<void> {
    await todoPlanApi.deleteTodoItem(id);
  }
}

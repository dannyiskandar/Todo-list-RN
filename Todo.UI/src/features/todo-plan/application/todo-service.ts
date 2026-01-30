import {
  ITodoRepository,
  ITodoService,
  TodoItem,
  TodoCategory,
} from "../domain";

export class TodoService implements ITodoService {
  constructor(private readonly repository: ITodoRepository) {}

  async getTodos(): Promise<TodoItem[]> {
    return this.repository.getAll();
  }

  async createTodo(
    title: string,
    notes: string = "",
    dueDate: Date | null = null,
    category: TodoCategory = "Custom",
  ): Promise<TodoItem> {
    const todo = new TodoItem(
      "", // ID will be set by repository
      title,
      notes,
      false,
      dueDate,
      category,
      new Date(),
      new Date(),
    );

    return this.repository.create(todo);
  }

  async updateTodo(
    id: string,
    updates: Partial<
      Pick<TodoItem, "title" | "notes" | "dueDate" | "category">
    >,
  ): Promise<TodoItem> {
    const existing = await this.repository.getById(id);
    if (!existing) {
      throw new Error(`Todo with id ${id} not found`);
    }

    const updated = existing.update(updates);
    return this.repository.update(id, updated);
  }

  async toggleTodo(id: string): Promise<TodoItem> {
    const existing = await this.repository.getById(id);
    if (!existing) {
      throw new Error(`Todo with id ${id} not found`);
    }

    const toggled = new TodoItem(
      existing.id,
      existing.title,
      existing.notes,
      !existing.isCompleted, // toggle completion status
      existing.dueDate,
      existing.category,
      existing.createdAt,
      new Date(),
    );

    return this.repository.update(id, toggled);
  }

  async deleteTodo(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}

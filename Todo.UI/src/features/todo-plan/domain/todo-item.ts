import { components } from "@shared/api/schema";

// Domain entities - business logic focused
export class TodoItem {
  constructor(
    public readonly id: string,
    public title: string,
    public notes: string,
    public isCompleted: boolean,
    public dueDate: Date | null,
    public category: components["schemas"]["TodoCategory"],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static fromDto(dto: components["schemas"]["TodoItemDto"]): TodoItem {
    return new TodoItem(
      dto.id || "",
      dto.title || "",
      dto.notes || "",
      dto.isCompleted || false,
      dto.dueDate ? new Date(dto.dueDate) : null,
      dto.category || "Custom",
      new Date(dto.createdAt || ""),
      new Date(dto.updatedAt || ""),
    );
  }

  toDto(): components["schemas"]["TodoItemDto"] {
    return {
      id: this.id,
      title: this.title,
      notes: this.notes,
      isCompleted: this.isCompleted,
      dueDate: this.dueDate?.toISOString() || null,
      category: this.category,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  markComplete(): TodoItem {
    return new TodoItem(
      this.id,
      this.title,
      this.notes,
      true,
      this.dueDate,
      this.category,
      this.createdAt,
      new Date(),
    );
  }

  update(
    details: Partial<
      Pick<TodoItem, "title" | "notes" | "dueDate" | "category">
    >,
  ): TodoItem {
    return new TodoItem(
      this.id,
      details.title ?? this.title,
      details.notes ?? this.notes,
      this.isCompleted,
      details.dueDate ?? this.dueDate,
      details.category ?? this.category,
      this.createdAt,
      new Date(),
    );
  }
}

using Todo.Domain.TodoPlan.Enums;

namespace Todo.Domain.TodoPlan.Entities
{
    public class TodoItem
    {
        // Unique identifier for the todo
        public Guid Id { get; set; } = Guid.NewGuid();

        // Description of the task
        public string Title { get; set; } = string.Empty;

        // Additional notes for the task
        public string Notes { get; set; } = string.Empty;

        // Whether the task is completed
        public bool IsCompleted { get; set; } = false;

        // Optional due date; can be null for Someday or Custom
        public DateTime? DueDate { get; set; }

        // Category for grouping tasks
        public TodoCategory Category { get; set; } = TodoCategory.Someday;

        // Creation timestamp
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Update timestamp
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

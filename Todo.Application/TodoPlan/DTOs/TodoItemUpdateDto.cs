using Todo.Domain.TodoPlan;
using Todo.Domain.TodoPlan.Enums;

namespace Todo.Application.TodoPlan.Dtos
{
    public class TodoItemUpdateDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
        public DateTime? DueDate { get; set; }
        public TodoCategory Category { get; set; }
    }
}
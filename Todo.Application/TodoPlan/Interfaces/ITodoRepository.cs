using Todo.Domain.TodoPlan.Entities;

namespace Todo.Application.TodoPlan.Interfaces
{
    public interface ITodoRepository
    {
        Task<TodoItem?> GetByIdAsync(Guid id);
        Task<IEnumerable<TodoItem>> GetAllAsync();
        Task AddAsync(TodoItem item);
        Task UpdateAsync(TodoItem item);
        Task DeleteAsync(Guid id);
        Task<bool> ExistsAsync(Guid id);
    }
}
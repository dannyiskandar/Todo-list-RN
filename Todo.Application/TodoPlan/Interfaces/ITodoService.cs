using Todo.Domain.TodoPlan.Entities;
using Todo.Application.TodoPlan.Dtos;

namespace Todo.Application.TodoPlan.Interfaces
{
    public interface ITodoService
    {
        Task<TodoItemDto?> GetByIdAsync(Guid id);
        Task<IEnumerable<TodoItemDto>> GetAllAsync();
        Task<TodoItemDto> AddAsync(TodoItemCreateDto item);
        Task UpdateAsync(TodoItemUpdateDto item);
        Task DeleteAsync(Guid id);
    }
}
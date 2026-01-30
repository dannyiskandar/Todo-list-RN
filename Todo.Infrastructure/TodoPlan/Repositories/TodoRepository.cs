using Microsoft.EntityFrameworkCore;
using Todo.Application.TodoPlan.Interfaces;
using Todo.Domain.TodoPlan.Entities;
using Todo.Infrastructure.Data;

namespace Todo.Infrastructure.TodoPlan.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly TodoDbContext _context;

        public TodoRepository(TodoDbContext context)
        {
            _context = context;
        }

        public async Task<TodoItem?> GetByIdAsync(Guid id)
        {
            return await _context.Todos.FindAsync(id);
        }

        public async Task<IEnumerable<TodoItem>> GetAllAsync()
        {
            return await _context.Todos.ToListAsync();
        }

        public async Task AddAsync(TodoItem item)
        {
            await _context.Todos.AddAsync(item);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(TodoItem item)
        {
            _context.Todos.Update(item);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var item = await GetByIdAsync(id);
            if (item != null)
            {
                _context.Todos.Remove(item);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsAsync(Guid id)
        {
            return await _context.Todos.AnyAsync(t => t.Id == id);
        }
    }
}
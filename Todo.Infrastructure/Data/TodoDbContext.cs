using Microsoft.EntityFrameworkCore;
using Todo.Domain.TodoPlan.Entities;
using Todo.Domain.TodoPlan.Enums;

namespace Todo.Infrastructure.Data
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
        {
        }

        public DbSet<TodoItem> Todos => Set<TodoItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Apply all configuration classes in the assembly
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(TodoDbContext).Assembly);
        } 
    }
}

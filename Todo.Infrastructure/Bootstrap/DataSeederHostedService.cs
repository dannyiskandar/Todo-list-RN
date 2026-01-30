using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Todo.Domain.TodoPlan.Entities;
using Todo.Domain.TodoPlan.Enums;
using Todo.Infrastructure.Data;

namespace Todo.Infrastructure.Bootstrap
{
    public class DataSeederHostedService : IHostedService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public DataSeederHostedService(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _scopeFactory.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<TodoDbContext>();
            await SeedAsync(dbContext);
        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;

        private async Task SeedAsync(TodoDbContext dbContext)
        {
            if (!dbContext.Todos.Any())
            {
                dbContext.Todos.AddRange(
                    new TodoItem
                    {
                        Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                        Title = "Complete project proposal",
                        Notes = "Draft and review the Q4 project proposal",
                        IsCompleted = false,
                        DueDate = DateTime.UtcNow.AddDays(7),
                        Category = TodoCategory.NextWeek,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    },
                    new TodoItem
                    {
                        Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                        Title = "Buy groceries",
                        Notes = "Milk, bread, eggs",
                        IsCompleted = true,
                        DueDate = null,
                        Category = TodoCategory.ThisEvening,
                        CreatedAt = DateTime.UtcNow.AddDays(-1),
                        UpdatedAt = DateTime.UtcNow.AddDays(-1)
                    },
                    new TodoItem
                    {
                        Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                        Title = "Plan vacation",
                        Notes = "Research destinations and book flights",
                        IsCompleted = false,
                        DueDate = DateTime.UtcNow.AddMonths(1),
                        Category = TodoCategory.Someday,
                        CreatedAt = DateTime.UtcNow.AddDays(-2),
                        UpdatedAt = DateTime.UtcNow.AddDays(-2)
                    },
                    new TodoItem
                    {
                        Id = Guid.Parse("44444444-4444-4444-4444-444444444444"),
                        Title = "Call dentist",
                        Notes = "Schedule appointment for checkup",
                        IsCompleted = false,
                        DueDate = DateTime.UtcNow.AddDays(3),
                        Category = TodoCategory.NextWeek,
                        CreatedAt = DateTime.UtcNow.AddDays(-3),
                        UpdatedAt = DateTime.UtcNow.AddDays(-3)
                    },
                    new TodoItem
                    {
                        Id = Guid.Parse("55555555-5555-5555-5555-555555555555"),
                        Title = "Read book",
                        Notes = "Finish reading 'The Pragmatic Programmer'",
                        IsCompleted = false,
                        DueDate = DateTime.UtcNow.AddDays(14),
                        Category = TodoCategory.Someday,
                        CreatedAt = DateTime.UtcNow.AddDays(-5),
                        UpdatedAt = DateTime.UtcNow.AddDays(-5)
                    },
                    new TodoItem
                    {
                        Id = Guid.Parse("66666666-6666-6666-6666-666666666666"),
                        Title = "Exercise",
                        Notes = "Go for a 30-minute run",
                        IsCompleted = true,
                        DueDate = null,
                        Category = TodoCategory.ThisEvening,
                        CreatedAt = DateTime.UtcNow.AddDays(-1),
                        UpdatedAt = DateTime.UtcNow.AddDays(-1)
                    }
                );
                await dbContext.SaveChangesAsync();
            }
        }
    }
}
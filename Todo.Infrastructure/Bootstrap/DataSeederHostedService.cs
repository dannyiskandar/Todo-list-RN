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
                    }
                );
                await dbContext.SaveChangesAsync();
            }
        }
    }
}
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Todo.Application.TodoPlan.Interfaces;
using Todo.Infrastructure.Data;
using Todo.Infrastructure.TodoPlan.Repositories;

namespace Todo.Infrastructure.Bootstrap
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureBootsrap(this IServiceCollection services)
        {
            services.AddDbContext<TodoDbContext>(options =>
                options.UseInMemoryDatabase("TodoDb"));

            //we can use autofac here for scanning assemblies
            services.AddScoped<ITodoRepository, TodoRepository>();

            //seed data for testing - please remove it
            services.AddHostedService<DataSeederHostedService>();

            return services;
        }
    }
}
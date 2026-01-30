using Microsoft.Extensions.DependencyInjection;
using Todo.Application.TodoPlan.Interfaces;
using Todo.Application.TodoPlan.Services;
using Todo.Application.TodoPlan.Mappings;
using FluentValidation;
using Todo.Application.TodoPlan.Validators;

namespace Todo.Application.Bootstrap
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationBootstrap(this IServiceCollection services)
        {
            //we can use autofac here for scanning assemblies
            services.AddScoped<ITodoService, TodoService>();

            services.AddAutoMapper(typeof(TodoMappingProfile).Assembly);

            services.AddValidatorsFromAssemblyContaining<TodoItemCreateDtoValidator>();

            return services;
        }
    }
}
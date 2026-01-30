using AutoMapper;
using Todo.Application.TodoPlan.Dtos;
using Todo.Domain.TodoPlan.Entities;

namespace Todo.Application.TodoPlan.Mappings
{
    public class TodoMappingProfile : Profile
    {
        public TodoMappingProfile()
        {
            CreateMap<TodoItem, TodoItemDto>();
            CreateMap<TodoItemCreateDto, TodoItem>();
            CreateMap<TodoItemUpdateDto, TodoItem>();
        }
    }
}
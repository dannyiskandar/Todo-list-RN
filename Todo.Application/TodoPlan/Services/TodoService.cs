using Todo.Application.TodoPlan.Interfaces;
using Todo.Domain.TodoPlan.Entities;
using AutoMapper;
using Todo.Application.TodoPlan.Dtos;

namespace Todo.Application.TodoPlan.Services
{
    public class TodoService : ITodoService
    {
        private readonly ITodoRepository _todoRepository;
        private readonly IMapper _mapper;

        public TodoService(ITodoRepository todoRepository, IMapper mapper)
        {
            _todoRepository = todoRepository;
            _mapper = mapper;
        }

        public async Task<TodoItemDto?> GetByIdAsync(Guid id)
        {
            var entity = await _todoRepository.GetByIdAsync(id);
            return _mapper.Map<TodoItemDto>(entity);
        }

        public async Task<IEnumerable<TodoItemDto>> GetAllAsync()
        {
            var entities = await _todoRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<TodoItemDto>>(entities);
        }

        public async Task<TodoItemDto> AddAsync(TodoItemCreateDto item)
        {
            var entity = _mapper.Map<TodoItem>(item);
            await _todoRepository.AddAsync(entity);
            return _mapper.Map<TodoItemDto>(entity);
        }

        public async Task UpdateAsync(TodoItemUpdateDto item)
        {
            var entity = _mapper.Map<TodoItem>(item);
            entity.UpdatedAt = DateTime.UtcNow;
            await _todoRepository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _todoRepository.DeleteAsync(id);
        }
    }
}
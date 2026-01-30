using Microsoft.AspNetCore.Mvc;
using Todo.Application.TodoPlan.Interfaces;
using Todo.Application.TodoPlan.Dtos;

namespace Todo.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoItemsController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodoItemsController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItemDto>>> GetTodoItems()
        {
            var items = await _todoService.GetAllAsync();
            return Ok(items);
        }

        // GET: api/TodoItems/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItemDto>> GetTodoItem(Guid id)
        {
            var item = await _todoService.GetByIdAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // POST: api/TodoItems
        [HttpPost]
        public async Task<ActionResult<TodoItemDto>> PostTodoItem(TodoItemCreateDto item)
        {
            var createdItem = await _todoService.AddAsync(item);
            return CreatedAtAction(nameof(GetTodoItem), new { id = createdItem.Id }, createdItem);
        }

        // PUT: api/TodoItems/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(Guid id, TodoItemUpdateDto item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            await _todoService.UpdateAsync(item);

            return NoContent();
        }

        // DELETE: api/TodoItems/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(Guid id)
        {
            var item = await _todoService.GetByIdAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            await _todoService.DeleteAsync(id);
            return NoContent();
        }

        // GET: api/TodoItems/test-error
        [HttpGet("test-error")]
        public IActionResult TestError()
        {
            throw new Exception("This is a test error to verify global error handling.");
        }
    }
}
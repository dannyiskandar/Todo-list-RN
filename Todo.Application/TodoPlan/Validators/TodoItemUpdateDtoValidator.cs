using FluentValidation;
using Todo.Application.TodoPlan.Dtos;

namespace Todo.Application.TodoPlan.Validators
{
    public class TodoItemUpdateDtoValidator : AbstractValidator<TodoItemUpdateDto>
    {
        public TodoItemUpdateDtoValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty();
            RuleFor(x => x.Title)
                .NotEmpty()
                .MaximumLength(200);
            RuleFor(x => x.Notes)
                .MaximumLength(1000);
            RuleFor(x => x.DueDate)
                .GreaterThan(DateTime.Now).When(x => x.DueDate.HasValue);
        }
    }
}
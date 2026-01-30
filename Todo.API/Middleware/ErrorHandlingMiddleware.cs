using Todo.Application.DTOs;

namespace Todo.API.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex) // for now, catch all exceptions and returns 500
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var response = new ErrorResponseDto
            {
                Title = "An unexpected error occurred.",
                Status = 500,
                Errors = new Dictionary<string, string[]> { { "Exception", new[] { exception.Message } } },
                TraceId = context.TraceIdentifier
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 500;
            return context.Response.WriteAsJsonAsync(response);
        }
    }
}
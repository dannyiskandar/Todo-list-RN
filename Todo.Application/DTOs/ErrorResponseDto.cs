namespace Todo.Application.DTOs
{
    public class ErrorResponseDto
    {
        public string Title { get; set; } = "";
        public int Status { get; set; } // HTTP status code
        public Dictionary<string, string[]> Errors { get; set; } = new(); 
        public string TraceId { get; set; } = "";
    }
}
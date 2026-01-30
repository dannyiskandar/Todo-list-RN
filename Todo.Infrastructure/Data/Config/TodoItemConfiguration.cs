using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Todo.Domain.TodoPlan.Entities;

namespace Todo.Infrastructure.Data.Config
{
    public class TodoItemConfiguration : IEntityTypeConfiguration<TodoItem>
    {
        public void Configure(EntityTypeBuilder<TodoItem> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id);

            builder.Property(x => x.Title)
                   .IsRequired()
                   .HasMaxLength(200);

            builder.Property(x => x.Notes)
                   .HasMaxLength(1000);

            builder.Property(x => x.IsCompleted);

            builder.Property(x => x.DueDate);

            builder.Property(x => x.Category)
                   .HasConversion<int>();

            builder.Property(x => x.CreatedAt);

            builder.Property(x => x.UpdatedAt);
        }
    }
}

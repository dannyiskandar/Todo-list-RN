using Todo.Application.Bootstrap;
using Todo.Application.Converters;
using Todo.API.Middleware;
using Todo.Application.DTOs;
using Todo.Infrastructure.Bootstrap;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumMemberConverter());
    })
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var errors = context.ModelState
                .Where(e => e.Value.Errors.Count > 0)
                .ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                );
            var response = new ErrorResponseDto
            {
                Title = "One or more validation errors occurred.",
                Status = 400,
                Errors = errors,
                TraceId = context.HttpContext.TraceIdentifier
            };
            return new BadRequestObjectResult(response);
        };
    });

builder.Services
    .AddOpenApi()
    .AddApplicationBootstrap()
    .AddInfrastructureBootsrap()
    .AddFluentValidationAutoValidation();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();

using System.Runtime.Serialization;
using System.Reflection;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;

/// <summary>
/// convert enum with EnumMember attribute to string in OpenAPI schema - enum string
/// </summary>
public class EnumSchemaTransformer : IOpenApiSchemaTransformer
{
    public Task TransformAsync(OpenApiSchema schema, OpenApiSchemaTransformerContext context, CancellationToken cancellationToken)
    {
        if (context.JsonTypeInfo?.Type?.IsEnum == true)
        {
            var enumType = context.JsonTypeInfo.Type;
            schema.Type = "string";
            var values = new List<IOpenApiAny>();
            foreach (var value in Enum.GetValues(enumType))
            {
                var member = enumType.GetMember(value.ToString()).FirstOrDefault();
                var attr = member?.GetCustomAttribute<EnumMemberAttribute>();
                var str = attr?.Value ?? value.ToString();
                values.Add(new OpenApiString(str));
            }
            schema.Enum = values;
        }
        return Task.CompletedTask;
    }
}
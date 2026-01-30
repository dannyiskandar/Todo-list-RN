using System.Reflection;
using System.Runtime.Serialization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Todo.Application.Converters
{
    public sealed class JsonStringEnumMemberConverter : JsonConverterFactory
    {
        public override bool CanConvert(Type typeToConvert) => typeToConvert.IsEnum;

        public override JsonConverter CreateConverter(
            Type typeToConvert,
            JsonSerializerOptions options)
        {
            var converterType = typeof(EnumMemberConverter<>)
                .MakeGenericType(typeToConvert);

            return (JsonConverter)Activator.CreateInstance(converterType)!;
        }

        private sealed class EnumMemberConverter<T> : JsonConverter<T>
            where T : struct, Enum
        {
            private readonly Dictionary<string, T> _fromString;
            private readonly Dictionary<T, string> _toString;

            public EnumMemberConverter()
            {
                _fromString = new();
                _toString = new();

                foreach (var field in typeof(T).GetFields(BindingFlags.Public | BindingFlags.Static))
                {
                    var enumValue = (T)field.GetValue(null)!;

                    var enumMember = field
                        .GetCustomAttribute<EnumMemberAttribute>();

                    var name = enumMember?.Value ?? field.Name;

                    _fromString[name] = enumValue;
                    _toString[enumValue] = name;
                }
            }

            public override T Read(ref Utf8JsonReader reader, Type type, JsonSerializerOptions options)
            {
                var value = reader.GetString();

                if (value != null && _fromString.TryGetValue(value, out var result))
                    return result;

                throw new JsonException($"Invalid value '{value}' for enum {typeof(T).Name}");
            }

            public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
            {
                if (_toString.TryGetValue(value, out var name))
                {
                    writer.WriteStringValue(name);
                    return;
                }

                writer.WriteStringValue(value.ToString());
            }
        }
    }
}
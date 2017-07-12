namespace TinyDan.Common
{
    using System.Collections.Generic;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    public class JsonSerializer : IDataSerializer
    {
        private readonly JsonSerializerSettings _settings;

        public JsonSerializer(JsonSerializerSettings settings)
        {
            this._settings = settings;
        }

        public string Serialize(object data)
        {
            return data != null 
                ? JsonConvert.SerializeObject(data, this._settings)
                : null;
        }

        public T Deserialize<T>(string data)
        {
            return !string.IsNullOrWhiteSpace(data)
                ? JsonConvert.DeserializeObject<T>(data, this._settings)
                : default(T);
        }

        public static JsonSerializerSettings DefaultSettings => new JsonSerializerSettings
        {
            DefaultValueHandling = DefaultValueHandling.IgnoreAndPopulate,
            Formatting = Formatting.None,
            NullValueHandling = NullValueHandling.Ignore,
            Converters = new List<JsonConverter> {new StringEnumConverter {CamelCaseText = true}}
        };
    }
}

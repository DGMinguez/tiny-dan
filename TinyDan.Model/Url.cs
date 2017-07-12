namespace TinyDan.Model
{
    using Newtonsoft.Json;

    public class Url
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "longUrl")]
        public string LongUrl { get; set; }

        [JsonProperty(PropertyName = "customAlias")]
        public string CustomAlias { get; set; }

        [JsonProperty(PropertyName = "urlKey")]
        public string UrlKey { get; set; } 
    }
}

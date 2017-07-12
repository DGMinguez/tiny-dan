namespace TinyDan.Common
{
    public static class Constants
    {
        // AppSettings
        private const string AppSettingsSectionKey = "AppSettings:";
        public const string ApplicationNameKey = AppSettingsSectionKey + "ApplicationName";
        public const string RedisCacheEndpointKey = AppSettingsSectionKey + "RedisCacheEndpoint";
        public const string RedisCachePortKey = AppSettingsSectionKey + "RedisCachePort";
        public const string RedisPasswordKey = AppSettingsSectionKey + "RedisCachePassword";
        public const string RedisCacheDefaultTimeSpanKey = AppSettingsSectionKey + "RedisCacheDefaultTimeSpan";
    }
}

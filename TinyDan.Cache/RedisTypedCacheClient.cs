namespace TinyDan.Cache
{
    using System;
    using System.Collections.Generic;
    using TinyDan.Common;

    public class RedisTypedCacheClient : RedisCacheClient, ITypedCacheClient
    {
        private readonly IDataSerializer _serializer;

        private readonly TimeSpan _defaultTimeSpan;

        public RedisTypedCacheClient(IRedisDbProvider redisDbProvider, IDataSerializer serializer, TimeSpan defaultTimeSpan)
            : base(redisDbProvider, defaultTimeSpan)
        {
            this._serializer = serializer;
            this._defaultTimeSpan = defaultTimeSpan;
        }

        public T Get<T>(string key)
        {
            var serializedData = base.Get(key);
            return string.IsNullOrWhiteSpace(serializedData) 
                ? default(T) 
                : this._serializer.Deserialize<T>(serializedData);
        }

        public IEnumerable<T> GetMultiple<T>(string[] keys)
        {
            var serializedDatas = base.GetMultiple(keys);
            foreach (var serializedData in serializedDatas)
            {
                yield return string.IsNullOrWhiteSpace(serializedData) 
                    ? default(T) 
                    : this._serializer.Deserialize<T>(serializedData);
            }
        }

        public bool Set(string key, object data, TimeSpan? expiry = null)
        {
            var serializedData = this._serializer.Serialize(data);
            return base.Set(key, serializedData, expiry ?? this._defaultTimeSpan);
        }
    }
}

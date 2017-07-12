namespace TinyDan.Cache
{
    using StackExchange.Redis;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// StackExchange.Redis package github page: https://github.com/StackExchange/StackExchange.Redis
    /// </summary>
    public class RedisCacheClient : ICacheClient
    {
        private readonly IRedisDbProvider _dbProvider;

        private readonly TimeSpan _defaultTimeSpan;

        public RedisCacheClient(IRedisDbProvider redisDbProvider, TimeSpan defaultTimeSpan)
        {
            this._dbProvider = redisDbProvider;
            this._defaultTimeSpan = defaultTimeSpan;
        }

        public string Get(string key)
        {
            var cache = this._dbProvider.GetDatabase();
            var response = cache.StringGet(key);
           
            return response;
        }

        public IEnumerable<string> GetMultiple(string[] keys)
        {
            var cache = this._dbProvider.GetDatabase();            
            var response = cache.StringGet(keys.Select(key => (RedisKey) key).ToArray()).Select(redisValue => redisValue.ToString());
            return response;
        }

        public bool Set(string key, string value, TimeSpan? expiry = null)
        {
            var expiryTs = expiry ?? this._defaultTimeSpan;
            var cache = this._dbProvider.GetDatabase();
            var response = cache.StringSet(key, value, expiryTs);
            return response;
        }
    }
}
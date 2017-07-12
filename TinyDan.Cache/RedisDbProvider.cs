
namespace TinyDan.Cache
{
    using StackExchange.Redis;

    public class RedisDbProvider : IRedisDbProvider
    {
        private readonly IRedisConnection _redisConnection;

        public RedisDbProvider(IRedisConnection redisConnection)
        {
            this._redisConnection = redisConnection;
        }

        public IDatabase GetDatabase()
        {
            return this._redisConnection.ConnectionMultiplexer.GetDatabase();
        }
    }
}
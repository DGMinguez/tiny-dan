namespace TinyDan.Cache
{
    using StackExchange.Redis;

    public interface IRedisDbProvider
    {
        IDatabase GetDatabase();
    }
}

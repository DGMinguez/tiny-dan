namespace TinyDan.Cache
{
    using System;
    using StackExchange.Redis;

    public interface IRedisConnection : IDisposable
    {
       string ClientName { get; }

       string Endpoint { get;}

       int Port { get; }

       string Password { get; }

       ConnectionMultiplexer ConnectionMultiplexer { get; }
    }
}

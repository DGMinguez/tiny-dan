namespace TinyDan.Cache
{
    using System;
    using System.IO;
    using StackExchange.Redis;

    /// <summary>
    /// Register instance of this class as a Singleton object in DI. ConnectionMultiplexer handles connection failures and reconnection
    /// </summary>
    public class RedisConnection : IRedisConnection
    {
        private bool _disposed;
        private readonly object _lock = new object();
        private Lazy<ConnectionMultiplexer> _lazyConnection;

        public ConnectionMultiplexer ConnectionMultiplexer => _lazyConnection.Value;

        public string ClientName { get; }

        public string Endpoint { get; }

        public int Port { get; }

        public string Password { get; }

        public RedisConnection(string clientName, string endpoint, int port, string password)
        {
            this.ClientName = clientName;
            this.Endpoint = endpoint;
            this.Port = port;
            this.Password = password;
            this._lazyConnection = new Lazy<ConnectionMultiplexer>(() =>
            {
                using (var strWriter = new StringWriter())
                {
                    var options = new ConfigurationOptions
                    {                          
                        Ssl = true,
                        ClientName = this.ClientName,
                        EndPoints = { { this.Endpoint, this.Port } },
                        Password = this.Password,
                        AbortOnConnectFail = false,
                        ConnectRetry = 3,
                        ConnectTimeout = 10000,
                        KeepAlive = 90,
                        SyncTimeout = 5000,
                        DefaultVersion = new Version("3.0")
                    };
                    var connectionMultiplexer = ConnectionMultiplexer.Connect(options, strWriter);
                    return connectionMultiplexer;
                }
            });
        }

        public void Dispose()
        {
            // Dispose of unmanaged resources.
            Dispose(true);

            // Suppress finalization.
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
            if (this._disposed)
            {
                return;
            }

            if (disposing)
            {
                if (_lazyConnection != null)
                {
                    lock (_lock)
                    {
                        try
                        {
                            this.ConnectionMultiplexer?.Dispose();
                        }
                        catch
                        {
                        }
                        _lazyConnection = null;
                    }
                }
            }

            this._disposed = true;
        }
    }
}
namespace TinyDanApi
{
    using System;
    using Autofac;
    using Autofac.Core;
    using Microsoft.Extensions.Configuration;
    using TinyDan.Cache;
    using TinyDan.Common;
    using TinyDan.Repository;

    public class RegistrationModule : Module
    {
        private readonly IConfiguration _config;

        public RegistrationModule(IConfiguration config)
        {
            this._config = config;
        }

        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<RedisConnection>().As<IRedisConnection>().SingleInstance().WithParameters(new Parameter[]
            {
                new NamedParameter("clientName", this._config[Constants.ApplicationNameKey]),
                new NamedParameter("endpoint", _config[Constants.RedisCacheEndpointKey]),
                new NamedParameter("port", _config[Constants.RedisCachePortKey]),
                new NamedParameter("password", _config[Constants.RedisPasswordKey]),
            });
            builder.RegisterType<RedisDbProvider>().As<IRedisDbProvider>().SingleInstance();

            var timeSpan = TimeSpan.Parse(_config[Constants.RedisCacheDefaultTimeSpanKey]);
            builder.RegisterType<RedisTypedCacheClient>().As<ITypedCacheClient>().WithParameter("defaultTimeSpan", timeSpan);

            // Configure all interface implementations to be injected.
            builder.RegisterType<UrlRepository>().As<IUrlRepository>();
        }
    }
}

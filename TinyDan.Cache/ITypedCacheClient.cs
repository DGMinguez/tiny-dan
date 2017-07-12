namespace TinyDan.Cache
{
    using System;
    using System.Collections.Generic;

    public interface ITypedCacheClient
    {
        T Get<T>(string key);

        IEnumerable<T> GetMultiple<T>(string[] keys);

        bool Set(string key, object data, TimeSpan? expiry = null);
    }
}

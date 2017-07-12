
namespace TinyDan.Cache
{
    using System;
    using System.Collections.Generic;

    public interface ICacheClient
    {
        string Get(string key);

        IEnumerable<string> GetMultiple(string[] keys);

        bool Set(string key, string value, TimeSpan? expiry = null);
    }
}
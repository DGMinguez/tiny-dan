namespace TinyDan.Repository
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using TinyDan.Cache;
    using TinyDan.Model;

    public class UrlRepository : IUrlRepository
    {
        private readonly ITypedCacheClient _redisCacheClient;

        public UrlRepository(ITypedCacheClient redisCacheClient)
        {
            this._redisCacheClient = redisCacheClient;
        }

        public async Task<Url> GetByKeyAsync(string key)
        {
            var cts = new CancellationTokenSource();
            return new Url();
        }

        public async Task<Url> GetByLongUrlAsync(string longUrl)
        {
            var cts = new CancellationTokenSource();
            return new Url(); ;
        }

        public async Task<Url> SaveAsync(Url url)
        {
            var cts = new CancellationTokenSource();
            return new Url();
        }
    }
}

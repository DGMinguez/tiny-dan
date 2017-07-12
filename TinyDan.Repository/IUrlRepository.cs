namespace TinyDan.Repository
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using TinyDan.Model;

    public interface IUrlRepository
    {
        Task<Url> GetByKeyAsync(string key);

        Task<Url> GetByLongUrlAsync(string longUrl);

        Task<Url> SaveAsync(Url url);
    }
}

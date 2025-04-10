using Funeral.Models;

namespace Funeral.Data.DataAccess
{
    public interface ICompanyDataAccess
    {
        Task<Company> GetCompanyAsync();
    }
}

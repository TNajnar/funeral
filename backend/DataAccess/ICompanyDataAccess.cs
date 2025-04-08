using Funeral.Models;

namespace Funeral.DataAccess
{
    public interface ICompanyDataAccess
    {
        Task<Company> GetCompanyAsync();
    }
}

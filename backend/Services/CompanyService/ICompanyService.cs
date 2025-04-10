using Funeral.Dto;

namespace Funeral.Services
{
    public interface ICompanyService
    {
        Task<CompanyDto> GetCompanyAsync();
    }
}

using Funeral.DataAccess;
using Funeral.Dto;

namespace Funeral.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyDataAccess _companyDataAccess;

        public CompanyService(ICompanyDataAccess companyDataAccess)
        {
            _companyDataAccess = companyDataAccess;
        }

        public async Task<CompanyDto> GetCompanyAsync()
        {
            var company = await _companyDataAccess.GetCompanyAsync();

            var companyDto = new CompanyDto
            {
                Id = company.Id,
                Name = company.Name,
                Branches = company.Branches.Select(b => new BranchDto
                {
                    Id = b.Id,
                    Name = b.Name,
                    Address = b.Address,
                    PhoneNumber = b.PhoneNumber
                }).ToList()
            };

            return companyDto;
        }
    }
}

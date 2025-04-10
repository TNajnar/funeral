using Funeral.Data.DataAccess;
using Funeral.Dto;
using Funeral.Models;

namespace Funeral.Services
{
    public class BranchService : IBranchService
    {
        private readonly IBranchDataAccess _branchDataAccess;

        public BranchService(IBranchDataAccess branchDataAccess)
        {
            _branchDataAccess = branchDataAccess;
        }

        public async Task<List<BranchDto>> GetAllBranchesAsync()
        {
            var branches = await _branchDataAccess.GetAllBranchesAsync();

            var branchesDto = branches.Select(branch => new BranchDto
            {
                Id = branch.Id,
                Address = branch.Address,
                CompanyDic = branch.CompanyDic,
                CompanyIco = branch.CompanyIco,
                Name = branch.Name,
                PhoneNumber = branch.PhoneNumber,
            }).ToList();

            return branchesDto;
        }

        public async Task CreateNewBranchAsync(BranchDto branchDto)
        {
            var branch = new Branch
            {
                Address = branchDto.Address,
                CompanyDic = branchDto.CompanyDic,
                CompanyIco = branchDto.CompanyIco,
                Name = branchDto.Name,
                PhoneNumber = branchDto.PhoneNumber,
            };

            await _branchDataAccess.CreateNewBranchAsync(branch);
        }

        public async Task DeleteBranchAsync(int id)
        {
            await _branchDataAccess.DeleteBranchAsync(id);
        }

        public async Task<BranchDto> GetBranchByIdAsync(int id)
        {
            var branch = await _branchDataAccess.GetBranchByIdAsync(id);

            if (branch == null)
            {
                throw new KeyNotFoundException($"Branch with ID {id} was not found.");
            }

            var branchDto = new BranchDto
            {
                Id = branch.Id,
                Address = branch.Address,
                CompanyDic = branch.CompanyDic,
                CompanyIco = branch.CompanyIco,
                Name = branch.Name,
                PhoneNumber = branch.PhoneNumber,
            };

            return branchDto;
        }

        public async Task<BranchDto> ChangeBranchNameAsync(int id, string name)
        {
            await _branchDataAccess.ChangeBranchNameAsync(name);

            var branch = await GetBranchByIdAsync(id);

            return branch;
        }

        public async Task<BranchDto> ChangeBranchAddressAsync(int id, string address)
        {
            await _branchDataAccess.ChangeBranchAddressAsync(address);

            var branch = await GetBranchByIdAsync(id);

            return branch;
        }

        public async Task<BranchDto> ChangeBranchPhoneNumberAsync(int id, string phoneNumber)
        {
            await _branchDataAccess.ChangeBranchPhoneNumberAsync(phoneNumber);

            var branch = await GetBranchByIdAsync(id);

            return branch;
        }

        public async Task<BranchDto> ChangeBranchCompanyIcoAsync(int id, string companyIco)
        {
            await _branchDataAccess.ChangeBranchCompanyIcoAsync(companyIco);

            var branch = await GetBranchByIdAsync(id);

            return branch;
        }

        public async Task<BranchDto> ChangeBranchCompanyDicAsync(int id, string companyDic)
        {
            await _branchDataAccess.ChangeBranchCompanyDicAsync(companyDic);

            var branch = await GetBranchByIdAsync(id);

            return branch;
        }
    }
}

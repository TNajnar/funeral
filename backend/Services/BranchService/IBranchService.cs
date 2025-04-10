using Funeral.Dto;

namespace Funeral.Services
{
    public interface IBranchService
    {
        Task<List<BranchDto>> GetAllBranchesAsync();
        Task CreateNewBranchAsync(BranchDto branch);
        Task DeleteBranchAsync(int id);
        Task<BranchDto> GetBranchByIdAsync(int id);
        Task<BranchDto> ChangeBranchNameAsync(int id, string name);
        Task<BranchDto> ChangeBranchAddressAsync(int id, string address);
        Task<BranchDto> ChangeBranchPhoneNumberAsync(int id, string phoneNumber);
        Task<BranchDto> ChangeBranchCompanyIcoAsync(int id, string companyIco);
        Task<BranchDto> ChangeBranchCompanyDicAsync(int id, string companyDic);
    }
}

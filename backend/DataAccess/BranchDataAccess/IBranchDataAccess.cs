using Funeral.Models;
using Funeral.Common.Responses;

namespace Funeral.Data.DataAccess
{
    public interface IBranchDataAccess
    {
        Task<List<Branch>> GetAllBranchesAsync();
        Task<ResponseResult> CreateNewBranchAsync(Branch branch);
        Task<ResponseResult> DeleteBranchAsync(int id);
        Task<Branch> GetBranchByIdAsync(int id);
        Task<Branch> ChangeBranchNameAsync(string name);
        Task<Branch> ChangeBranchAddressAsync(string address);
        Task<Branch> ChangeBranchPhoneNumberAsync(string phoneNumber);
        Task<Branch> ChangeBranchCompanyIcoAsync(string companyIco);
        Task<Branch> ChangeBranchCompanyDicAsync(string companyDic);
    }
}

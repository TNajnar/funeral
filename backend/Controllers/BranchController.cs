using Microsoft.AspNetCore.Mvc;

using Funeral.Services;
using Funeral.Dto;

namespace Funeral.Api.Controllers
{
    [ApiController]
    [Route("api/branch")]
    public class BranchController : ApiControllerBase
    {
        private readonly IBranchService _branchService;

        public BranchController(IBranchService branchService, ILogger<BranchController> logger) : base(logger)
        {
            _branchService = branchService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBranches()
        {
            return await HandleRequest(async () =>
            {
                var branches = await _branchService.GetAllBranchesAsync();

                return new { branches };
            });
        }

        [HttpPost]
        [Route("create-new-branch")]
        public async Task<IActionResult> CreateNewBranch([FromBody] BranchDto branch)
        {
            return await HandleRequest(async () =>
            {
                await _branchService.CreateNewBranchAsync(branch);

                return new { message = "Branch created successfully" };
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBranch(int id)
        {
            return await HandleRequest(async () =>
            {
                await _branchService.DeleteBranchAsync(id);

                return new { message = "Branch deleted successfully" };
            });
        }
        
        [HttpGet]
        [Route("detail/{id}")]
        public async Task<IActionResult> GetBranchById(int id)
        {
            return await HandleRequest(async () =>
            {
                var branch = await _branchService.GetBranchByIdAsync(id);

                return new { branch };
            });
        }

        [HttpPatch]
        [Route("change-name/{id}")]
        public async Task<IActionResult> ChangeBranchName(int id, [FromBody] string name)
        {
            return await HandleRequest(async () =>
            {
                var branch = await _branchService.ChangeBranchNameAsync(id, name);

                return new { branch };
            });
        }

        [HttpPatch]
        [Route("change-address/{id}")]
        public async Task<IActionResult> ChangeBranchAddress(int id, [FromBody] string address)
        {
            return await HandleRequest(async () =>
            {
                var branch = await _branchService.ChangeBranchAddressAsync(id, address);

                return new { branch };
            });
        }

        [HttpPatch]
        [Route("change-phone-number/{id}")]
        public async Task<IActionResult> ChangeBranchPhoneNumber(int id, [FromBody] string phoneNumber)
        {
            return await HandleRequest(async () =>
            {
                var branch = await _branchService.ChangeBranchPhoneNumberAsync(id, phoneNumber);

                return new { branch };
            });
        }

        [HttpPatch]
        [Route("change-company-ico/{id}")]
        public async Task<IActionResult> ChangeBranchCompanyIco(int id, [FromBody] string companyIco)
        {
            return await HandleRequest(async () =>
            {
                var branch = await _branchService.ChangeBranchCompanyIcoAsync(id, companyIco);

                return new { branch };
            });
        }

        [HttpPatch]
        [Route("change-company-dic/{id}")]
        public async Task<IActionResult> ChangeBranchCompanyDic(int id, [FromBody] string companyDic)
        {
            return await HandleRequest(async () =>
            {
                var branch = await _branchService.ChangeBranchCompanyDicAsync(id, companyDic);

                return new { branch };
            });
        }
    }
}

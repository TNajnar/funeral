using Microsoft.AspNetCore.Mvc;

using Funeral.Services;

namespace Funeral.Api.Controllers
{
    [ApiController]
    [Route("api/company")]
    public class CompanyController : ApiControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService, ILogger<CompanyController> logger) : base(logger)
        {
            _companyService = companyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCompany()
        {
            return await HandleRequest(async () =>
            {
                var funeralCompany = await _companyService.GetCompanyAsync();

                return new { company = funeralCompany };
            });
        }
    }
}

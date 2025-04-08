using Microsoft.AspNetCore.Mvc;

using Funeral.Services;

namespace Funeral.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCompany()
        {
            try
            {
                var funeralCompany = await _companyService.GetCompanyAsync();

                return Ok(new { company = funeralCompany });
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(new { ex.Message });
            }
        }
    }
}

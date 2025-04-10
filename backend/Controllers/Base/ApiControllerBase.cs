using Microsoft.AspNetCore.Mvc;

namespace Funeral.Api.Controllers
{
    [ApiController]
    public abstract class ApiControllerBase : ControllerBase
    {
        private readonly ILogger _logger;

        protected ApiControllerBase(ILogger logger)
        {
            _logger = logger;
        }

        protected async Task<IActionResult> HandleRequest<T>(Func<Task<T>> func)
        {
            try
            {
                var result = await func();

                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, "NotFound: {Message}", ex.Message);
                return NotFound(new { error = "Not Found", message = ex.Message });
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "BadRequest: {Message}", ex.Message);
                return BadRequest(new { error = "Bad Request", message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error occurred");
                return StatusCode(500, new { error = "Internal Server Error", message = ex.Message });
            }
        }
    }
}

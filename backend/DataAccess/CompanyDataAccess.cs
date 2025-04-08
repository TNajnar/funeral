using Microsoft.EntityFrameworkCore;

using Funeral.Data;
using Funeral.Models;

namespace Funeral.DataAccess
{
    public class CompanyDataAccess : ICompanyDataAccess
    {
        private readonly AppDbContext _context;

        public CompanyDataAccess(AppDbContext context)
        {
          	_context = context;
        }

        public async Task<Company> GetCompanyAsync()
        {
			return
				await _context.Company
                    .Include(c => c.Branches)
                    .FirstOrDefaultAsync()
				?? throw new InvalidOperationException("No company found.");
        }
    }
}

using Microsoft.EntityFrameworkCore;

using Funeral.Models;
using Funeral.Common.Responses;

namespace Funeral.Data.DataAccess
{
    public class BranchDataAccess : IBranchDataAccess
    {
        private readonly AppDbContext _context;

        public BranchDataAccess(AppDbContext context)
        {
          	_context = context;
        }

        public async Task<List<Branch>> GetAllBranchesAsync()
        {
            return await _context.Branch.ToListAsync();
        }

        public async Task<ResponseResult> CreateNewBranchAsync(Branch branch)
        {
            try
            {
                await _context.Branch.AddAsync(branch);
                await _context.SaveChangesAsync();

                return ResponseResult.Ok();
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail($"An error occurred while creating the branch: {ex.Message}");
            }
        }

        public async Task<ResponseResult> DeleteBranchAsync(int id)
        {
            var branch = await _context.Branch.FindAsync(id);

            if (branch == null)
            {
                return ResponseResult.Fail($"Branch with ID {id} was not found.");
            }

            _context.Branch.Remove(branch);
            await _context.SaveChangesAsync();

            return ResponseResult.Ok();
        }

        public async Task<Branch> GetBranchByIdAsync(int id)
        {
            var branch = await _context.Branch.FindAsync(id);

            if (branch == null)
            {
                throw new KeyNotFoundException($"Branch with ID {id} was not found.");
            }

            return branch;
        }

        public async Task<Branch> ChangeBranchNameAsync(string name)
        {
            var branch = await _context.Branch.FirstOrDefaultAsync(b => b.Name == name);

            if (branch == null)
            {
                throw new KeyNotFoundException($"Branch with name {name} was not found.");
            }

            branch.Name = name;
            await _context.SaveChangesAsync();

            return branch;
        }

        public async Task<Branch> ChangeBranchAddressAsync(string address)
        {
            var branch = await _context.Branch.FirstOrDefaultAsync(b => b.Address == address);

            if (branch == null)
            {
                throw new KeyNotFoundException($"Branch with address {address} was not found.");
            }

            branch.Address = address;
            await _context.SaveChangesAsync();

            return branch;
        }

        public async Task<Branch> ChangeBranchPhoneNumberAsync(string phoneNumber)
        {
            var branch = await _context.Branch.FirstOrDefaultAsync(b => b.PhoneNumber == phoneNumber);

            if (branch == null)
            {
                throw new KeyNotFoundException($"Branch with phone number {phoneNumber} was not found.");
            }

            branch.PhoneNumber = phoneNumber;
            await _context.SaveChangesAsync();

            return branch;
        }

        public async Task<Branch> ChangeBranchCompanyIcoAsync(string companyIco)
        {
            var branch = await _context.Branch.FirstOrDefaultAsync(b => b.CompanyIco == companyIco);

            if (branch == null)
            {
                throw new KeyNotFoundException($"Branch with company ICO {companyIco} was not found.");
            }

            branch.CompanyIco = companyIco;
            await _context.SaveChangesAsync();

            return branch;
        }

        public async Task<Branch> ChangeBranchCompanyDicAsync(string companyDic)
        {
            var branch = await _context.Branch.FirstOrDefaultAsync(b => b.CompanyDic == companyDic);

            if (branch == null)
            {
                throw new KeyNotFoundException($"Branch with company DIC {companyDic} was not found.");
            }

            branch.CompanyDic = companyDic;
            await _context.SaveChangesAsync();

            return branch;
        }
    }
}

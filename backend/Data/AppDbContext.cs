using Microsoft.EntityFrameworkCore;

using Funeral.Models;

namespace Funeral.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Company> Company { get; set; }
        public DbSet<Branch> Branch { get; set; }
        public DbSet<Warehouse> Warehouse { get; set; }
        public DbSet<FuneralArrange> Funeral { get; set; }
		public DbSet<Order> Order { get; set; }
		public DbSet<Invoice> Invoice { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
			// Relation 1:N between Company and Branch
			modelBuilder.Entity<Company>()
        		.HasMany(c => c.Branches)
        		.WithOne(b => b.Company)
        		.HasForeignKey(b => b.CompanyId);

			// Relation 1:1 between Company and Warehouse
			modelBuilder.Entity<Company>()
				.HasOne(c => c.Warehouse)
				.WithOne(w => w.Company)
				.HasForeignKey<Warehouse>(w => w.CompanyId);
			
			// Relation 1:N between Branch and FuneralArrange
			modelBuilder.Entity<Branch>()
				.HasMany(b => b.Funerals)
				.WithOne(f => f.Branch)
				.HasForeignKey(f => f.BranchId);

            // Relation 1:1 between FuneralArrange and Order
            modelBuilder.Entity<FuneralArrange>()
              	.HasOne(f => f.Order)
              	.WithOne(d => d.Funeral)
              	.HasForeignKey<Order>(d => d.FuneralId);

            // Relation 1:1 between FuneralArrange and Invoice
            modelBuilder.Entity<FuneralArrange>()
              	.HasOne(fo => fo.Invoice)
              	.WithOne(f => f.Funeral)
              	.HasForeignKey<Invoice>(fo => fo.FuneralId);
				

			// 🟡 Seed Company
    		modelBuilder.Entity<Company>().HasData(new Company
    		{
    		    Id = 1,
    		    Name = "Moje Firma s.r.o."
    		});

    		// 🟡 Seed Branch
    		modelBuilder.Entity<Branch>().HasData(new Branch
    		{
    		    Id = 1,
    		    Name = "Hlavní pobočka",
    		    Address = "Praha 1, Hlavní 123",
    		    PhoneNumber = "+420123456789",
    		    CompanyId = 1,
    		    CompanyIco = "12345678",
    		    CompanyDic = "CZ12345678"
    		});
        }
    }
}

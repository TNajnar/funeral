using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialCompany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Company",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Moje Firma s.r.o." });

            migrationBuilder.InsertData(
                table: "Branch",
                columns: new[] { "Id", "Address", "CompanyDic", "CompanyIco", "CompanyId", "Name", "PhoneNumber" },
                values: new object[] { 1, "Praha 1, Hlavní 123", "CZ12345678", "12345678", 1, "Hlavní pobočka", "+420123456789" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Branch",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Company",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}

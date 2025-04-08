using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class TryUpdateRelationsModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_FuneralOrganizer_FuneralId",
                table: "FuneralOrganizer");

            migrationBuilder.DropIndex(
                name: "IX_Deceased_FuneralId",
                table: "Deceased");

            migrationBuilder.DropColumn(
                name: "CeremonyLocation",
                table: "Funeral");

            migrationBuilder.DropColumn(
                name: "CeremonyVenue",
                table: "Funeral");

            migrationBuilder.DropColumn(
                name: "ConsentOpenCoffin",
                table: "Funeral");

            migrationBuilder.DropColumn(
                name: "DateOfNegotiation",
                table: "Funeral");

            migrationBuilder.DropColumn(
                name: "DeceasedId",
                table: "Funeral");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Funeral");

            migrationBuilder.DropColumn(
                name: "OrganizerId",
                table: "Funeral");

            migrationBuilder.DropColumn(
                name: "TimeCeremony",
                table: "Funeral");

            migrationBuilder.CreateTable(
                name: "Invoice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FuneralId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoice", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Invoice_Funeral_FuneralId",
                        column: x => x.FuneralId,
                        principalTable: "Funeral",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ConsentOpenCoffin = table.Column<bool>(type: "boolean", nullable: false),
                    DateOfNegotiation = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    TimeCeremony = table.Column<string>(type: "text", nullable: false),
                    CeremonyLocation = table.Column<string>(type: "text", nullable: true),
                    CeremonyVenue = table.Column<string>(type: "text", nullable: true),
                    OrganizerId = table.Column<int>(type: "integer", nullable: false),
                    DeceasedId = table.Column<int>(type: "integer", nullable: false),
                    FuneralId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Order_Deceased_DeceasedId",
                        column: x => x.DeceasedId,
                        principalTable: "Deceased",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Order_FuneralOrganizer_OrganizerId",
                        column: x => x.OrganizerId,
                        principalTable: "FuneralOrganizer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Order_Funeral_FuneralId",
                        column: x => x.FuneralId,
                        principalTable: "Funeral",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Warehouse",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CompanyId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Warehouse", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Warehouse_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WarehouseItem",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Comment = table.Column<string>(type: "text", nullable: true),
                    InStock = table.Column<int>(type: "integer", nullable: false),
                    IsFlagged = table.Column<bool>(type: "boolean", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Producer = table.Column<string>(type: "text", nullable: true),
                    ProductCategory = table.Column<string>(type: "text", nullable: false),
                    ProductCategoryId = table.Column<int>(type: "integer", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    WarehouseId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WarehouseItem", x => x.ProductId);
                    table.ForeignKey(
                        name: "FK_WarehouseItem_Warehouse_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouse",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductMovement",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Purchased = table.Column<int>(type: "integer", nullable: false),
                    Sold = table.Column<int>(type: "integer", nullable: false),
                    WarehouseItemId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductMovement", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductMovement_WarehouseItem_WarehouseItemId",
                        column: x => x.WarehouseItemId,
                        principalTable: "WarehouseItem",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FuneralOrganizer_FuneralId",
                table: "FuneralOrganizer",
                column: "FuneralId");

            migrationBuilder.CreateIndex(
                name: "IX_Deceased_FuneralId",
                table: "Deceased",
                column: "FuneralId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_FuneralId",
                table: "Invoice",
                column: "FuneralId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Order_DeceasedId",
                table: "Order",
                column: "DeceasedId");

            migrationBuilder.CreateIndex(
                name: "IX_Order_FuneralId",
                table: "Order",
                column: "FuneralId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Order_OrganizerId",
                table: "Order",
                column: "OrganizerId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductMovement_WarehouseItemId",
                table: "ProductMovement",
                column: "WarehouseItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Warehouse_CompanyId",
                table: "Warehouse",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_WarehouseItem_WarehouseId",
                table: "WarehouseItem",
                column: "WarehouseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Invoice");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "ProductMovement");

            migrationBuilder.DropTable(
                name: "WarehouseItem");

            migrationBuilder.DropTable(
                name: "Warehouse");

            migrationBuilder.DropIndex(
                name: "IX_FuneralOrganizer_FuneralId",
                table: "FuneralOrganizer");

            migrationBuilder.DropIndex(
                name: "IX_Deceased_FuneralId",
                table: "Deceased");

            migrationBuilder.AddColumn<string>(
                name: "CeremonyLocation",
                table: "Funeral",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CeremonyVenue",
                table: "Funeral",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ConsentOpenCoffin",
                table: "Funeral",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfNegotiation",
                table: "Funeral",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "DeceasedId",
                table: "Funeral",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Funeral",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "OrganizerId",
                table: "Funeral",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "TimeCeremony",
                table: "Funeral",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_FuneralOrganizer_FuneralId",
                table: "FuneralOrganizer",
                column: "FuneralId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Deceased_FuneralId",
                table: "Deceased",
                column: "FuneralId",
                unique: true);
        }
    }
}

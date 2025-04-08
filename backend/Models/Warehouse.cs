using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Funeral.Models
{
    public class Warehouse
    {
        [Key] public int Id { get; set; }
        public List<WarehouseItem> WarehouseItems { get; set; } = new List<WarehouseItem>();

        [ForeignKey("Company")] public int CompanyId { get; set; }
        public Company Company { get; set; } = null!;
    }

    public class WarehouseItem
    {
        public string? Comment { get; set; }
        public int InStock { get; set; }
        public bool IsFlagged { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Producer { get; set; }
        public string ProductCategory { get; set; } = string.Empty;
        public int ProductCategoryId { get; set; }
        [Key] public int ProductId { get; set; }
        public List<ProductMovement>? ProductMovements { get; set; } = new List<ProductMovement>();
        public string Type { get; set; } = string.Empty;

        [ForeignKey("Warehouse")] public int WarehouseId { get; set; }
        public Warehouse Warehouse { get; set; } = null!;
    };

    public class ProductMovement
    {
        [Key] public int Id { get; set; }
        public int Purchased { get; set; }
        public int Sold { get; set; }

        [ForeignKey("Warehouse")] public int WarehouseItemId { get; set; }
        public WarehouseItem WarehouseItem { get; set; } = null!;
    }
}

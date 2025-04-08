namespace Funeral.Dto
{
    public class WarehouseDto
    {
        public int Id { get; set; }
        public List<WarehouseItemDto> WarehouseItems { get; set; } = new List<WarehouseItemDto>();
    }

    public class WarehouseItemDto
    {
        public string? Comment { get; set; }
        public int InStock { get; set; }
        public bool IsFlagged { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Producer { get; set; }
        public string ProductCategory { get; set; } = string.Empty;
        public int ProductCategoryId { get; set; }
        public int ProductId { get; set; }
        public List<ProductMovementDto>? ProductMovements { get; set; } = new List<ProductMovementDto>();
        public string Type { get; set; } = string.Empty;
    };

    public class ProductMovementDto
    {
        public int Id { get; set; }
        public int Purchased { get; set; }
        public int Sold { get; set; }
    }
}

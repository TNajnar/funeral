using System.ComponentModel.DataAnnotations;

namespace Funeral.Models
{
    public class Company
    {
        [Key] public int Id { get; set; }
        public List<Branch> Branches { get; set; } = new List<Branch>();
        public Warehouse Warehouse { get; set; } = null!;
        public string Name { get; set; } = string.Empty;
    }
}

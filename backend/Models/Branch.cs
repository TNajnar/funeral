using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Funeral.Models
{
    public class Branch
    {
        [Key] public int Id { get; set; }
        public List<FuneralArrange> Funerals { get; set; } = new List<FuneralArrange>();
        public string Address { get; set; } = string.Empty;
        public string CompanyDic { get; set; } = string.Empty;
        public string CompanyIco { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;

        [ForeignKey("Company")] public int CompanyId { get; set; }
        public Company Company { get; set; } = null!;
    }
}

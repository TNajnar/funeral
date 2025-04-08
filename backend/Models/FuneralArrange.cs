using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Funeral.Models
{
    public class FuneralArrange
    {
        [Key] public int Id { get; set; }

        public Order Order { get; set; } = null!;
        public Invoice Invoice { get; set; } = null!;

        [ForeignKey("Branch")] public int BranchId { get; set; }
        public Branch Branch { get; set; } = null!;
    }

    public class Order
    {
        public bool ConsentOpenCoffin { get; set; }
        public DateTime DateOfNegotiation { get; set; }
        [Key] public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string TimeCeremony { get; set; } = string.Empty;
        public string? CeremonyLocation { get; set; }
        public string? CeremonyVenue { get; set; }      

        [ForeignKey("FuneralOrganizer")] public int OrganizerId { get; set; }
        public FuneralOrganizer Organizer { get; set; } = null!;

        [ForeignKey("Deceased")] public int DeceasedId { get; set; }
        public Deceased Deceased { get; set; } = null!;

        [ForeignKey("FuneralArrange")] public int FuneralId { get; set; }
        public FuneralArrange Funeral { get; set; } = null!;

        // TODO optional services
    }

    public class Invoice
    {
        [Key] public int Id { get; set; }

        [ForeignKey("FuneralArrange")] public int FuneralId { get; set; }
        public FuneralArrange Funeral { get; set; } = null!;
        
        // TODO
    }

    public class FuneralOrganizer
    {
        public DateTime DateOfBirth { get; set; }
        [Key] public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Relationship { get; set; } = string.Empty;
        public string Residence { get; set; } = string.Empty;

        [ForeignKey("FuneralArrange")] public int FuneralId { get; set; }
        public FuneralArrange Funeral { get; set; } = null!;
    }

    public class Deceased
    {
        public bool Autopsy { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime DateOfDeath { get; set; }
        [Key] public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string PlaceOfDeath { get; set; } = string.Empty;
        public string Profession { get; set; } = string.Empty;
        public string ProvidedDocuments { get; set; } = string.Empty;
        public string Residence { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;

        [ForeignKey("FuneralArrange")] public int FuneralId { get; set; }
        public FuneralArrange Funeral { get; set; } = null!;
    }
}

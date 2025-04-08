namespace Funeral.Dto
{
    public class FuneralArrangeDto
    {
        public int Id { get; set; }

        public OrderDto Order { get; set; } = null!;
        public InvoiceDto Invoice { get; set; } = null!;
    }

    public class OrderDto
    {
        public bool ConsentOpenCoffin { get; set; }
        public DateTime DateOfNegotiation { get; set; }
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string TimeCeremony { get; set; } = string.Empty;
        public string? CeremonyLocation { get; set; }
        public string? CeremonyVenue { get; set; }

        public FuneralOrganizerDto Organizer { get; set; } = null!;  
        public DeceasedDto Deceased { get; set; } = null!;

        // TODO optional services
    }

    public class InvoiceDto
    {
        public int Id { get; set; }
        
        // TODO
    }

    public class FuneralOrganizerDto
    {
        public DateTime DateOfBirth { get; set; }
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Relationship { get; set; } = string.Empty;
        public string Residence { get; set; } = string.Empty;
    }

    public class DeceasedDto
    {
        public bool Autopsy { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime DateOfDeath { get; set; }
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string PlaceOfDeath { get; set; } = string.Empty;
        public string Profession { get; set; } = string.Empty;
        public string ProvidedDocuments { get; set; } = string.Empty;
        public string Residence { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}

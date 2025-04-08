namespace Funeral.Dto
{
    public class CompanyDto
    {
        public int Id { get; set; }
        public List<BranchDto> Branches { get; set; } = new List<BranchDto>();
        public string Name { get; set; } = string.Empty;
    }
}

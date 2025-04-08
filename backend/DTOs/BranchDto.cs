namespace Funeral.Dto
{
    public class BranchDto
    {
        public int Id { get; set; }
        public List<FuneralArrangeDto> Funerals { get; set; } = new List<FuneralArrangeDto>();
        public string Address { get; set; } = string.Empty;
        public string CompanyDic { get; set; } = string.Empty;
        public string CompanyIco { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
    }
}

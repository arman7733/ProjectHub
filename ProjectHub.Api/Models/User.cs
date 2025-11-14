namespace ProjectHub.Api.Models
{
    public class User : BaseModel
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public Guid RoleId { get; set; } 
    }
}

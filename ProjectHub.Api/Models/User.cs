namespace ProjectHub.Api.Models
{
    public class User : BaseModel
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public ICollection<Role> Roles { get; set; }
        public string PasswordHash { get; set; } 

    }
}

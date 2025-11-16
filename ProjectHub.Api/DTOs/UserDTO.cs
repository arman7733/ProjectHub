namespace ProjectHub.Api.DTOs
{
    public class UserDTO : BaseModelDTO
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public ICollection<RoleDTO> Roles { get; set; } 

    }
}

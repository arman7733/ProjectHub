namespace ProjectHub.Api.DTOs
{
    public class SignUpDTO
    {
        public string Email { get; set; }       
        public string Password { get; set; }    
        public string Name { get; set; }       
        public Guid RoleId { get; set; }       
    }
}

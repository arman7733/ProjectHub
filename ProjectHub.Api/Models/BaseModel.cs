namespace ProjectHub.Api.Models
{
    public class BaseModel
    {
        public Guid Id { get; set; }
        public Guid UserCreator { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid? UserUpdator { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}

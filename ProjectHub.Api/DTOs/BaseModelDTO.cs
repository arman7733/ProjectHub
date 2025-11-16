namespace ProjectHub.Api.DTOs
{
    public class BaseModelDTO
    {
        public Guid Id { get; set; }
        public Guid UserCreator { get; set; }
        public string UserCreatorName { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid UserUpdator { get; set; }
        public string UserUpdatorName { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}

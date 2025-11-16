namespace ProjectHub.Api.DTOs
{
    public class ProjectDTO : BaseModelDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid ManagerId { get; set; }
        public Guid StatusId { get; set; } 
        public int Progress { get; set; } 
        public DateTime Deadline { get; set; }
        public ICollection<TaskDTO> Tasks { get; set; }

    }
}

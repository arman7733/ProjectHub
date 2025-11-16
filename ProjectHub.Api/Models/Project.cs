namespace ProjectHub.Api.Models
{
    public class Project : BaseModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid ManagerId { get; set; }
        public Guid StatusId { get; set; } 
        public int Progress { get; set; } 
        public DateTime Deadline { get; set; }
        public ICollection<Task> Tasks { get; set; }

    }
}

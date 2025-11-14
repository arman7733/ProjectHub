namespace ProjectHub.Api.Models
{
    public class Task : BaseModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid ProjectId { get; set; }
        public Guid? AssigneeId { get; set; }
        public Guid StatusId { get; set; }
        public Guid PriorityId { get; set; }
    }
}

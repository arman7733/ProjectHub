using ProjectHub.Api.Data.BaseRepository;
using ProjectHub.Api.Models;

namespace ProjectHub.Api.Data.Interfaces
{
    
    public interface ITaskRepository : IRepository<BaseModel>
    {
        Task<IEnumerable<Models.Task>> GetAllTasks();
        Task<Models.Task> CreateTask(Models.Task task);
        Task<Models.Task> EditTask(Models.Task task);
        Task<bool> DeleteTask(long id);
    }
}

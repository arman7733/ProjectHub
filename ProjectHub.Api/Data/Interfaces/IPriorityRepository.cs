using ProjectHub.Api.Data.BaseRepository;
using ProjectHub.Api.Models;

namespace ProjectHub.Api.Data.Interfaces
{
    public interface IPriorityRepository : IRepository<BaseModel>
    {
        Task<IEnumerable<Priority>> GetAllPriorities();
        Task<Priority> CreatePriority(Priority priority);
        Task<Priority> EditPriority(Priority priority);
        Task<bool> DeletePriority(long id);
    }
}

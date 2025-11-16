using ProjectHub.Api.Data.BaseRepository;
using ProjectHub.Api.Models;

namespace ProjectHub.Api.Data.Interfaces
{
    public interface IStatusRepository : IRepository<BaseModel>
    {
        Task<IEnumerable<Status>> GetAllStatuses();
        Task<Status> CreateStatus(Status status);
        Task<Status> EditStatus(Status status);
        Task<bool> DeleteStatus(long id);
    }
}

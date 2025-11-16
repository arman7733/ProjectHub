using ProjectHub.Api.Data.BaseRepository;
using ProjectHub.Api.Models;

namespace ProjectHub.Api.Data.Interfaces
{
    public interface IProjectRepository : IRepository<BaseModel>
    {
        Task<IEnumerable<Project>> GetAllProjects();
        Task<Project> CreateProject(Project project);
        Task<Project> EditProject(Project project);
        Task<bool> DeleteProject(long id);
    }
}

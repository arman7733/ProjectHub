using ProjectHub.Api.Data.BaseRepository;
using ProjectHub.Api.Models;

namespace ProjectHub.Api.Data.Interfaces
{
    public interface IRoleRepository : IRepository<BaseModel>
    {
        Task<IEnumerable<Role>> GetAllRoles();
        Task<Role> CreateRole(Role role);
        Task<Role> EditRole(Role role);
        Task<bool> DeleteRole(long id);
    }
}

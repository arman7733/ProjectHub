using Microsoft.EntityFrameworkCore;
using ProjectHub.Api.Data.BaseRepository;
using ProjectHub.Api.Data.Context;
using ProjectHub.Api.Models;

namespace ProjectHub.Api.Data.Interfaces
{
    public class RoleRepository : Repository<BaseModel>, IRoleRepository
    {
        public RoleRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public async Task<Role> CreateRole(Role role)
        {
            await Insert(role);
            await Commit();
            return role;
        }

        public async Task<bool> DeleteRole(long id)
        {
        if (await DeleteById<Role>(id))
            {
                await Commit();
                return true;
            }
            return false;
        }

        public async Task<Role> EditRole(Role role)
        {
            var query = await Set<Role>();

            var newRole = query.SingleOrDefault(u => u.Id == role.Id);
            role.UpdatedAt = DateTime.Now;

            role.CreatedAt = newRole.CreatedAt;
            role.UserCreator = newRole.UserCreator;
            newRole = role;
            await Update(newRole);
            await Commit();
            return newRole;
        }

        public async Task<IEnumerable<Role>> GetAllRoles()
        {
            var query = await Set<Role>();

            var roles = await query
                                .AsNoTracking()
                                .OrderByDescending(u => u.CreatedAt)
                                .ToListAsync();

            return roles;
        }
    }
}

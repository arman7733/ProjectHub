using Microsoft.EntityFrameworkCore;
using ProjectHub.Api.Data.BaseRepository;
using ProjectHub.Api.Data.Context;
using ProjectHub.Api.Models;

namespace ProjectHub.Api.Data.Interfaces
{
    public class PriorityRepository : Repository<BaseModel>, IPriorityRepository
    {
        public PriorityRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            
        }

        public async Task<Priority> CreatePriority(Priority priority)
        {
            await Insert(priority);
            await Commit();
            return priority;
        }

        public async Task<bool> DeletePriority(long id)
        {
            if (await DeleteById<Priority>(id))
            {
                await Commit();
                return true;
            }
            return false;
        }

        public async Task<Priority> EditPriority(Priority priority)
        {
            var query = await Set<Priority>();

            var newPriority = query.SingleOrDefault(u => u.Id == priority.Id);
            priority.UpdatedAt = DateTime.Now;

            priority.CreatedAt = newPriority.CreatedAt;
            priority.UserCreator = newPriority.UserCreator;
            newPriority = priority;
            await Update(newPriority);
            await Commit();
            return newPriority;
        }

        public async Task<IEnumerable<Priority>> GetAllPriorities()
        {
            var query = await Set<Priority>(); 

            var priorities = await query
                                .AsNoTracking()
                                .OrderByDescending(u => u.CreatedAt)
                                .ToListAsync();  

            return priorities;
        }
    }
}

using Microsoft.EntityFrameworkCore;
using ProjectHub.Api.Data.BaseRepository;
using ProjectHub.Api.Data.Context;
using ProjectHub.Api.Models;

namespace ProjectHub.Api.Data.Interfaces
{
    public class StatusRepository : Repository<BaseModel>, IStatusRepository
    {
        public StatusRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public async Task<Status> CreateStatus(Status status)
        {
            await Insert(status);
            await Commit();
            return status;
        }

        public async Task<bool> DeleteStatus(long id)
        {
            if (await DeleteById<Status>(id))
            {
                await Commit();
                return true;
            }
            return false;
        }

        public async Task<Status> EditStatus(Status status)
        {
            var query = await Set<Status>();

            var newStatus = query.SingleOrDefault(u => u.Id == status.Id);
            status.UpdatedAt = DateTime.Now;

            status.CreatedAt = newStatus.CreatedAt;
            status.UserCreator = newStatus.UserCreator;
            newStatus = status;
            await Update(newStatus);
            await Commit();
            return newStatus;
        }

        public async Task<IEnumerable<Status>> GetAllStatuses()
        {
            var query = await Set<Status>();

            var statuss = await query
                                .AsNoTracking()
                                .OrderByDescending(u => u.CreatedAt)
                                .ToListAsync();

            return statuss;
        }
    }
}

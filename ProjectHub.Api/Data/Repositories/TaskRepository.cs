using Microsoft.EntityFrameworkCore;
using ProjectHub.Api.Data.BaseRepository;
using ProjectHub.Api.Data.Context;
using ProjectHub.Api.Models;

namespace ProjectHub.Api.Data.Interfaces
{
    public class TaskRepository : Repository<BaseModel>, ITaskRepository
    {
        public TaskRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public async Task<Models.Task> CreateTask(Models.Task task)
        {
            await Insert(task);
            await Commit();
            return task;
        }

        public async Task<bool> DeleteTask(long id)
        {
            if (await DeleteById<Models.Task>(id))
            {
                await Commit();
                return true;
            }
            return false;
        }

        public async Task<Models.Task> EditTask(Models.Task task)
        {
            var query = await Set<Models.Task>();

            var newTask = query.SingleOrDefault(u => u.Id == task.Id);
            task.UpdatedAt = DateTime.Now;

            task.CreatedAt = newTask.CreatedAt;
            task.UserCreator = newTask.UserCreator;
            newTask = task;
            await Update(newTask);
            await Commit();
            return newTask;
        }

        public async Task<IEnumerable<Models.Task>> GetAllTasks()
        {
            var query = await Set<Models.Task>();

            var tasks = await query
                                .AsNoTracking()
                                .OrderByDescending(u => u.CreatedAt)
                                .ToListAsync();

            return tasks;
        }
    }
}

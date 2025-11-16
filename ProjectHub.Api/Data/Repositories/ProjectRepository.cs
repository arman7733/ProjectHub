using Microsoft.EntityFrameworkCore;
using ProjectHub.Api.Data.BaseRepository;
using ProjectHub.Api.Data.Context;
using ProjectHub.Api.Models;

namespace ProjectHub.Api.Data.Interfaces
{
    public class ProjectRepository : Repository<BaseModel> , IProjectRepository
    {
        public ProjectRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public async Task<Project> CreateProject(Project project)
        {
            await Insert(project);
            await Commit();
            return project;
        }

        public async Task<bool> DeleteProject(long id)
        {
            if (await DeleteById<Project>(id))
            {
                await Commit();
                return true;
            }
            return false;
        }

        public async Task<Project> EditProject(Project project)
        {
            var query = await Set<Project>();

            var newProject = query.SingleOrDefault(u => u.Id == project.Id);
            project.UpdatedAt = DateTime.Now;

            project.CreatedAt = newProject.CreatedAt;
            project.UserCreator = newProject.UserCreator;
            newProject = project;
            await Update(newProject);
            await Commit();
            return newProject;
        }

        public async Task<IEnumerable<Project>> GetAllProjects()
        {
            var query = await Set<Project>();

            var projects = await query
                                .Include(u => u.Tasks)
                                .AsNoTracking()
                                .OrderByDescending(u => u.CreatedAt)
                                .ToListAsync();

            return projects;
        }
    }
}

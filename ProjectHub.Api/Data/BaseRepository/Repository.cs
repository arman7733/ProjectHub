using Microsoft.EntityFrameworkCore;
using ProjectHub.Api.Data.Context;
using ProjectHub.Api.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Infrastructure;
using TaskAsync = System.Threading.Tasks;

namespace ProjectHub.Api.Data.BaseRepository
{
    public class Repository<TModel> : IRepository<TModel> where TModel : BaseModel
    {
        private readonly DbContext _dbContext;
        //protected readonly IMapper _mapper;
        //public Repository(DbContext dbContext, IMapper mapper)
        public Repository(DbContext dbContext)
        {
            _dbContext = dbContext;
            // _mapper = mapper;
        }

        public async TaskAsync.Task Insert<TModel>(TModel entity) where TModel : BaseModel
        {
            await _dbContext.Set<TModel>().AddAsync(entity);
        }

        public async Task<IQueryable<TModel>> Set<TModel>() where TModel : BaseModel
        {
            return await TaskAsync.Task.FromResult(_dbContext.Set<TModel>());
        }

        public async Task<IQueryable<TModel>> GetAll<TModel>() where TModel : BaseModel
        {
            return await TaskAsync.Task.FromResult(_dbContext.Set<TModel>().AsNoTracking());
        }

        public async Task<TModel> GetById<TModel>(long id) where TModel : BaseModel
        {
            var model = await _dbContext.Set<TModel>().FindAsync(id);
            if (model == null)
            {
                throw new Exception($"No {typeof(TModel).Name} found with id {id}");
            }
            return model;
        }

        public async Task<bool> Delete<TModel>(TModel entity) where TModel : BaseModel
        {
            try
            {
                _dbContext.Set<TModel>().Remove(entity);
                await Commit();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async TaskAsync.Task Commit()
        {
            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                var logger = _dbContext.GetService<ILogger<ApplicationDbContext>>();
                logger.LogError(ex, "An error occurred while saving changes.");

                if (ex.InnerException != null)
                {
                    logger.LogError(ex.InnerException, "Inner exception details.");
                }

                throw;
            }
        }

        public async TaskAsync.Task Update<TModel>(TModel entity) where TModel : BaseModel
        {
            var existingEntity = _dbContext.Set<TModel>().Local.FirstOrDefault(e => e.Id == entity.Id);
            if (existingEntity != null)
            {
                _dbContext.Entry(existingEntity).State = EntityState.Detached;
            }

            _dbContext.Set<TModel>().Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;

            await Commit();
        }

        public async Task<bool> DeleteById<TModel>(long id) where TModel : BaseModel
        {
            var entity = await GetById<TModel>(id);
            try
            {
                await Delete(entity);
                await Commit();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
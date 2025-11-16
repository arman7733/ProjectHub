using ProjectHub.Api.Models;
using TaskAsync = System.Threading.Tasks;
namespace ProjectHub.Api.Data.BaseRepository
{
    public interface IRepository<TModel> where TModel : BaseModel
    {
        Task<IQueryable<TModel>> GetAll<TModel>() where TModel : BaseModel;
        Task<TModel> GetById<TModel>(long id) where TModel : BaseModel;
        Task<bool> DeleteById<TModel>(long id) where TModel : BaseModel;
        Task<bool> Delete<TModel>(TModel entity) where TModel : BaseModel;
        Task<IQueryable<TModel>> Set<TModel>() where TModel : BaseModel;
        TaskAsync.Task Insert<TModel>(TModel entity) where TModel : BaseModel;
        TaskAsync.Task Update<TModel>(TModel entity) where TModel : BaseModel;
        TaskAsync.Task Commit();
    }
}



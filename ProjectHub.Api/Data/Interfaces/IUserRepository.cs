using ProjectHub.Api.Data.BaseRepository;
using ProjectHub.Api.Models;

namespace ProjectHub.Api.Data.Interfaces
{
    public interface IUserRepository : IRepository<BaseModel>
    {
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUserByEmail(string email);
        Task<bool> IsExistUser(string email);

        Task<User> CreateUser(User user);
        Task<User> EditUser(User user);
        Task<bool> DeleteUser(long id);
    }
}

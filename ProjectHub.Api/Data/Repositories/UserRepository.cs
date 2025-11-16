using Microsoft.EntityFrameworkCore;
using ProjectHub.Api.Data.BaseRepository;
using ProjectHub.Api.Data.Context;
using ProjectHub.Api.Models;

namespace ProjectHub.Api.Data.Interfaces
{
    public class UserRepository : Repository<BaseModel>, IUserRepository
    {
        public UserRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public async Task<bool> IsExistUser(string email)
        {
            try
            {
                var user = await (await Set<User>()).SingleOrDefaultAsync(x => x.Email == email);

                if (user == null)
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("خطا در بازیابی کاربر: " + ex.Message, ex);
            }
        }



    public async Task<User> GetUserByEmail(string email)
    {
        try
        {
            var usersQuery = await Set<User>();
            var user = await usersQuery
                .Include(u => u.Roles)
                .SingleOrDefaultAsync(x => x.Email == email);

            if (user == null)
            {
                throw new KeyNotFoundException("کاربری با این ایمیل یافت نشد.");
            }
            return user;
        }
        catch (Exception ex)
        {
            throw new Exception("خطا در بازیابی کاربر: " + ex.Message, ex);
        }
    }





    public async Task<User> CreateUser(User user)
        {
            await Insert(user);
            await Commit();
            return user;
        }

        public async Task<bool> DeleteUser(long id)
        {
            if (await DeleteById<User>(id))
            {
                await Commit();
                return true;
            }
            return false;
        }

        public async Task<User> EditUser(User user)
        {
            var query = await Set<User>();

            var newUser = query.SingleOrDefault(u => u.Id == user.Id);
            user.UpdatedAt = DateTime.Now;

            user.CreatedAt = newUser.CreatedAt;
            user.UserCreator = newUser.UserCreator;
            newUser = user;
            await Update(newUser);
            await Commit();
            return newUser;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var query = await Set<User>();

            var users = await query
                                .Include(u => u.Roles)
                                .AsNoTracking()
                                .OrderByDescending(u => u.CreatedAt)
                                .ToListAsync();
            return users;

        }
    }
}

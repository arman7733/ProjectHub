using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using ProjectHub.Api.Data.Interfaces;
using ProjectHub.Api.DTOs;
using ProjectHub.Api.Models;
using ProjectHub.Api.Helpers;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ProjectHub.Api.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly JwtTokenHelper _jwtTokenHelper;  // اضافه کردن فیلد برای شیء JwtTokenHelper

        public UserService(IUserRepository userRepository, IConfiguration configuration, JwtTokenHelper jwtTokenHelper)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _jwtTokenHelper = jwtTokenHelper;  // تزریق شیء JwtTokenHelper
        }

        public async Task<User> CreateUser(User user)
        {
            return await _userRepository.CreateUser(user);
        }

        public async Task<bool> DeleteUser(long id)
        {
            return await _userRepository.DeleteUser(id);
        }

        public async Task<User> EditUser(User user)
        {
            return await _userRepository.EditUser(user);
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _userRepository.GetAllUsers();
        }


        public async Task<User> SignUp(SignUpDTO signUpDto)
        {
            // بررسی اینکه آیا کاربری با ایمیل مشابه موجود است یا خیر
            var existingUser = await _userRepository.IsExistUser(signUpDto.Email);
            if (existingUser)
            {
                throw new Exception("User with this email already exists.");
            }

            // هش کردن رمز عبور
            var hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: signUpDto.Password,
                salt: Encoding.UTF8.GetBytes("random_salt_string"), // Salt معمولاً از محیط یا پایگاه داده می‌آید
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            // ساخت کاربر جدید
            var newUser = new User
            {
                Email = signUpDto.Email,
                Name = signUpDto.Name,
                PasswordHash = hashedPassword,
                //RoleId = signUpDto.RoleId,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            await _userRepository.CreateUser(newUser);
            return newUser;
        }

        public async Task<string> Login(LoginDTO loginDto)
        {

            // بررسی صحت کاربر
            var user = await _userRepository.GetUserByEmail(loginDto.Email);

            if (user == null)
            {
                throw new Exception("Invalid credentials.");
            }

            // هش کردن رمز عبور وارد شده توسط کاربر
            var hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: loginDto.Password,
                salt: Encoding.UTF8.GetBytes("random_salt_string"),  // Salt باید همان Salt استفاده شده در ثبت‌نام باشد
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            if (hashedPassword != user.PasswordHash)
            {
                throw new Exception("Invalid credentials.");
            }

            // ایجاد JWT Token
            var token = _jwtTokenHelper.GenerateJwtToken(user, _configuration);
            return token;
        }

    }
}

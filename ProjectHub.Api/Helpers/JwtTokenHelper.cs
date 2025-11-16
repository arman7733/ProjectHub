using Microsoft.IdentityModel.Tokens;
using ProjectHub.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace ProjectHub.Api.Helpers
{
    public class JwtTokenHelper
    {
        public string GenerateJwtToken(User user, IConfiguration configuration)
        {
            // ایجاد لیستی از Claims (اطلاعات کاربر برای توکن)
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),  // ایمیل کاربر
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // شناسه یکتای توکن
            };

            // اگر کاربر چندین نقش دارد، تمام نقش‌ها را در Claims قرار می‌دهیم
            foreach (var role in user.Roles)  // اگر نقش‌ها از نوع ICollection<Role> است
            {
                claims.Add(new Claim("role", role.Name));  // اضافه کردن هر نقش به Claims
            }

            // استفاده از یک کلید برای امضای توکن
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // ساخت توکن JWT
            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],  // صادرکننده توکن
                audience: configuration["Jwt:Audience"],  // مخاطب توکن
                claims: claims,
                expires: DateTime.Now.AddHours(1),  // مدت اعتبار توکن
                signingCredentials: creds
            );

            // بازگرداندن توکن به صورت string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

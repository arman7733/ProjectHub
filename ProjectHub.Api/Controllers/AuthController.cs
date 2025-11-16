using Microsoft.AspNetCore.Mvc;
using ProjectHub.Api.Services;
using ProjectHub.Api.Models;
using ProjectHub.Api.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace ProjectHub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;

        public AuthController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            var createdUser = await _userService.CreateUser(user);
            return CreatedAtAction(nameof(GetAllUsers), new { id = createdUser.Id }, createdUser);
        }

        [HttpPut]
        public async Task<IActionResult> EditUser([FromBody] User user)
        {
            var updatedUser = await _userService.EditUser(user);
            return Ok(updatedUser);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            var isDeleted = await _userService.DeleteUser(id);
            if (isDeleted)
            {
                return NoContent();
            }
            return NotFound();
        }


        [Authorize]
        [HttpGet("profile")]
        public IActionResult GetProfile()
        {
            var userName = User.Identity.Name; // اطلاعات کاربر از توکن JWT گرفته می‌شود
            return Ok(new { UserName = userName });
        }


        [HttpPost("login")]

        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            try
            {
                var token = await _userService.Login(loginDto);
                return Ok(new { Token = token }); // ارسال توکن JWT به کلاینت
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message); // اگر اعتبارسنجی ناموفق باشد
            }
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] SignUpDTO signUpDto)
        {
            try
            {
                var user = await _userService.SignUp(signUpDto);
                return CreatedAtAction(nameof(GetProfile), new { id = user.Id }, user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}

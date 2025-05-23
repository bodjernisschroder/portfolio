using AuthAndUserAPI.Models;
using AuthAndUserAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AuthAndUserAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // API endpoint that calls the RegisterAsync method, 
        // and returns the result of the response
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerModel)
        {
            var result = await _authService.RegisterAsync(registerModel);
            return result ? Ok("User created") : BadRequest("Registration failed");
        }

        // API endpoint that calls the LoginAsync method, 
        // and returns the result of the response
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginModel)
        {
            if (!ModelState.IsValid) return BadRequest();

            var token = await _authService.LoginAsync(loginModel);
            return token != null
                ? Ok(new AuthResponseDto { Token = token })
                : Unauthorized("Invalid credentials");
        }
    }
}
using AuthAndUserAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthAndUserAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;

        public AuthService(UserManager<ApplicationUser> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
        }

        // Method that contains the register logic used for user signup, 
        // maps the RegisterDTO to custom ApplicationUser, 
        // and adds new users with the default role as "User"
        public async Task<bool> RegisterAsync(RegisterDto registerModel)
        {
            var user = new ApplicationUser
            {
                UserName = registerModel.Email,
                Email = registerModel.Email,
                FullName = registerModel.FullName
            };

            var result = await _userManager.CreateAsync(user, registerModel.Password);
            if (!result.Succeeded) return false;

            await _userManager.AddToRoleAsync(user, "User");
            return true;
        }

        // Method that contains the login logic, 
        // looks up the user by email in the database, 
        // returns null if no user or password is found, 
        // retrieves the roles for the JWT, 
        // and calls GenerateJWTToken to generate the token
        public async Task<string?> LoginAsync(LoginDto loginModel)
        {
            var user = await _userManager.FindByEmailAsync(loginModel.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginModel.Password))
                return null;

            var roles = await _userManager.GetRolesAsync(user);
            return GenerateJwtToken(user, roles);
        }

        // Method that holds the logic for generating JWT, 
        // builds a list of the claims, 
        // adds the roles to the respective users, 
        // uses the secret key from appsettings.json and signs it using the HMAC SHA256 algorithm, 
        // generates the JWT and serializes it 
        private string GenerateJwtToken(ApplicationUser user, IList<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName!),
                new Claim("FullName", user.FullName ?? "")
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: signingCred);

            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenString;
        }
    }
}
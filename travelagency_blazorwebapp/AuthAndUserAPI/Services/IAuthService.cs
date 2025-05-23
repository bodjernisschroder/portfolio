using AuthAndUserAPI.Models;

namespace AuthAndUserAPI.Services
{
    // Interface that defines the contract for authentication logic
    public interface IAuthService
    {
        Task<bool> RegisterAsync(RegisterDto model);
        Task<string?> LoginAsync(LoginDto model);
    }
}

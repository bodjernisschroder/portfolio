namespace AuthAndUserAPI.Models
{
    // AuthResponse Data Transfer Object used to return the JWT token from the authentication response
    public class AuthResponseDto
    {
        public string Token { get; set; }
    }
}

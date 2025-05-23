using System.ComponentModel.DataAnnotations;

namespace AuthAndUserAPI.Models
{

    // Login Data Transfer Object (DTO) 
    public class LoginDto
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }

}

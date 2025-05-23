using System.ComponentModel.DataAnnotations;

namespace Gotorz.Models
{
    // Model class that represents login form input
    public class LoginModel
    {
            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            public string Password { get; set; }  
    }
}

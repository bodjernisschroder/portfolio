using Microsoft.AspNetCore.Identity;

namespace AuthAndUserAPI.Models
{
    // Class that extends IdentityUser with the custom FullName property
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
    }
}
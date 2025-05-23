using System.ComponentModel.DataAnnotations;

namespace Gotorz.Models
{   
    // Model class that represents signup form input,
    // and includes custom validation for email, password requirements, and confirmation match
    public class SignupModel : IValidatableObject
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        [Compare(nameof(Password), ErrorMessage = "Passwords do not match")]
        public string ConfirmPassword { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (!Password.Any(char.IsDigit))
            {
                yield return new ValidationResult("Password must contain at least one number.", new[] { nameof(Password) });
            }

            if (!Password.Any(ch => !char.IsLetterOrDigit(ch)))
            {
                yield return new ValidationResult("Password must contain at least one special character.", new[] { nameof(Password) });
            }
        }
    }
}

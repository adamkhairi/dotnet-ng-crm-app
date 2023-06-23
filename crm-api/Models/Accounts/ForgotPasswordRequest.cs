namespace crm_api.Models.Accounts;

using System.ComponentModel.DataAnnotations;

public class ForgotPasswordRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
}
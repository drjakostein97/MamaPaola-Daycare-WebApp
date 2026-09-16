using System.ComponentModel.DataAnnotations;

namespace MamaPaola.Api.Dtos;

public class LoginRequest
{
    [Required, StringLength(100)]
    public string Username { get; set; } = "";

    [Required, StringLength(200)]
    public string Password { get; set; } = "";
}

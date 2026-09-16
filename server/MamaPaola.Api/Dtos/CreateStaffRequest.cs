using System.ComponentModel.DataAnnotations;

namespace MamaPaola.Api.Dtos;

public class CreateStaffRequest
{
    [Required, StringLength(100, MinimumLength = 3)]
    public string Username { get; set; } = "";

    [Required, StringLength(200)]
    public string DisplayName { get; set; } = "";

    [Required, StringLength(200, MinimumLength = 8)]
    public string Password { get; set; } = "";
}

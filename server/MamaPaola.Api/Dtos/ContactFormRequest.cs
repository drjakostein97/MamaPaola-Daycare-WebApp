using System.ComponentModel.DataAnnotations;

namespace MamaPaola.Api.Dtos;

public class ContactFormRequest
{
    [Required, StringLength(200)]
    public string Name { get; set; } = "";

    [Required, EmailAddress, StringLength(320)]
    public string Email { get; set; } = "";

    [Required, Phone, StringLength(50)]
    public string Phone { get; set; } = "";

    [Required, StringLength(4000)]
    public string Message { get; set; } = "";
}

using System.ComponentModel.DataAnnotations;

namespace MamaPaola.Api.Dtos;

public class ChildRequest
{
    [Required, StringLength(50)]
    public string Age { get; set; } = "";
}

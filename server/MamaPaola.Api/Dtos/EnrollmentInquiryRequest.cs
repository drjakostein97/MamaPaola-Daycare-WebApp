using System.ComponentModel.DataAnnotations;

namespace MamaPaola.Api.Dtos;

public class EnrollmentInquiryRequest
{
    [Required, StringLength(200)]
    public string ParentName { get; set; } = "";

    [Required, EmailAddress, StringLength(320)]
    public string Email { get; set; } = "";

    [Required, Phone, StringLength(50)]
    public string Phone { get; set; } = "";

    [Required, StringLength(200)]
    public string ChildName { get; set; } = "";

    [Required, StringLength(50)]
    public string ChildAge { get; set; } = "";

    [Required, StringLength(50)]
    public string PreferredStartDate { get; set; } = "";

    [StringLength(4000)]
    public string? Notes { get; set; }
}

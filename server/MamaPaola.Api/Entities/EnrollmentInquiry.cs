namespace MamaPaola.Api.Entities;

public class EnrollmentInquiry
{
    public int Id { get; set; }
    public required string ParentName { get; set; }
    public required string Email { get; set; }
    public required string Phone { get; set; }
    public required string PreferredStartDate { get; set; }
    public string? Notes { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public List<EnrollmentChild> Children { get; set; } = [];
}

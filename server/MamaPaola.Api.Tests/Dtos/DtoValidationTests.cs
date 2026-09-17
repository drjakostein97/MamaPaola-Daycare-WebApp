using System.ComponentModel.DataAnnotations;
using MamaPaola.Api.Dtos;

namespace MamaPaola.Api.Tests.Dtos;

public class DtoValidationTests
{
    private static bool Validate(object dto, out List<ValidationResult> results)
    {
        results = [];
        var context = new ValidationContext(dto);
        return Validator.TryValidateObject(dto, context, results, validateAllProperties: true);
    }

    // ---- ContactFormRequest ----

    [Fact]
    public void ContactFormRequest_ValidPayload_Passes()
    {
        var dto = new ContactFormRequest { Name = "Jane", Email = "jane@example.com", Phone = "555-1234", Message = "Hi" };

        Assert.True(Validate(dto, out _));
    }

    [Fact]
    public void ContactFormRequest_MissingName_Fails()
    {
        var dto = new ContactFormRequest { Name = "", Email = "jane@example.com", Phone = "555-1234", Message = "Hi" };

        Assert.False(Validate(dto, out var results));
        Assert.Contains(results, r => r.MemberNames.Contains(nameof(ContactFormRequest.Name)));
    }

    [Fact]
    public void ContactFormRequest_MissingEmail_Fails()
    {
        var dto = new ContactFormRequest { Name = "Jane", Email = "", Phone = "555-1234", Message = "Hi" };

        Assert.False(Validate(dto, out var results));
        Assert.Contains(results, r => r.MemberNames.Contains(nameof(ContactFormRequest.Email)));
    }

    [Fact]
    public void ContactFormRequest_MalformedEmail_Fails()
    {
        var dto = new ContactFormRequest { Name = "Jane", Email = "not-an-email", Phone = "555-1234", Message = "Hi" };

        Assert.False(Validate(dto, out var results));
        Assert.Contains(results, r => r.MemberNames.Contains(nameof(ContactFormRequest.Email)));
    }

    [Fact]
    public void ContactFormRequest_MissingPhone_Fails()
    {
        var dto = new ContactFormRequest { Name = "Jane", Email = "jane@example.com", Phone = "", Message = "Hi" };

        Assert.False(Validate(dto, out var results));
        Assert.Contains(results, r => r.MemberNames.Contains(nameof(ContactFormRequest.Phone)));
    }

    [Fact]
    public void ContactFormRequest_MissingMessage_Fails()
    {
        var dto = new ContactFormRequest { Name = "Jane", Email = "jane@example.com", Phone = "555-1234", Message = "" };

        Assert.False(Validate(dto, out var results));
        Assert.Contains(results, r => r.MemberNames.Contains(nameof(ContactFormRequest.Message)));
    }

    [Fact]
    public void ContactFormRequest_MessageOverMaxLength_Fails()
    {
        var dto = new ContactFormRequest
        {
            Name = "Jane",
            Email = "jane@example.com",
            Phone = "555-1234",
            Message = new string('x', 4001),
        };

        Assert.False(Validate(dto, out var results));
        Assert.Contains(results, r => r.MemberNames.Contains(nameof(ContactFormRequest.Message)));
    }

    // ---- CreateStaffRequest ----

    [Fact]
    public void CreateStaffRequest_ValidPayload_Passes()
    {
        var dto = new CreateStaffRequest { Username = "abc", DisplayName = "Abc", Password = "12345678" };

        Assert.True(Validate(dto, out _));
    }

    [Fact]
    public void CreateStaffRequest_UsernameBelowMinLength_Fails()
    {
        var dto = new CreateStaffRequest { Username = "ab", DisplayName = "Abc", Password = "12345678" };

        Assert.False(Validate(dto, out var results));
        Assert.Contains(results, r => r.MemberNames.Contains(nameof(CreateStaffRequest.Username)));
    }

    [Fact]
    public void CreateStaffRequest_UsernameAtMinLength_Passes()
    {
        var dto = new CreateStaffRequest { Username = "abc", DisplayName = "Abc", Password = "12345678" };

        Assert.True(Validate(dto, out _));
    }

    [Fact]
    public void CreateStaffRequest_PasswordBelowMinLength_Fails()
    {
        var dto = new CreateStaffRequest { Username = "abc", DisplayName = "Abc", Password = "1234567" };

        Assert.False(Validate(dto, out var results));
        Assert.Contains(results, r => r.MemberNames.Contains(nameof(CreateStaffRequest.Password)));
    }

    [Fact]
    public void CreateStaffRequest_PasswordAtMinLength_Passes()
    {
        var dto = new CreateStaffRequest { Username = "abc", DisplayName = "Abc", Password = "12345678" };

        Assert.True(Validate(dto, out _));
    }

    [Fact]
    public void CreateStaffRequest_MissingDisplayName_Fails()
    {
        var dto = new CreateStaffRequest { Username = "abc", DisplayName = "", Password = "12345678" };

        Assert.False(Validate(dto, out var results));
        Assert.Contains(results, r => r.MemberNames.Contains(nameof(CreateStaffRequest.DisplayName)));
    }

    // ---- EnrollmentInquiryRequest ----

    private static EnrollmentInquiryRequest ValidEnrollmentRequest() => new()
    {
        ParentName = "Jane Doe",
        Email = "jane@example.com",
        Phone = "555-1234",
        Children = [new ChildRequest { Age = "4" }],
        PreferredStartDate = "2026-10-01",
    };

    [Fact]
    public void EnrollmentInquiryRequest_ValidPayload_Passes()
    {
        var dto = ValidEnrollmentRequest();

        Assert.True(Validate(dto, out _));
    }

    [Fact]
    public void EnrollmentInquiryRequest_EmptyChildrenList_Fails()
    {
        var dto = ValidEnrollmentRequest();
        dto.Children = [];

        Assert.False(Validate(dto, out var results));
        Assert.Contains(results, r => r.MemberNames.Contains(nameof(EnrollmentInquiryRequest.Children)));
    }

    [Fact]
    public void EnrollmentInquiryRequest_NullChildrenList_Fails()
    {
        var dto = ValidEnrollmentRequest();
        dto.Children = null!;

        Assert.False(Validate(dto, out var results));
        Assert.Contains(results, r => r.MemberNames.Contains(nameof(EnrollmentInquiryRequest.Children)));
    }

    [Fact]
    public void EnrollmentInquiryRequest_PlainValidatorDoesNotRecurseIntoChildItems()
    {
        // Validator.TryValidateObject only validates the DTO's own direct properties —
        // it does NOT walk into each ChildRequest's own [Required] attributes, unlike
        // ASP.NET Core's AddValidation() minimal-API pipeline (exercised in the
        // integration tests), which does validate the full object graph. A ChildRequest
        // with a blank Age is therefore invisible to this validator even though the
        // list itself has one (non-empty) entry.
        var dto = ValidEnrollmentRequest();
        dto.Children = [new ChildRequest { Age = "" }];

        Assert.True(Validate(dto, out _));
    }

    [Fact]
    public void EnrollmentInquiryRequest_MissingParentName_Fails()
    {
        var dto = ValidEnrollmentRequest();
        dto.ParentName = "";

        Assert.False(Validate(dto, out var results));
        Assert.Contains(results, r => r.MemberNames.Contains(nameof(EnrollmentInquiryRequest.ParentName)));
    }

    [Fact]
    public void EnrollmentInquiryRequest_MalformedEmail_Fails()
    {
        var dto = ValidEnrollmentRequest();
        dto.Email = "not-an-email";

        Assert.False(Validate(dto, out var results));
        Assert.Contains(results, r => r.MemberNames.Contains(nameof(EnrollmentInquiryRequest.Email)));
    }

    [Fact]
    public void EnrollmentInquiryRequest_MissingPreferredStartDate_Fails()
    {
        var dto = ValidEnrollmentRequest();
        dto.PreferredStartDate = "";

        Assert.False(Validate(dto, out var results));
        Assert.Contains(results, r => r.MemberNames.Contains(nameof(EnrollmentInquiryRequest.PreferredStartDate)));
    }

    [Fact]
    public void EnrollmentInquiryRequest_NotesOmitted_StillPasses()
    {
        var dto = ValidEnrollmentRequest();
        dto.Notes = null;

        Assert.True(Validate(dto, out _));
    }

    // ---- LoginRequest ----

    [Fact]
    public void LoginRequest_ValidPayload_Passes()
    {
        var dto = new LoginRequest { Username = "admin", Password = "secret" };

        Assert.True(Validate(dto, out _));
    }

    [Fact]
    public void LoginRequest_MissingUsername_Fails()
    {
        var dto = new LoginRequest { Username = "", Password = "secret" };

        Assert.False(Validate(dto, out var results));
        Assert.Contains(results, r => r.MemberNames.Contains(nameof(LoginRequest.Username)));
    }

    [Fact]
    public void LoginRequest_MissingPassword_Fails()
    {
        var dto = new LoginRequest { Username = "admin", Password = "" };

        Assert.False(Validate(dto, out var results));
        Assert.Contains(results, r => r.MemberNames.Contains(nameof(LoginRequest.Password)));
    }
}

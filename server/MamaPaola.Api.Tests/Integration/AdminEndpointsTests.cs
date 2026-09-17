using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using MamaPaola.Api.Data;
using MamaPaola.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace MamaPaola.Api.Tests.Integration;

public class AdminEndpointsTests : IDisposable
{
    private readonly CustomWebApplicationFactory _factory = new();
    private readonly HttpClient _client;

    public AdminEndpointsTests()
    {
        _client = _factory.CreateClient();
    }

    private record LoginResponseDto(string Token, DateTimeOffset ExpiresAt, string DisplayName);
    private record StaffUserResponseDto(int Id, string Username, string DisplayName, DateTimeOffset CreatedAt);

    private async Task<string> LoginAsAdminAsync()
    {
        var response = await _client.PostAsJsonAsync("/api/auth/login", new
        {
            username = CustomWebApplicationFactory.SeededAdminUsername,
            password = CustomWebApplicationFactory.SeededAdminPassword,
        });
        var body = await response.Content.ReadFromJsonAsync<LoginResponseDto>();
        return body!.Token;
    }

    private void AuthorizeWith(string token) =>
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

    [Theory]
    [InlineData("/api/admin/contact-submissions")]
    [InlineData("/api/admin/enrollment-inquiries")]
    [InlineData("/api/admin/staff")]
    public async Task GetAdminRoute_NoToken_Returns401(string route)
    {
        var response = await _client.GetAsync(route);

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task PostStaff_NoToken_Returns401()
    {
        var response = await _client.PostAsJsonAsync("/api/admin/staff", new
        {
            username = "newstaff",
            displayName = "New Staff",
            password = "SomePassword1!",
        });

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task GetContactSubmissions_WithToken_ReturnsSeededDataOrderedByCreatedAtDesc()
    {
        using (var scope = _factory.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.ContactSubmissions.AddRange(
                new ContactSubmission { Name = "Older", Email = "a@example.com", Phone = "1", Message = "m", CreatedAt = DateTimeOffset.UtcNow.AddMinutes(-10) },
                new ContactSubmission { Name = "Newer", Email = "b@example.com", Phone = "2", Message = "m", CreatedAt = DateTimeOffset.UtcNow });
            await db.SaveChangesAsync();
        }

        AuthorizeWith(await LoginAsAdminAsync());
        var response = await _client.GetAsync("/api/admin/contact-submissions");
        var body = await response.Content.ReadFromJsonAsync<List<ContactSubmission>>();

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(body);
        Assert.Equal("Newer", body![0].Name);
        Assert.Equal("Older", body[1].Name);
    }

    [Fact]
    public async Task GetEnrollmentInquiries_WithToken_IncludesChildren()
    {
        await _client.PostAsJsonAsync("/api/enrollment", new
        {
            parentName = "Jane Doe",
            email = "jane@example.com",
            phone = "555-1234",
            children = new[] { new { age = "4" }, new { age = "6" } },
            preferredStartDate = "2026-10-01",
        });

        AuthorizeWith(await LoginAsAdminAsync());
        var response = await _client.GetAsync("/api/admin/enrollment-inquiries");
        var body = await response.Content.ReadFromJsonAsync<List<EnrollmentInquiry>>();

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(body);
        var inquiry = Assert.Single(body!);
        Assert.Equal(2, inquiry.Children.Count);
    }

    [Fact]
    public async Task GetStaff_WithToken_ProjectionExcludesPasswordHash()
    {
        AuthorizeWith(await LoginAsAdminAsync());
        var response = await _client.GetAsync("/api/admin/staff");
        var body = await response.Content.ReadAsStringAsync();

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.DoesNotContain("passwordHash", body, StringComparison.OrdinalIgnoreCase);
        var staff = await response.Content.ReadFromJsonAsync<List<StaffUserResponseDto>>();
        Assert.Contains(staff!, s => s.Username == CustomWebApplicationFactory.SeededAdminUsername);
    }

    [Fact]
    public async Task PostStaff_NewUsername_Returns201AndPersistsHashedPassword()
    {
        AuthorizeWith(await LoginAsAdminAsync());

        var response = await _client.PostAsJsonAsync("/api/admin/staff", new
        {
            username = "newstaff",
            displayName = "New Staff",
            password = "SomePassword1!",
        });

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var saved = await db.StaffUsers.SingleAsync(s => s.Username == "newstaff");
        Assert.NotEqual("SomePassword1!", saved.PasswordHash);
        Assert.False(string.IsNullOrWhiteSpace(saved.PasswordHash));
    }

    [Fact]
    public async Task PostStaff_DuplicateUsername_Returns409()
    {
        AuthorizeWith(await LoginAsAdminAsync());

        var response = await _client.PostAsJsonAsync("/api/admin/staff", new
        {
            username = CustomWebApplicationFactory.SeededAdminUsername,
            displayName = "Duplicate",
            password = "SomePassword1!",
        });

        Assert.Equal(HttpStatusCode.Conflict, response.StatusCode);
    }

    [Fact]
    public async Task PostStaff_InvalidPayload_Returns400()
    {
        AuthorizeWith(await LoginAsAdminAsync());

        var response = await _client.PostAsJsonAsync("/api/admin/staff", new
        {
            username = "ab", // below MinimumLength = 3
            displayName = "New Staff",
            password = "short", // below MinimumLength = 8
        });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task FullFlow_LoginCreateStaffThenListStaff_RoundTrip()
    {
        var token = await LoginAsAdminAsync();
        AuthorizeWith(token);

        var createResponse = await _client.PostAsJsonAsync("/api/admin/staff", new
        {
            username = "roundtrip",
            displayName = "Round Trip",
            password = "RoundTrip1!",
        });
        Assert.Equal(HttpStatusCode.Created, createResponse.StatusCode);

        var listResponse = await _client.GetAsync("/api/admin/staff");
        var staff = await listResponse.Content.ReadFromJsonAsync<List<StaffUserResponseDto>>();

        Assert.Equal(HttpStatusCode.OK, listResponse.StatusCode);
        Assert.Contains(staff!, s => s.Username == "roundtrip" && s.DisplayName == "Round Trip");
    }

    public void Dispose()
    {
        _client.Dispose();
        _factory.Dispose();
    }
}

using System.Net;
using System.Net.Http.Json;
using MamaPaola.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace MamaPaola.Api.Tests.Integration;

public class EnrollmentEndpointsTests : IDisposable
{
    private readonly CustomWebApplicationFactory _factory = new();
    private readonly HttpClient _client;

    public EnrollmentEndpointsTests()
    {
        _client = _factory.CreateClient();
    }

    private static object ValidPayload(object? children = null) => new
    {
        parentName = "Jane Doe",
        email = "jane@example.com",
        phone = "555-1234",
        children = children ?? new[] { new { age = "4" } },
        preferredStartDate = "2026-10-01",
        notes = "Some notes",
    };

    [Fact]
    public async Task PostEnrollment_SingleChild_Returns200AndPersists()
    {
        var response = await _client.PostAsJsonAsync("/api/enrollment", ValidPayload());

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var saved = await db.EnrollmentInquiries.Include(e => e.Children).SingleAsync();
        Assert.Single(saved.Children);
        Assert.Equal("4", saved.Children[0].Age);
    }

    [Fact]
    public async Task PostEnrollment_MultipleChildren_PersistsAllChildRows()
    {
        var payload = ValidPayload(new[]
        {
            new { age = "4" },
            new { age = "6" },
        });

        var response = await _client.PostAsJsonAsync("/api/enrollment", payload);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var saved = await db.EnrollmentInquiries.Include(e => e.Children).SingleAsync();
        Assert.Equal(2, saved.Children.Count);
        Assert.Contains(saved.Children, c => c.Age == "4");
        Assert.Contains(saved.Children, c => c.Age == "6");
    }

    [Fact]
    public async Task PostEnrollment_EmptyChildrenArray_Returns400()
    {
        var response = await _client.PostAsJsonAsync("/api/enrollment", ValidPayload(Array.Empty<object>()));

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        var body = await response.Content.ReadAsStringAsync();
        Assert.Contains("Children", body);
    }

    [Fact]
    public async Task PostEnrollment_ChildrenPropertyMissing_Returns400()
    {
        var payload = new
        {
            parentName = "Jane Doe",
            email = "jane@example.com",
            phone = "555-1234",
            preferredStartDate = "2026-10-01",
        };

        var response = await _client.PostAsJsonAsync("/api/enrollment", payload);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task PostEnrollment_ChildMissingAge_Returns400()
    {
        var payload = ValidPayload(new[] { new { age = "" } });

        var response = await _client.PostAsJsonAsync("/api/enrollment", payload);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task PostEnrollment_MissingParentName_Returns400()
    {
        var payload = new
        {
            parentName = "",
            email = "jane@example.com",
            phone = "555-1234",
            children = new[] { new { age = "4" } },
            preferredStartDate = "2026-10-01",
        };

        var response = await _client.PostAsJsonAsync("/api/enrollment", payload);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task PostEnrollment_InvalidEmail_Returns400()
    {
        var payload = new
        {
            parentName = "Jane Doe",
            email = "not-an-email",
            phone = "555-1234",
            children = new[] { new { age = "4" } },
            preferredStartDate = "2026-10-01",
        };

        var response = await _client.PostAsJsonAsync("/api/enrollment", payload);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task PostEnrollment_NotesOmitted_StillSucceeds()
    {
        var payload = new
        {
            parentName = "Jane Doe",
            email = "jane@example.com",
            phone = "555-1234",
            children = new[] { new { age = "4" } },
            preferredStartDate = "2026-10-01",
        };

        var response = await _client.PostAsJsonAsync("/api/enrollment", payload);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task PostEnrollment_SixthRequestWithinWindow_Returns429()
    {
        for (var i = 0; i < 5; i++)
        {
            var ok = await _client.PostAsJsonAsync("/api/enrollment", ValidPayload());
            Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        }

        var sixth = await _client.PostAsJsonAsync("/api/enrollment", ValidPayload());

        Assert.Equal((HttpStatusCode)429, sixth.StatusCode);
    }

    public void Dispose()
    {
        _client.Dispose();
        _factory.Dispose();
    }
}

using System.Net;
using System.Net.Http.Json;
using MamaPaola.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace MamaPaola.Api.Tests.Integration;

public class ContactEndpointsTests : IDisposable
{
    private readonly CustomWebApplicationFactory _factory = new();
    private readonly HttpClient _client;

    public ContactEndpointsTests()
    {
        _client = _factory.CreateClient();
    }

    private static object ValidPayload() => new
    {
        name = "Jane Doe",
        email = "jane@example.com",
        phone = "555-1234",
        message = "Hello there",
    };

    [Fact]
    public async Task PostContact_ValidPayload_Returns200AndPersists()
    {
        var response = await _client.PostAsJsonAsync("/api/contact", ValidPayload());

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var saved = await db.ContactSubmissions.SingleAsync();
        Assert.Equal("Jane Doe", saved.Name);
        Assert.Equal("jane@example.com", saved.Email);
    }

    [Fact]
    public async Task PostContact_MissingName_Returns400()
    {
        var response = await _client.PostAsJsonAsync("/api/contact", new
        {
            name = "",
            email = "jane@example.com",
            phone = "555-1234",
            message = "Hello there",
        });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task PostContact_InvalidEmail_Returns400()
    {
        var response = await _client.PostAsJsonAsync("/api/contact", new
        {
            name = "Jane Doe",
            email = "not-an-email",
            phone = "555-1234",
            message = "Hello there",
        });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task PostContact_InvalidPhone_Returns400()
    {
        var response = await _client.PostAsJsonAsync("/api/contact", new
        {
            name = "Jane Doe",
            email = "jane@example.com",
            phone = "",
            message = "Hello there",
        });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task PostContact_MessageTooLong_Returns400()
    {
        var response = await _client.PostAsJsonAsync("/api/contact", new
        {
            name = "Jane Doe",
            email = "jane@example.com",
            phone = "555-1234",
            message = new string('x', 4001),
        });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task PostContact_SixthRequestWithinWindow_Returns429()
    {
        for (var i = 0; i < 5; i++)
        {
            var ok = await _client.PostAsJsonAsync("/api/contact", ValidPayload());
            Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        }

        var sixth = await _client.PostAsJsonAsync("/api/contact", ValidPayload());

        Assert.Equal((HttpStatusCode)429, sixth.StatusCode);
    }

    public void Dispose()
    {
        _client.Dispose();
        _factory.Dispose();
    }
}

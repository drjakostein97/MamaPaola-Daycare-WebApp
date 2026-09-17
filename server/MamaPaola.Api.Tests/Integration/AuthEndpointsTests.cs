using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http.Json;

namespace MamaPaola.Api.Tests.Integration;

public class AuthEndpointsTests : IDisposable
{
    private readonly CustomWebApplicationFactory _factory = new();
    private readonly HttpClient _client;

    public AuthEndpointsTests()
    {
        _client = _factory.CreateClient();
    }

    private record LoginResponseDto(string Token, DateTimeOffset ExpiresAt, string DisplayName);

    [Fact]
    public async Task Login_SeededCredentials_Returns200WithTokenExpiryAndDisplayName()
    {
        var response = await _client.PostAsJsonAsync("/api/auth/login", new
        {
            username = CustomWebApplicationFactory.SeededAdminUsername,
            password = CustomWebApplicationFactory.SeededAdminPassword,
        });

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var body = await response.Content.ReadFromJsonAsync<LoginResponseDto>();
        Assert.NotNull(body);
        Assert.False(string.IsNullOrWhiteSpace(body!.Token));
        Assert.Equal("Test Admin", body.DisplayName);
        Assert.True(body.ExpiresAt > DateTimeOffset.UtcNow);
    }

    [Fact]
    public async Task Login_TokenClaims_MatchSeededUser()
    {
        var response = await _client.PostAsJsonAsync("/api/auth/login", new
        {
            username = CustomWebApplicationFactory.SeededAdminUsername,
            password = CustomWebApplicationFactory.SeededAdminPassword,
        });

        var body = await response.Content.ReadFromJsonAsync<LoginResponseDto>();
        var jwt = new JwtSecurityTokenHandler().ReadJwtToken(body!.Token);

        Assert.Equal(CustomWebApplicationFactory.SeededAdminUsername, jwt.Claims.Single(c => c.Type == "username").Value);
        Assert.Equal("Test Admin", jwt.Claims.Single(c => c.Type == "displayName").Value);
    }

    [Fact]
    public async Task Login_WrongPassword_Returns401()
    {
        var response = await _client.PostAsJsonAsync("/api/auth/login", new
        {
            username = CustomWebApplicationFactory.SeededAdminUsername,
            password = "WrongPassword1!",
        });

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Login_UnknownUsername_Returns401()
    {
        var response = await _client.PostAsJsonAsync("/api/auth/login", new
        {
            username = "nobody",
            password = "WhateverPassword1!",
        });

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Login_MissingFields_Returns400()
    {
        var response = await _client.PostAsJsonAsync("/api/auth/login", new
        {
            username = "",
            password = "",
        });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Login_EleventhAttemptWithinWindow_Returns429()
    {
        var badCredentials = new { username = CustomWebApplicationFactory.SeededAdminUsername, password = "WrongPassword1!" };

        for (var i = 0; i < 10; i++)
        {
            var attempt = await _client.PostAsJsonAsync("/api/auth/login", badCredentials);
            Assert.Equal(HttpStatusCode.Unauthorized, attempt.StatusCode);
        }

        var eleventh = await _client.PostAsJsonAsync("/api/auth/login", badCredentials);

        Assert.Equal((HttpStatusCode)429, eleventh.StatusCode);
    }

    public void Dispose()
    {
        _client.Dispose();
        _factory.Dispose();
    }
}

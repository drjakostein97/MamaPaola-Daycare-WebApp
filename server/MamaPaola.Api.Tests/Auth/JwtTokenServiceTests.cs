using System.IdentityModel.Tokens.Jwt;
using System.Text;
using MamaPaola.Api.Auth;
using MamaPaola.Api.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace MamaPaola.Api.Tests.Auth;

public class JwtTokenServiceTests
{
    private const string SigningKey = "unit-test-signing-key-needs-32-bytes-minimum";
    private const string Issuer = "MamaPaolaDaycareApi";
    private const string Audience = "MamaPaolaDaycareAdmin";

    private static JwtTokenService CreateService(string? signingKey = SigningKey, string? issuer = Issuer, string? audience = Audience)
    {
        var config = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Jwt:SigningKey"] = signingKey,
                ["Jwt:Issuer"] = issuer,
                ["Jwt:Audience"] = audience,
            })
            .Build();
        return new JwtTokenService(config);
    }

    private static StaffUser CreateStaff() => new()
    {
        Id = 42,
        Username = "admin",
        DisplayName = "Admin",
        PasswordHash = "irrelevant",
        CreatedAt = DateTimeOffset.UtcNow,
    };

    [Fact]
    public void CreateToken_ReturnsNonEmptyTokenAndExpiryEightHoursFromNow()
    {
        var service = CreateService();
        var before = DateTimeOffset.UtcNow;

        var (token, expiresAt) = service.CreateToken(CreateStaff());

        Assert.False(string.IsNullOrWhiteSpace(token));
        Assert.InRange(expiresAt, before.AddHours(8).AddSeconds(-5), before.AddHours(8).AddSeconds(5));
    }

    [Fact]
    public void CreateToken_SetsSubjectClaimToStaffId()
    {
        var service = CreateService();
        var (token, _) = service.CreateToken(CreateStaff());

        var jwt = new JwtSecurityTokenHandler().ReadJwtToken(token);

        Assert.Equal("42", jwt.Subject);
    }

    [Fact]
    public void CreateToken_IncludesUsernameAndDisplayNameClaims()
    {
        var service = CreateService();
        var (token, _) = service.CreateToken(CreateStaff());

        var jwt = new JwtSecurityTokenHandler().ReadJwtToken(token);

        Assert.Equal("admin", jwt.Claims.Single(c => c.Type == "username").Value);
        Assert.Equal("Admin", jwt.Claims.Single(c => c.Type == "displayName").Value);
    }

    [Fact]
    public void CreateToken_ProducesTokenThatValidatesAgainstMatchingParameters()
    {
        var service = CreateService();
        var (token, _) = service.CreateToken(CreateStaff());

        var handler = new JwtSecurityTokenHandler();
        var parameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = Issuer,
            ValidateAudience = true,
            ValidAudience = Audience,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SigningKey)),
            ValidateLifetime = true,
        };

        var principal = handler.ValidateToken(token, parameters, out _);

        Assert.NotNull(principal);
    }

    [Fact]
    public void CreateToken_ThrowsInvalidOperationException_WhenSigningKeyMissing()
    {
        var service = CreateService(signingKey: null);

        Assert.Throws<InvalidOperationException>(() => service.CreateToken(CreateStaff()));
    }

    [Fact]
    public void CreateToken_WithEmptyStringSigningKey_ThrowsAtTokenCreation()
    {
        // appsettings.json ships Jwt:SigningKey as "" (empty string), not null/missing.
        // The `?? throw` null-coalescing check in JwtTokenService only catches a truly
        // missing key, not an empty one, so this documents what actually happens downstream:
        // an empty HMAC key is rejected when building the signing credentials.
        var service = CreateService(signingKey: "");

        Assert.ThrowsAny<Exception>(() => service.CreateToken(CreateStaff()));
    }
}

namespace MamaPaola.Api.Dtos;

public record LoginResponse(string Token, DateTimeOffset ExpiresAt, string DisplayName);

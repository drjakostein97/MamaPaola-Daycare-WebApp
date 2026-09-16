using MamaPaola.Api.Auth;
using MamaPaola.Api.Data;
using MamaPaola.Api.Dtos;
using MamaPaola.Api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

namespace MamaPaola.Api.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        app.MapPost("/api/auth/login", async (
            LoginRequest request,
            AppDbContext db,
            IPasswordHasher<StaffUser> hasher,
            JwtTokenService tokenService) =>
        {
            var staff = await db.StaffUsers.SingleOrDefaultAsync(s => s.Username == request.Username);
            if (staff is null)
            {
                return Results.Unauthorized();
            }

            var verifyResult = hasher.VerifyHashedPassword(staff, staff.PasswordHash, request.Password);
            if (verifyResult == PasswordVerificationResult.Failed)
            {
                return Results.Unauthorized();
            }

            var (token, expiresAt) = tokenService.CreateToken(staff);
            return Results.Ok(new LoginResponse(token, expiresAt, staff.DisplayName));
        })
        .RequireRateLimiting("AuthLogin");
    }
}

using MamaPaola.Api.Data;
using MamaPaola.Api.Dtos;
using MamaPaola.Api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MamaPaola.Api.Endpoints;

public static class AdminEndpoints
{
    public static void MapAdminEndpoints(this WebApplication app)
    {
        var admin = app.MapGroup("/api/admin").RequireAuthorization();

        admin.MapGet("/contact-submissions", async (AppDbContext db) =>
            await db.ContactSubmissions.OrderByDescending(x => x.CreatedAt).ToListAsync());

        admin.MapGet("/enrollment-inquiries", async (AppDbContext db) =>
            await db.EnrollmentInquiries.OrderByDescending(x => x.CreatedAt).ToListAsync());

        admin.MapGet("/staff", async (AppDbContext db) =>
            await db.StaffUsers
                .OrderBy(x => x.Username)
                .Select(x => new StaffUserResponse(x.Id, x.Username, x.DisplayName, x.CreatedAt))
                .ToListAsync());

        admin.MapPost("/staff", async (
            CreateStaffRequest request,
            AppDbContext db,
            IPasswordHasher<StaffUser> hasher) =>
        {
            var usernameTaken = await db.StaffUsers.AnyAsync(x => x.Username == request.Username);
            if (usernameTaken)
            {
                return Results.Conflict(new { error = "That username is already taken." });
            }

            var staff = new StaffUser
            {
                Username = request.Username,
                DisplayName = request.DisplayName,
                PasswordHash = "",
                CreatedAt = DateTimeOffset.UtcNow,
            };
            staff.PasswordHash = hasher.HashPassword(staff, request.Password);

            db.StaffUsers.Add(staff);
            await db.SaveChangesAsync();

            return Results.Created(
                $"/api/admin/staff/{staff.Id}",
                new StaffUserResponse(staff.Id, staff.Username, staff.DisplayName, staff.CreatedAt));
        });
    }
}

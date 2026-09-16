using MamaPaola.Api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MamaPaola.Api.Data;

public static class StaffUserSeeder
{
    public static async Task SeedAsync(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;

        var db = services.GetRequiredService<AppDbContext>();
        if (await db.StaffUsers.AnyAsync())
        {
            return;
        }

        var config = services.GetRequiredService<IConfiguration>();
        var username = config["Bootstrap:StaffUsername"];
        var password = config["Bootstrap:StaffPassword"];

        if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
        {
            app.Logger.LogWarning(
                "No staff accounts exist and Bootstrap:StaffUsername / Bootstrap:StaffPassword are not " +
                "configured. Set them via dotnet user-secrets and restart to create the first staff account.");
            return;
        }

        var displayName = config["Bootstrap:StaffDisplayName"] ?? "Admin";
        var hasher = services.GetRequiredService<IPasswordHasher<StaffUser>>();

        var staff = new StaffUser
        {
            Username = username,
            DisplayName = displayName,
            PasswordHash = "",
            CreatedAt = DateTimeOffset.UtcNow,
        };
        staff.PasswordHash = hasher.HashPassword(staff, password);

        db.StaffUsers.Add(staff);
        await db.SaveChangesAsync();

        app.Logger.LogInformation("Seeded initial staff account {Username}.", username);
    }
}

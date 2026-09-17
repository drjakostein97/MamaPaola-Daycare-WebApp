using MamaPaola.Api.Entities;
using Microsoft.AspNetCore.Identity;

namespace MamaPaola.Api.Tests.Auth;

public class PasswordHasherTests
{
    private static StaffUser CreateStaff() => new()
    {
        Id = 1,
        Username = "admin",
        DisplayName = "Admin",
        PasswordHash = "",
        CreatedAt = DateTimeOffset.UtcNow,
    };

    [Fact]
    public void HashPassword_ThenVerify_Succeeds()
    {
        var hasher = new PasswordHasher<StaffUser>();
        var staff = CreateStaff();
        staff.PasswordHash = hasher.HashPassword(staff, "CorrectHorseBattery1!");

        var result = hasher.VerifyHashedPassword(staff, staff.PasswordHash, "CorrectHorseBattery1!");

        Assert.Equal(PasswordVerificationResult.Success, result);
    }

    [Fact]
    public void VerifyHashedPassword_WithWrongPassword_ReturnsFailed()
    {
        var hasher = new PasswordHasher<StaffUser>();
        var staff = CreateStaff();
        staff.PasswordHash = hasher.HashPassword(staff, "CorrectHorseBattery1!");

        var result = hasher.VerifyHashedPassword(staff, staff.PasswordHash, "WrongPassword1!");

        Assert.Equal(PasswordVerificationResult.Failed, result);
    }

    [Fact]
    public void HashPassword_ProducesDifferentHashesForSamePasswordDueToSalt()
    {
        var hasher = new PasswordHasher<StaffUser>();
        var staff = CreateStaff();

        var hash1 = hasher.HashPassword(staff, "SamePassword1!");
        var hash2 = hasher.HashPassword(staff, "SamePassword1!");

        Assert.NotEqual(hash1, hash2);
    }
}

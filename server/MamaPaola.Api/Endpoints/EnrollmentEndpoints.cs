using MamaPaola.Api.Data;
using MamaPaola.Api.Dtos;
using MamaPaola.Api.Entities;
using Microsoft.AspNetCore.RateLimiting;

namespace MamaPaola.Api.Endpoints;

public static class EnrollmentEndpoints
{
    public static void MapEnrollmentEndpoints(this WebApplication app)
    {
        app.MapPost("/api/enrollment", async (EnrollmentInquiryRequest request, AppDbContext db) =>
        {
            if (request.Children is not { Count: > 0 })
            {
                return Results.ValidationProblem(new Dictionary<string, string[]>
                {
                    ["Children"] = ["At least one child is required."],
                });
            }

            var entity = new EnrollmentInquiry
            {
                ParentName = request.ParentName,
                Email = request.Email,
                Phone = request.Phone,
                Children = request.Children.Select(c => new EnrollmentChild { Age = c.Age }).ToList(),
                PreferredStartDate = request.PreferredStartDate,
                Notes = request.Notes,
                CreatedAt = DateTimeOffset.UtcNow,
            };
            db.EnrollmentInquiries.Add(entity);
            await db.SaveChangesAsync();
            return Results.Ok(new { });
        })
        .RequireRateLimiting("FormSubmission");
    }
}

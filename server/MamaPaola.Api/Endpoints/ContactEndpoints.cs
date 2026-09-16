using MamaPaola.Api.Data;
using MamaPaola.Api.Dtos;
using MamaPaola.Api.Entities;

namespace MamaPaola.Api.Endpoints;

public static class ContactEndpoints
{
    public static void MapContactEndpoints(this WebApplication app)
    {
        app.MapPost("/api/contact", async (ContactFormRequest request, AppDbContext db) =>
        {
            var entity = new ContactSubmission
            {
                Name = request.Name,
                Email = request.Email,
                Phone = request.Phone,
                Message = request.Message,
                CreatedAt = DateTimeOffset.UtcNow,
            };
            db.ContactSubmissions.Add(entity);
            await db.SaveChangesAsync();
            return Results.Ok(new { });
        });
    }
}

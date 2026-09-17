using MamaPaola.Api.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MamaPaola.Api.Tests.Integration;

public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    public const string SeededAdminUsername = "admin";
    public const string SeededAdminPassword = "TestPassword123!";

    private readonly SqliteConnection _connection = new("DataSource=:memory:");

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureAppConfiguration((_, config) =>
        {
            config.AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Jwt:SigningKey"] = "integration-test-signing-key-needs-32-bytes-minimum",
                ["Jwt:Issuer"] = "MamaPaolaDaycareApi",
                ["Jwt:Audience"] = "MamaPaolaDaycareAdmin",
                ["Bootstrap:StaffUsername"] = SeededAdminUsername,
                ["Bootstrap:StaffPassword"] = SeededAdminPassword,
                ["Bootstrap:StaffDisplayName"] = "Test Admin",
                ["AllowedOrigins:0"] = "http://localhost:5173",
                ["ConnectionStrings:AppDb"] = "DataSource=:memory:",
            });
        });

        builder.ConfigureServices(services =>
        {
            // Removing just DbContextOptions<AppDbContext> leaves EF Core's Npgsql
            // provider services (registered by Program.cs's UseNpgsql call) mixed in
            // with the Sqlite ones we're about to add, which EF rejects at startup
            // ("Only a single database provider can be registered"). Strip every
            // EF Core / Npgsql descriptor before re-registering with Sqlite.
            var efDescriptors = services
                .Where(d => d.ServiceType.Namespace is not null &&
                    (d.ServiceType.Namespace.StartsWith("Microsoft.EntityFrameworkCore", StringComparison.Ordinal) ||
                     d.ServiceType.Namespace.StartsWith("Npgsql", StringComparison.Ordinal)))
                .ToList();
            foreach (var descriptor in efDescriptors)
            {
                services.Remove(descriptor);
            }

            _connection.Open();
            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlite(_connection);
                options.ReplaceService<IModelCustomizer, SqliteDateTimeOffsetModelCustomizer>();
            });

            // StaffUserSeeder.SeedAsync runs unconditionally right after builder.Build()
            // inside Program.cs, so the schema must already exist before that point.
            using var provider = services.BuildServiceProvider();
            using var scope = provider.CreateScope();
            scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.EnsureCreated();
        });
    }

    protected override void Dispose(bool disposing)
    {
        base.Dispose(disposing);
        if (disposing)
        {
            _connection.Dispose();
        }
    }
}

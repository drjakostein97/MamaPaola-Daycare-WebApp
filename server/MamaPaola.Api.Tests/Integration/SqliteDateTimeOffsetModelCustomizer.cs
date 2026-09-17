using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MamaPaola.Api.Tests.Integration;

// SQLite has no native DateTimeOffset type and EF Core's Sqlite provider refuses to
// translate ORDER BY on it server-side (NotSupportedException). Postgres (production)
// handles this natively via Npgsql, so this conversion is test-only: it swaps every
// DateTimeOffset property to a sortable binary representation, purely so SQLite-backed
// integration tests can exercise the app's real .OrderByDescending(x => x.CreatedAt) code.
public class SqliteDateTimeOffsetModelCustomizer(ModelCustomizerDependencies dependencies)
    : ModelCustomizer(dependencies)
{
    public override void Customize(ModelBuilder modelBuilder, DbContext context)
    {
        base.Customize(modelBuilder, context);

        var converter = new DateTimeOffsetToBinaryConverter();
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTimeOffset))
                {
                    property.SetValueConverter(converter);
                }
            }
        }
    }
}

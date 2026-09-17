using Microsoft.EntityFrameworkCore;
using MamaPaola.Api.Entities;

namespace MamaPaola.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<ContactSubmission> ContactSubmissions => Set<ContactSubmission>();
    public DbSet<EnrollmentInquiry> EnrollmentInquiries => Set<EnrollmentInquiry>();
    public DbSet<StaffUser> StaffUsers => Set<StaffUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ContactSubmission>(e =>
        {
            e.Property(x => x.Name).HasMaxLength(200).IsRequired();
            e.Property(x => x.Email).HasMaxLength(320).IsRequired();
            e.Property(x => x.Phone).HasMaxLength(50).IsRequired();
            e.Property(x => x.Message).HasMaxLength(4000).IsRequired();
            e.Property(x => x.CreatedAt).HasDefaultValueSql("now()");
        });

        modelBuilder.Entity<EnrollmentInquiry>(e =>
        {
            e.Property(x => x.ParentName).HasMaxLength(200).IsRequired();
            e.Property(x => x.Email).HasMaxLength(320).IsRequired();
            e.Property(x => x.Phone).HasMaxLength(50).IsRequired();
            e.Property(x => x.PreferredStartDate).HasMaxLength(50).IsRequired();
            e.Property(x => x.Notes).HasMaxLength(4000);
            e.Property(x => x.CreatedAt).HasDefaultValueSql("now()");
            e.OwnsMany(x => x.Children, cb =>
            {
                cb.ToTable("EnrollmentChildren");
                cb.WithOwner().HasForeignKey("EnrollmentInquiryId");
                cb.Property<int>("Id");
                cb.HasKey("Id");
                cb.Property(c => c.Age).HasMaxLength(50).IsRequired();
            });
        });

        modelBuilder.Entity<StaffUser>(e =>
        {
            e.Property(x => x.Username).HasMaxLength(100).IsRequired();
            e.HasIndex(x => x.Username).IsUnique();
            e.Property(x => x.DisplayName).HasMaxLength(200).IsRequired();
            e.Property(x => x.PasswordHash).HasMaxLength(500).IsRequired();
            e.Property(x => x.CreatedAt).HasDefaultValueSql("now()");
        });
    }
}

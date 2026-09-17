using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MamaPaola.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddEnrollmentChildren : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChildAge",
                table: "EnrollmentInquiries");

            migrationBuilder.DropColumn(
                name: "ChildName",
                table: "EnrollmentInquiries");

            migrationBuilder.CreateTable(
                name: "EnrollmentChildren",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Age = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    EnrollmentInquiryId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnrollmentChildren", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EnrollmentChildren_EnrollmentInquiries_EnrollmentInquiryId",
                        column: x => x.EnrollmentInquiryId,
                        principalTable: "EnrollmentInquiries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EnrollmentChildren_EnrollmentInquiryId",
                table: "EnrollmentChildren",
                column: "EnrollmentInquiryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EnrollmentChildren");

            migrationBuilder.AddColumn<string>(
                name: "ChildAge",
                table: "EnrollmentInquiries",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ChildName",
                table: "EnrollmentInquiries",
                type: "character varying(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }
    }
}

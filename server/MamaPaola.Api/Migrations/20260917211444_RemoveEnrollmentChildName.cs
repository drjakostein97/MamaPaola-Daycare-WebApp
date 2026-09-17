using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MamaPaola.Api.Migrations
{
    /// <inheritdoc />
    public partial class RemoveEnrollmentChildName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "EnrollmentChildren");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "EnrollmentChildren",
                type: "character varying(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }
    }
}

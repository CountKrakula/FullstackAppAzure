using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FullstackApp_Azure.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToSubscription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Subscriptions",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "EndDate",
                table: "Subscriptions",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Subscriptions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_Name",
                table: "Subscriptions",
                column: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Subscriptions_Name",
                table: "Subscriptions");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Subscriptions");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Subscriptions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "EndDate",
                table: "Subscriptions",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldNullable: true);
        }
    }
}

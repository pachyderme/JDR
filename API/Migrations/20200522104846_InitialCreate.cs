using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Templates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 300, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Templates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Universes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 300, nullable: false),
                    Initials = table.Column<string>(maxLength: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Universes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Scenarios",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 300, nullable: false),
                    Summary = table.Column<string>(maxLength: 1000, nullable: false),
                    Goal = table.Column<string>(maxLength: 1000, nullable: true),
                    UniverseId = table.Column<int>(nullable: false),
                    TemplateId = table.Column<int>(nullable: false),
                    CreationDate = table.Column<DateTime>(nullable: false),
                    LastUpdateDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Scenarios", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Scenarios_Templates_TemplateId",
                        column: x => x.TemplateId,
                        principalTable: "Templates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Scenarios_Universes_UniverseId",
                        column: x => x.UniverseId,
                        principalTable: "Universes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Characters",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 300, nullable: false),
                    Initials = table.Column<string>(maxLength: 2, nullable: false),
                    ScenarioId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Characters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Characters_Scenarios_ScenarioId",
                        column: x => x.ScenarioId,
                        principalTable: "Scenarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Characters",
                columns: new[] { "Id", "Initials", "Name", "ScenarioId" },
                values: new object[,]
                {
                    { 1, "LU", "Luna", null },
                    { 2, "WR", "Wrax", null },
                    { 3, "DC", "Dicham", null },
                    { 4, "RA", "Rakar", null },
                    { 5, "SA", "Saud'ho", null },
                    { 6, "XA", "Xavro", null }
                });

            migrationBuilder.InsertData(
                table: "Templates",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 5, "Emerging" },
                    { 3, "Branches" },
                    { 4, "Sandbox" },
                    { 1, "None" },
                    { 2, "Linear" }
                });

            migrationBuilder.InsertData(
                table: "Universes",
                columns: new[] { "Id", "Initials", "Name" },
                values: new object[,]
                {
                    { 7, "WH", "Warhammer" },
                    { 1, "DD", "Dungeons and dragons" },
                    { 2, "LR", "Lord of the rings" },
                    { 3, "SW", "Star wars - Clone wars" },
                    { 4, "SW", "Star wars - Rebels" },
                    { 5, "SW", "Star wars - The Great Sith's war" },
                    { 6, "SW", "Star wars - The old republic" },
                    { 8, "WH", "Warhammer 40k - Dark Heresy" }
                });

            migrationBuilder.InsertData(
                table: "Scenarios",
                columns: new[] { "Id", "CreationDate", "Goal", "LastUpdateDate", "Name", "Summary", "TemplateId", "UniverseId" },
                values: new object[] { 2, new DateTime(2020, 5, 17, 12, 48, 46, 5, DateTimeKind.Local).AddTicks(3686), "Révéler certaines vérités et participer aux dénouements de l'époque de près ou de loin.", new DateTime(2020, 5, 20, 12, 48, 46, 5, DateTimeKind.Local).AddTicks(3695), "SW - Le destin d'une galaxie", "-4000 ans avant la bataille de Yavin 4 et la chute de l'étoile noire, Exar Kun...", 3, 5 });

            migrationBuilder.InsertData(
                table: "Scenarios",
                columns: new[] { "Id", "CreationDate", "Goal", "LastUpdateDate", "Name", "Summary", "TemplateId", "UniverseId" },
                values: new object[] { 1, new DateTime(2020, 5, 12, 12, 48, 46, 2, DateTimeKind.Local).AddTicks(9777), "Les personnages devront tenter de survivre le plus longtemps possible à diverses aventures au sein de l'inquisition.", new DateTime(2020, 5, 17, 12, 48, 46, 4, DateTimeKind.Local).AddTicks(9197), "Dark Heresy", "Voici le résumé du scénario de Warhammer Dark Heresy...", 4, 8 });

            migrationBuilder.CreateIndex(
                name: "IX_Characters_ScenarioId",
                table: "Characters",
                column: "ScenarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Scenarios_TemplateId",
                table: "Scenarios",
                column: "TemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Scenarios_UniverseId",
                table: "Scenarios",
                column: "UniverseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Characters");

            migrationBuilder.DropTable(
                name: "Scenarios");

            migrationBuilder.DropTable(
                name: "Templates");

            migrationBuilder.DropTable(
                name: "Universes");
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 300, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ressources",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 300, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ressources", x => x.Id);
                });

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
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Identifier = table.Column<string>(maxLength: 300, nullable: false),
                    Password = table.Column<string>(maxLength: 300, nullable: false),
                    CreationDate = table.Column<DateTime>(nullable: false),
                    UpdateDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Characters",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 300, nullable: false),
                    Initials = table.Column<string>(maxLength: 2, nullable: false),
                    Biography = table.Column<string>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Characters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Characters_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    ImageUrl = table.Column<string>(nullable: true),
                    CreationDate = table.Column<DateTime>(nullable: false),
                    UpdateDate = table.Column<DateTime>(nullable: false),
                    UniverseId = table.Column<int>(nullable: false),
                    TemplateId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
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
                    table.ForeignKey(
                        name: "FK_Scenarios_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ScenariosCharacters",
                columns: table => new
                {
                    ScenarioId = table.Column<int>(nullable: false),
                    CharacterId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScenariosCharacters", x => new { x.CharacterId, x.ScenarioId });
                    table.ForeignKey(
                        name: "FK_ScenariosCharacters_Characters_CharacterId",
                        column: x => x.CharacterId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ScenariosCharacters_Scenarios_ScenarioId",
                        column: x => x.ScenarioId,
                        principalTable: "Scenarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ScenariosLocations",
                columns: table => new
                {
                    ScenarioId = table.Column<int>(nullable: false),
                    LocationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScenariosLocations", x => new { x.LocationId, x.ScenarioId });
                    table.ForeignKey(
                        name: "FK_ScenariosLocations_Locations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ScenariosLocations_Scenarios_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Scenarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ScenariosRessources",
                columns: table => new
                {
                    ScenarioId = table.Column<int>(nullable: false),
                    RessourceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScenariosRessources", x => new { x.RessourceId, x.ScenarioId });
                    table.ForeignKey(
                        name: "FK_ScenariosRessources_Ressources_RessourceId",
                        column: x => x.RessourceId,
                        principalTable: "Ressources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ScenariosRessources_Scenarios_RessourceId",
                        column: x => x.RessourceId,
                        principalTable: "Scenarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Templates",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "None" },
                    { 2, "Linear" },
                    { 3, "Branches" },
                    { 4, "Sandbox" },
                    { 5, "Emerging" }
                });

            migrationBuilder.InsertData(
                table: "Universes",
                columns: new[] { "Id", "Initials", "Name" },
                values: new object[,]
                {
                    { 1, "DD", "Dungeons and dragons" },
                    { 2, "LR", "Lord of the rings" },
                    { 3, "SW", "Star wars - Clone wars" },
                    { 4, "SW", "Star wars - Rebels" },
                    { 5, "SW", "Star wars - The Great Sith's war" },
                    { 6, "SW", "Star wars - The old republic" },
                    { 7, "WH", "Warhammer" },
                    { 8, "WH", "Warhammer 40k - Dark Heresy" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreationDate", "Identifier", "Password", "UpdateDate" },
                values: new object[] { 1, new DateTime(2020, 11, 16, 19, 44, 55, 482, DateTimeKind.Local).AddTicks(2185), "bouvetpierre49@gmail.com", "admin", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "Characters",
                columns: new[] { "Id", "Biography", "ImageUrl", "Initials", "Name", "UserId" },
                values: new object[,]
                {
                    { 1, null, null, "LU", "Luna", 1 },
                    { 2, null, null, "WR", "Wrax", 1 },
                    { 3, null, null, "DC", "Dicham", 1 },
                    { 4, null, null, "RA", "Rakar", 1 },
                    { 5, null, null, "SA", "Saud'ho", 1 },
                    { 6, null, null, "XA", "Xavro", 1 }
                });

            migrationBuilder.InsertData(
                table: "Scenarios",
                columns: new[] { "Id", "CreationDate", "Goal", "ImageUrl", "Name", "Summary", "TemplateId", "UniverseId", "UpdateDate", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2020, 11, 6, 19, 44, 55, 486, DateTimeKind.Local).AddTicks(3423), "Les personnages devront tenter de survivre le plus longtemps possible à diverses aventures au sein de l'inquisition.", null, "Dark Heresy", "Voici le résumé du scénario de Warhammer Dark Heresy...", 4, 8, new DateTime(2020, 11, 11, 19, 44, 55, 486, DateTimeKind.Local).AddTicks(3692), 1 },
                    { 2, new DateTime(2020, 11, 11, 19, 44, 55, 486, DateTimeKind.Local).AddTicks(4392), "Révéler certaines vérités et participer aux dénouements de l'époque de près ou de loin.", null, "SW - Le destin d'une galaxie", "-4000 ans avant la bataille de Yavin 4 et la chute de l'étoile noire, Exar Kun...", 3, 5, new DateTime(2020, 11, 14, 19, 44, 55, 486, DateTimeKind.Local).AddTicks(4404), 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Characters_UserId",
                table: "Characters",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Scenarios_TemplateId",
                table: "Scenarios",
                column: "TemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Scenarios_UniverseId",
                table: "Scenarios",
                column: "UniverseId");

            migrationBuilder.CreateIndex(
                name: "IX_Scenarios_UserId",
                table: "Scenarios",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ScenariosCharacters_ScenarioId",
                table: "ScenariosCharacters",
                column: "ScenarioId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ScenariosCharacters");

            migrationBuilder.DropTable(
                name: "ScenariosLocations");

            migrationBuilder.DropTable(
                name: "ScenariosRessources");

            migrationBuilder.DropTable(
                name: "Characters");

            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropTable(
                name: "Ressources");

            migrationBuilder.DropTable(
                name: "Scenarios");

            migrationBuilder.DropTable(
                name: "Templates");

            migrationBuilder.DropTable(
                name: "Universes");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}

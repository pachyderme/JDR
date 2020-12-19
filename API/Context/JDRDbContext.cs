using API.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace API.Context
{
    public class JDRDbContext : DbContext
    {
        public static string DbConnectionString = "Server=localhost; Database=JDR; Trusted_Connection=True;";

        public JDRDbContext(DbContextOptions<JDRDbContext> options)
            : base(options)
        { }

        public DbSet<User> Users { get; set; }

        public DbSet<Scenario> Scenarios { get; set; }

        public DbSet<Template> Templates { get; set; }

        public DbSet<Universe> Universes { get; set; }

        public DbSet<Character> Characters { get; set; }

        public DbSet<Ressource> Ressources { get; set; }

        public DbSet<Location> Locations { get; set; }

        public DbSet<ScenarioCharacter> ScenariosCharacters { get; set; }

        public DbSet<ScenarioLocation> ScenariosLocations { get; set; }

        public DbSet<ScenarioRessource> ScenariosRessources { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ConfigureScenariosCharactersRelations(modelBuilder);
            ConfigureScenariosLocationsRelations(modelBuilder);
            ConfigureScenariosRessourcesRelations(modelBuilder);

            AddUsers(modelBuilder);
            AddTemplates(modelBuilder);
            AddUniverses(modelBuilder);
            AddCharacters(modelBuilder);
            AddScenarios(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }

        private void ConfigureScenariosCharactersRelations(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ScenarioCharacter>()
                .HasKey(sc => new { sc.CharacterId, sc.ScenarioId });

            modelBuilder.Entity<ScenarioCharacter>()
                .HasOne(sc => sc.Character)
                .WithMany(c => c.ScenariosCharacter)
                .HasForeignKey(sc => sc.CharacterId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ScenarioCharacter>()
                .HasOne(sc => sc.Scenario)
                .WithMany(s => s.ScenarioCharacters)
                .HasForeignKey(sc => sc.ScenarioId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        private void ConfigureScenariosLocationsRelations(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ScenarioLocation>()
                .HasKey(sc => new { sc.LocationId, sc.ScenarioId });

            modelBuilder.Entity<ScenarioLocation>()
                .HasOne(sc => sc.Location)
                .WithMany(c => c.ScenariosLocation)
                .HasForeignKey(sc => sc.LocationId);

            modelBuilder.Entity<ScenarioLocation>()
                .HasOne(sc => sc.Scenario)
                .WithMany(s => s.ScenarioLocations)
                .HasForeignKey(sc => sc.LocationId);
        }

        private void ConfigureScenariosRessourcesRelations(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ScenarioRessource>()
                .HasKey(sc => new { sc.RessourceId, sc.ScenarioId });

            modelBuilder.Entity<ScenarioRessource>()
                .HasOne(sc => sc.Ressource)
                .WithMany(c => c.ScenariosRessource)
                .HasForeignKey(sc => sc.RessourceId);

            modelBuilder.Entity<ScenarioRessource>()
                .HasOne(sc => sc.Scenario)
                .WithMany(s => s.ScenarioRessources)
                .HasForeignKey(sc => sc.RessourceId);
        }

        private void AddUsers(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User { Id = 1, Identifier = "bouvetpierre49@gmail.com", Password = "admin", CreationDate = DateTime.Now });
        }

        private void AddTemplates(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Template>().HasData(new Template { Id = 1, Name = "None" });
            modelBuilder.Entity<Template>().HasData(new Template { Id = 2, Name = "Linear" });
            modelBuilder.Entity<Template>().HasData(new Template { Id = 3, Name = "Branches" });
            modelBuilder.Entity<Template>().HasData(new Template { Id = 4, Name = "Sandbox" });
            modelBuilder.Entity<Template>().HasData(new Template { Id = 5, Name = "Emerging" });
        }

        private void AddUniverses(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Universe>().HasData(new Universe { Id = 1, Name = "Dungeons and dragons", Initials = "DD" });
            modelBuilder.Entity<Universe>().HasData(new Universe { Id = 2, Name = "Lord of the rings", Initials = "LR" });
            modelBuilder.Entity<Universe>().HasData(new Universe { Id = 3, Name = "Star wars - Clone wars", Initials = "SW" });
            modelBuilder.Entity<Universe>().HasData(new Universe { Id = 4, Name = "Star wars - Rebels", Initials = "SW" });
            modelBuilder.Entity<Universe>().HasData(new Universe { Id = 5, Name = "Star wars - The Great Sith's war", Initials = "SW" });
            modelBuilder.Entity<Universe>().HasData(new Universe { Id = 6, Name = "Star wars - The old republic", Initials = "SW" });
            modelBuilder.Entity<Universe>().HasData(new Universe { Id = 7, Name = "Warhammer", Initials = "WH" });
            modelBuilder.Entity<Universe>().HasData(new Universe { Id = 8, Name = "Warhammer 40k - Dark Heresy", Initials = "WH" });
        }

        private void AddCharacters(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Character>().HasData(new Character { Id = 1, Name = "Luna", Initials = "LU", UserId = 1 });
            modelBuilder.Entity<Character>().HasData(new Character { Id = 2, Name = "Wrax", Initials = "WR", UserId = 1 });
            modelBuilder.Entity<Character>().HasData(new Character { Id = 3, Name = "Dicham", Initials = "DC", UserId = 1 });
            modelBuilder.Entity<Character>().HasData(new Character { Id = 4, Name = "Rakar", Initials = "RA", UserId = 1 });
            modelBuilder.Entity<Character>().HasData(new Character { Id = 5, Name = "Saud'ho", Initials = "SA", UserId = 1 });
            modelBuilder.Entity<Character>().HasData(new Character { Id = 6, Name = "Xavro", Initials = "XA", UserId = 1 });
        }

        private void AddScenarios(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Scenario>().HasData(
                new Scenario
                {
                    Id = 1,
                    Name = "Dark Heresy",
                    Summary = "Voici le résumé du scénario de Warhammer Dark Heresy...",
                    Goal = "Les personnages devront tenter de survivre le plus longtemps possible à diverses aventures au sein de l'inquisition.",
                    UniverseId = 8,
                    TemplateId = 4,
                    CreationDate = DateTime.Now.AddDays(-10),
                    UpdateDate = DateTime.Now.AddDays(-5),
                    UserId = 1
                }
            );

            modelBuilder.Entity<Scenario>().HasData(
                new Scenario
                {
                    Id = 2,
                    Name = "SW - Le destin d'une galaxie",
                    Summary = "-4000 ans avant la bataille de Yavin 4 et la chute de l'étoile noire, Exar Kun...",
                    Goal = "Révéler certaines vérités et participer aux dénouements de l'époque de près ou de loin.",
                    UniverseId = 5,
                    TemplateId = 3,
                    CreationDate = DateTime.Now.AddDays(-5),
                    UpdateDate = DateTime.Now.AddDays(-2),
                    UserId = 1
                }
            );
        }
    }
}

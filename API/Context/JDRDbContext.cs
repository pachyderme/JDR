using API.Entities;
using API.Entities.Scenario;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Context
{
    public class JDRDbContext: DbContext
    {
        public static string DbConnectionString = "Server=localhost; Database=JDR; Trusted_Connection=True;";

        public JDRDbContext(DbContextOptions<JDRDbContext> options)
            : base(options)
        { }

        public DbSet<Scenario> Scenarios { get; set; }

        public DbSet<Template> Templates { get; set; }

        public DbSet<Universe> Universes { get; set; }

        public DbSet<Character> Characters { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Scenario>()
                .HasMany(s => s.Characters);

            //Templates
            modelBuilder.Entity<Template>().HasData(new Template("None") { Id = 1 });
            modelBuilder.Entity<Template>().HasData(new Template("Linear") { Id = 2 });
            modelBuilder.Entity<Template>().HasData(new Template("Branches") { Id = 3 });
            modelBuilder.Entity<Template>().HasData(new Template("Sandbox") { Id = 4 });
            modelBuilder.Entity<Template>().HasData(new Template("Emerging") { Id = 5 });

            //Universes
            modelBuilder.Entity<Universe>().HasData(new Universe("Dungeons and dragons", "DD") { Id = 1 });
            modelBuilder.Entity<Universe>().HasData(new Universe("Lord of the rings", "LR") { Id = 2 });
            modelBuilder.Entity<Universe>().HasData(new Universe("Star wars - Clone wars", "SW") { Id = 3 });
            modelBuilder.Entity<Universe>().HasData(new Universe("Star wars - Rebels", "SW") { Id = 4 });
            modelBuilder.Entity<Universe>().HasData(new Universe("Star wars - The Great Sith's war", "SW") { Id = 5 });
            modelBuilder.Entity<Universe>().HasData(new Universe("Star wars - The old republic", "SW") { Id = 6 });
            modelBuilder.Entity<Universe>().HasData(new Universe("Warhammer", "WH") { Id = 7 });
            modelBuilder.Entity<Universe>().HasData(new Universe("Warhammer 40k - Dark Heresy", "WH") { Id = 8 });

            //Characters
            modelBuilder.Entity<Character>().HasData(new Character("Luna", "LU") { Id = 1 });
            modelBuilder.Entity<Character>().HasData(new Character("Wrax", "WR") { Id = 2 });
            modelBuilder.Entity<Character>().HasData(new Character("Dicham", "DC") { Id = 3 });
            modelBuilder.Entity<Character>().HasData(new Character("Rakar", "RA") { Id = 4 });
            modelBuilder.Entity<Character>().HasData(new Character("Saud'ho", "SA") { Id = 5 });
            modelBuilder.Entity<Character>().HasData(new Character("Xavro", "XA") { Id = 6 });

            //Scenarios
            modelBuilder.Entity<Scenario>().HasData(new Scenario("Dark Heresy", "Voici le résumé du scénario de Warhammer Dark Heresy...", "Les personnages devront tenter de survivre le plus longtemps possible à diverses aventures au sein de l'inquisition.", 8, 4, DateTime.Now.AddDays(-10), DateTime.Now.AddDays(-5)) { Id = 1 });
            modelBuilder.Entity<Scenario>().HasData(new Scenario("SW - Le destin d'une galaxie", "-4000 ans avant la bataille de Yavin 4 et la chute de l'étoile noire, Exar Kun...", "Révéler certaines vérités et participer aux dénouements de l'époque de près ou de loin.", 5, 3, DateTime.Now.AddDays(-5), DateTime.Now.AddDays(-2)) { Id = 2 });

            base.OnModelCreating(modelBuilder);
        }
    }
}

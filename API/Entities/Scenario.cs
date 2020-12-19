using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Scenario
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(300)]
        public string Name { get; set; }

        [Required]
        [StringLength(1000)]
        public string Summary { get; set; }

        [StringLength(1000)]
        public string Goal { get; set; }

        public string ImageUrl { get; set; }

        [Required]
        public DateTime CreationDate { get; set; }

        public DateTime UpdateDate { get; set; }

        public Universe Universe { get; set; }
        public int UniverseId { get; set; }

        public Template Template { get; set; }
        public int TemplateId { get; set; }

        public User User { get; set; }
        public int UserId { get; set; }

        public List<ScenarioCharacter> ScenarioCharacters { get; set; }
        public List<ScenarioLocation> ScenarioLocations { get; set; }
        public List<ScenarioRessource> ScenarioRessources { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities.Scenario
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

        [ForeignKey("UniverseId")]
        public Universe Universe { get; set; }
        public int UniverseId { get; set; }

        [ForeignKey("TemplateId")]
        public Template Template { get; set; }
        public int TemplateId { get; set; }

        [Required]
        public DateTime CreationDate { get; set; }

        [Required]
        public DateTime LastUpdateDate { get; set; }

        public List<Character> Characters { get; set; }

        public Scenario(string name, string summary, string goal, int universeId, int templateId, DateTime creationDate, DateTime lastUpdateDate)
        {
            Name = name;
            Summary = summary;
            Goal = goal;
            UniverseId = universeId;
            TemplateId = templateId;
            CreationDate = creationDate;
            LastUpdateDate = lastUpdateDate;
        }
    }
}

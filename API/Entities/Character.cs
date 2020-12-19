using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Character
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(300)]
        public string Name { get; set; }

        [Required]
        [StringLength(2)]
        public string Initials { get; set; }

        public string Biography { get; set; }

        public string ImageUrl { get; set; }

        public User User { get; set; }
        public int UserId { get; set; }

        public List<ScenarioCharacter> ScenariosCharacter { get; set; }
    }
}

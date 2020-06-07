using System.ComponentModel.DataAnnotations;

namespace API.Entities.Scenario
{
    public class Universe
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(300)]
        public string Name { get; set; }

        [Required]
        [StringLength(2)]
        public string Initials { get; set; }

        public Universe(string name, string initials)
        {
            Name = name;
            Initials = initials;
        }
    }
}

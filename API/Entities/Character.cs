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

        public Character(string name, string initials)
        {
            Name = name;
            Initials = initials;
        }
    }
}

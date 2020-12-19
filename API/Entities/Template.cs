using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Template
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(300)]
        public string Name { get; set; }
    }
}

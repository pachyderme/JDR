using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(300)]
        public string Identifier { get; set; }

        [Required]
        [StringLength(300)]
        public string Password { get; set; }

        [Required]
        public DateTime CreationDate { get; set; }

        public DateTime UpdateDate { get; set; }

        public List<Character> Characters { get; set; }
        public List<Scenario> Scenarios { get; set; }
    }
}

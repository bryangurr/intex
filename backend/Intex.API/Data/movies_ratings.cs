using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Intex.API.Data
{
    public class movies_ratings
    {
        [Key]
        public int user_id { get; set; }
        //public movies_titles show_id { get; set; }
        public string? show_id { get; set; }
        public int? rating { get; set; }
    }
}

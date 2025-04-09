using System.ComponentModel.DataAnnotations;

namespace Intex.API.Data
{
    public class Recommendations
    {
        [Key]
        public int show_id { get; set; }
        public string? recommended_show_ids { get; set; }
    }
}

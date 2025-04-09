using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Intex.API.Data
{
    [Keyless]
    public class user_recommendations
    {
        public int user_id { get; set; }
        public string? list_type { get; set; }
        public string? recommended_show_ids { get; set; }
    }
}

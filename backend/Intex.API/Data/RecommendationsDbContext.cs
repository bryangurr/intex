using Microsoft.EntityFrameworkCore;

namespace Intex.API.Data
{
    public class RecommendationsDbContext : DbContext
    {
        public RecommendationsDbContext(DbContextOptions<RecommendationsDbContext> options) : base(options)
        {
        }
        public DbSet<recommendations> recommendations { get; set; }
       
    }
}

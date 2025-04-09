using Microsoft.EntityFrameworkCore;

namespace Intex.API.Data
{
    public class UserRecommendationsDbContext : DbContext
    {
        public UserRecommendationsDbContext(DbContextOptions<UserRecommendationsDbContext> options) : base(options)
        {
        }
        public DbSet<user_recommendations> user_recommendations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<user_recommendations>().HasNoKey(); // <- critical
        }
    }
}

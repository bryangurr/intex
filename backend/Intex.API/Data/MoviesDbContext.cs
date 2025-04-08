using Microsoft.EntityFrameworkCore;

namespace Intex.API.Data
{
    public class MoviesDbContext : DbContext
    {
        public MoviesDbContext(DbContextOptions<MoviesDbContext> options) : base(options)
        {
        }
        public DbSet<movies_titles> movies_titles { get; set; }
        public DbSet<movies_users> movies_users { get; set; }
        public DbSet<movies_ratings> movies_ratings { get; set; }
    }
}

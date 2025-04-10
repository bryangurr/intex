using Microsoft.AspNetCore.Identity;
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

        public DbSet<IdentityUser> Users { get; set; }
        public DbSet<IdentityRole> Roles { get; set; }
        public DbSet<IdentityUserRole<string>> UserRoles { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Explicitly map Identity tables to real table names in the DB
            modelBuilder.Entity<IdentityUser>().ToTable("AspNetUsers");
            modelBuilder.Entity<IdentityRole>().ToTable("AspNetRoles");
            modelBuilder.Entity<IdentityUserRole<string>>().ToTable("AspNetUserRoles").HasNoKey();
        }




    }
}

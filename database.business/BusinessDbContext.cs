using domain.business.Entities.WorkingTimes;
using domain.business.Entities.Projects;
using Microsoft.EntityFrameworkCore;
using database.business.TableMaps.WorkingTimes;
using database.business.TableMaps.Projects;
using database.business.TableMaps;

namespace database.business
{
    public class BusinessDbContext : DbContext
    {
        public DbSet<WorkingTime> WorkingTimes { get; set; }
        public DbSet<Project> Projects { get; set; }

        public BusinessDbContext() { }

        public BusinessDbContext(DbContextOptions<BusinessDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=78.152.175.67;Initial Catalog=businessdb;Integrated Security=False;User ID=ef_migrator;Password=Grimm_jow92;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.AddConfiguration(new ProjectMap());
            modelBuilder.AddConfiguration(new WorkingTimeMap());
        }
    }
}

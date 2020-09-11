using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace database.business.TableMaps
{
    public abstract class EntityTypeConfiguration<TEntity> where TEntity : class
    {
        public abstract void Map(EntityTypeBuilder<TEntity> builder);
    }
}

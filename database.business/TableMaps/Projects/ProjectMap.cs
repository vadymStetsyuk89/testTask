using domain.business.Entities.Projects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace database.business.TableMaps.Projects
{
    class ProjectMap : EntityBaseMap<Project>
    {
        public override void Map(EntityTypeBuilder<Project> entity)
        {
            base.Map(entity);
         
            entity.ToTable("Projects");
        }
    }
}

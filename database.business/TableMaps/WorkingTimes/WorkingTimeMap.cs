using domain.business.Entities.WorkingTimes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace database.business.TableMaps.WorkingTimes
{
    class WorkingTimeMap : EntityBaseMap<WorkingTime>
    {
        public override void Map(EntityTypeBuilder<WorkingTime> entity)
        {
            base.Map(entity);

            entity.ToTable("WorkingTimes");

            entity.HasOne(x => x.Project)
                .WithMany(x => x.WorkingTimes)
                .HasForeignKey(x => x.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

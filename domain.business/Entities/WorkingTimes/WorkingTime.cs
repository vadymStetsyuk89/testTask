using domain.business.Entities.Projects;
using System;

namespace domain.business.Entities.WorkingTimes
{
    public class WorkingTime : EntityBaseNamed
    {
        public DateTime StartedAt { get; set; }
        public DateTime EndedAt { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }
    }
}

using System.Collections.Generic;
using domain.business.Entities.WorkingTimes;

namespace domain.business.Entities.Projects
{
    public class Project : EntityBaseNamed
    {
        public string CustomerName { get; set; }

        public decimal Rate { get; set; }

        public ICollection<WorkingTime> WorkingTimes { get; set; }
    }
}

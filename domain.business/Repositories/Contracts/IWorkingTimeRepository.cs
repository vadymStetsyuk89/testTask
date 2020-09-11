using domain.business.Entities.WorkingTimes;

namespace domain.business.Repositories.Contracts
{
    public interface IWorkingTimeRepository
    {
        int CreateTime(WorkingTime workingTime);
        void UpdateTime(WorkingTime workingTime);
    }
}

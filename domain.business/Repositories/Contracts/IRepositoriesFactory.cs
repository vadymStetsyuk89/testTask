using System.Data;

namespace domain.business.Repositories.Contracts
{
    public interface IRepositoriesFactory
    {
        IProjectRepository GetProjectRepository(IDbConnection connection);
        IWorkingTimeRepository GetWorkingTimeRepository(IDbConnection connection);
    }
}

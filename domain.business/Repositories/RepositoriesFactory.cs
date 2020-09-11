using domain.business.Repositories.Contracts;
using System.Data;

namespace domain.business.Repositories
{
    public class RepositoriesFactory : IRepositoriesFactory
    {
        public IProjectRepository GetProjectRepository(IDbConnection connection)
        {
            return new ProjectRepository(connection);
        }

        public IWorkingTimeRepository GetWorkingTimeRepository(IDbConnection connection)
        {
            return new WorkingTimeRepository(connection);
        }
    }
}

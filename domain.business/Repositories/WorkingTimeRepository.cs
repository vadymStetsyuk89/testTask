using domain.business.Repositories.Contracts;
using System.Data;

namespace domain.business.Repositories
{
    class WorkingTimeRepository : IWorkingTimeRepository
    {
        private IDbConnection _connection;

        public WorkingTimeRepository(IDbConnection connection)
        {
            this._connection = connection;
        }
    }
}

using Dapper;
using domain.business.Entities.WorkingTimes;
using domain.business.Repositories.Contracts;
using System.Data;

namespace domain.business.Repositories
{
    class WorkingTimeRepository : IWorkingTimeRepository
    {
        #region Queries

        string createQuery =
@"INSERT INTO [WorkingTimes]([IsDeleted],[Created],[Name],[Description],[StartedAt],[EndedAt],[ProjectId])
VALUES(0,GETUTCDATE(),@Name,@Description,@StartedAt,@EndedAt,@ProjectId);
SELECT SCOPE_IDENTITY()";

        string updateQuery =
@"UPDATE [WorkingTimes] SET 
[IsDeleted]=@IsDeleted
,[LastModified]=GETUTCDATE()
,[Name]=@Name
,[Description]=@Description
,[StartedAt]=@StartedAt
,[EndedAt]=@EndedAt
,[ProjectId]=@ProjectId";

        #endregion

        private IDbConnection _connection;

        public WorkingTimeRepository(IDbConnection connection)
        {
            this._connection = connection;
        }

        public int CreateTime(WorkingTime workingTime) =>
            _connection.QuerySingle<int>(createQuery, workingTime);

        public void UpdateTime(WorkingTime workingTime) =>
            _connection.Execute(updateQuery, workingTime);
    }
}

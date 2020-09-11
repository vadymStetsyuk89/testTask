using Dapper;
using domain.business.Entities.Projects;
using domain.business.Entities.WorkingTimes;
using domain.business.Repositories.Contracts;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace domain.business.Repositories
{
    class ProjectRepository : IProjectRepository
    {
        #region Queries

        string getAllQuery =
@"SELECT [Projects].*, [WorkingTimes].*
FROM [Projects]
LEFT JOIN [WorkingTimes] ON [Projects].Id = [WorkingTimes].ProjectId
WHERE [Projects].IsDeleted = 0";

        string createQuery =
@"INSERT INTO [Projects]
([IsDeleted],[Created],[Name],[Description],[CustomerName],[Rate])
VALUES(0,GETUTCDATE(),@Name,@Description,@CustomerName,@Rate);
SELECT SCOPE_IDENTITY()";

        string updateQuery =
@"UPDATE [Projects] SET 
[IsDeleted]=@IsDeleted,
[LastModified]=GETUTCDATE(),
[Name]=@Name,
[Description]=@Description,
[CustomerName]=@CustomerName,
[Rate]=@Rate 
WHERE [Projects].Id = @Id";

        #endregion

        private IDbConnection _connection;

        public ProjectRepository(IDbConnection connection)
        {
            this._connection = connection;
        }

        public int CreateProject(Project project) =>
            _connection.QuerySingle<int>(createQuery, project);

        public IEnumerable<Project> GetAllProjects()
        {
            List<Project> results = new List<Project>();

            _connection.Query<Project, WorkingTime, Project>(
                getAllQuery,
                (project, time) =>
                {
                    if (results.Any(x => x.Id == project.Id))
                        project = results.First(x => x.Id == project.Id);
                    else
                        results.Add(project);

                    if (time != null)
                    {
                        project.WorkingTimes.Add(time);
                    }

                    return project;
                })
                .ToList();

            return results;
        }

        public Project GetProject(int id)
        {
            Project result = null;

            _connection.Query<Project, WorkingTime, Project>(
                getAllQuery + " AND [Projects].Id = @Id",
                (project, time) =>
                {
                    if (result == null)
                    {
                        result = project;
                    }
                    result.WorkingTimes.Add(time);

                    return project;
                },
                new { Id = id })
                .ToList();

            return result;
        }

        public void UpdateProject(Project project) =>
            _connection.Execute(updateQuery, project);
    }
}

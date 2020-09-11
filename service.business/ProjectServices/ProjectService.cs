﻿using domain.business.DbConnectionFactory;
using domain.business.Entities.Projects;
using domain.business.Repositories.Contracts;
using service.business.ProjectServices.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace service.business.ProjectServices
{
    public class ProjectService : IProjectService
    {
        private readonly IDbConnectionFactory _connectionFactory;
        private readonly IRepositoriesFactory _repositoriesFactory;

        public ProjectService(IDbConnectionFactory connectionFactory, IRepositoriesFactory repositoriesFactory)
        {
            _connectionFactory = connectionFactory;
            _repositoriesFactory = repositoriesFactory;
        }

        public Task<Project> CreateProject(Project project) =>
            Task.Run(() =>
            {
                using (var connection = _connectionFactory.NewSqlConnection())
                {
                    IProjectRepository projRepository = _repositoriesFactory.GetProjectRepository(connection);
                    IWorkingTimeRepository timeRepository = _repositoriesFactory.GetWorkingTimeRepository(connection);

                    project.Id = projRepository.CreateProject(project);

                    foreach (var time in project.WorkingTimes)
                    {
                        //TODO: 
                    }

                    return projRepository.GetProject(project.Id);
                }
            });

        public Task<Project> DeleteProject(int projectId) =>
            Task.Run(() =>
            {
                using (var connection = _connectionFactory.NewSqlConnection())
                {
                    IProjectRepository projRepository = _repositoriesFactory.GetProjectRepository(connection);

                    Project proj = projRepository.GetProject(projectId);
                    
                    proj.IsDeleted = true;

                    projRepository.UpdateProject(proj);

                    return proj;
                }
            });

        public Task<Project> GetProject(int projectId) =>
            Task.Run(() =>
            {
                using (var connection = _connectionFactory.NewSqlConnection())
                {
                    return _repositoriesFactory
                        .GetProjectRepository(connection)
                        .GetProject(projectId);
                }
            });

        public Task<IEnumerable<Project>> GetProjects() =>
            Task.Run(() =>
            {
                using (var connection = _connectionFactory.NewSqlConnection())
                {
                    IProjectRepository projRepository = _repositoriesFactory.GetProjectRepository(connection);
                    IWorkingTimeRepository timeRepository = _repositoriesFactory.GetWorkingTimeRepository(connection);

                    IEnumerable<Project> results = projRepository.GetAllProjects();

                    return results;
                }
            });

        public Task<Project> UpdateProject(Project project) =>
            Task.Run(() =>
            {
                using (var connection = _connectionFactory.NewSqlConnection())
                {
                    project.IsDeleted = true;

                    _repositoriesFactory
                        .GetProjectRepository(connection)
                        .UpdateProject(project);

                    return project;
                }
            });
    }
}

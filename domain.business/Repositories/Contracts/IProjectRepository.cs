using domain.business.Entities.Projects;
using System.Collections.Generic;

namespace domain.business.Repositories.Contracts
{
    public interface IProjectRepository
    {
        IEnumerable<Project> GetAllProjects();
        Project GetProject(int id);
        int CreateProject(Project project);
        void UpdateProject(Project project);
    }
}

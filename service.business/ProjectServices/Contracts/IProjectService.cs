using domain.business.Entities.Projects;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace service.business.ProjectServices.Contracts
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> GetProjects();
        Task<Project> GetProject(int projectId);
        Task<Project> CreateProject(Project project);
        Task<Project> UpdateProject(Project project);
        Task<Project> DeleteProject(int projectId);
    }
}

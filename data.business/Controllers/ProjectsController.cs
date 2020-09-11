using common.business.ResponseBuilder.Contracts;
using common.business.WebApi;
using common.business.WebApi.RoutingConfiguration;
using domain.business.Entities.Projects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Serilog;
using service.business.ProjectServices.Contracts;
using System;
using System.Net;
using System.Threading.Tasks;

namespace data.business.Controllers
{
    [AllowAnonymous]
    [AssignControllerRoute(WebApiEnvironmnet.Current, WebApiVersion.ApiVersion1, ApplicationSegments.PROJECTS)]
    public class ProjectsController : WebApiControllerBase
    {
        private IProjectService _projectService;

        public ProjectsController(IProjectService projectService,
            IResponseFactory responseFactory, IStringLocalizer<ProjectsController> localizer)
            : base(responseFactory, localizer)
        {
            _projectService = projectService;
        }

        [HttpGet]
        [AssignActionRoute(ProjectSegments.GET_ALL)]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(SuccessResponseBody(await _projectService.GetProjects(), Localizer["All projects"]));
            }
            catch (Exception exc)
            {
                Log.Error(exc.Message);
                return BadRequest(ErrorResponseBody(exc.Message, HttpStatusCode.BadRequest));
            }
        }

        [HttpPost]
        [AssignActionRoute(ProjectSegments.CREATE_PROJECT)]
        public async Task<IActionResult> Create([FromBody] Project project)
        {
            try
            {
                return Ok(SuccessResponseBody(await _projectService.CreateProject(project), Localizer["Created"]));
            }
            catch (Exception exc)
            {
                Log.Error(exc.Message);
                return BadRequest(ErrorResponseBody(exc.Message, HttpStatusCode.BadRequest));
            }
        }

        [HttpPut]
        [AssignActionRoute(ProjectSegments.UPDATE_PROJECT)]
        public async Task<IActionResult> Update([FromBody] Project project)
        {
            try
            {
                return Ok(SuccessResponseBody(await _projectService.UpdateProject(project), Localizer["Updated"]));
            }
            catch (Exception exc)
            {
                Log.Error(exc.Message);
                return BadRequest(ErrorResponseBody(exc.Message, HttpStatusCode.BadRequest));
            }
        }

        [HttpDelete]
        [AssignActionRoute(ProjectSegments.DELETE_PROJECT)]
        public async Task<IActionResult> Delete([FromQuery] int projectId)
        {
            try
            {
                return Ok(SuccessResponseBody(await _projectService.DeleteProject(projectId), Localizer["Updated"]));
            }
            catch (Exception exc)
            {
                Log.Error(exc.Message);
                return BadRequest(ErrorResponseBody(exc.Message, HttpStatusCode.BadRequest));
            }
        }
    }
}

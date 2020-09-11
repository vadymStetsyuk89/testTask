using System;

namespace common.business.WebApi {
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
    public class AssignControllerRouteAttribute : BaseAssignControllerRouteAttribute {
        public AssignControllerRouteAttribute(string environment, int version, string template) :
            base(environment, version, $"{environment}/{BuildRouteVersion(version)}/{template}") { }
    }
}

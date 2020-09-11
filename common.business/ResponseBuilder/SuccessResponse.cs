using common.business.ResponseBuilder.Contracts;
using System.Net;

namespace common.business.ResponseBuilder
{
    public class SuccessResponse : IWebResponse
    {
        public object Body { get; set; }

        public string Message { get; set; }

        public HttpStatusCode StatusCode { get; set; }
    }
}

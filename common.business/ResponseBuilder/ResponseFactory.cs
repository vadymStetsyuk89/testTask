using common.business.Common.ResponseBuilder;
using common.business.ResponseBuilder.Contracts;

namespace common.business.ResponseBuilder
{
    public class ResponseFactory : IResponseFactory
    {
        public IWebResponse GetSuccessReponse()
        {
            return new SuccessResponse();
        }

        public IWebResponse GetErrorResponse()
        {
            return new ErrorResponse();
        }
    }
}

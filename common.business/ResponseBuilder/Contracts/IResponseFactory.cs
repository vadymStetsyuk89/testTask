namespace common.business.ResponseBuilder.Contracts
{
    public interface IResponseFactory
    {
        IWebResponse GetSuccessReponse();

        IWebResponse GetErrorResponse();
    }
}

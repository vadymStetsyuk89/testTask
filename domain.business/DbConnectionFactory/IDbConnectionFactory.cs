using System.Data;

namespace domain.business.DbConnectionFactory
{
    public interface IDbConnectionFactory
    {
        IDbConnection NewSqlConnection();
    }
}

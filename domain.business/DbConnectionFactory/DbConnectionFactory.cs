using common.business;
using System.Data;
using System.Data.SqlClient;

namespace domain.business.DbConnectionFactory
{
    public class DbConnectionFactory : IDbConnectionFactory
    {
        public IDbConnection NewSqlConnection()
        {
            return new SqlConnection(ConfigurationManager.DatabaseConnectionString);
        }
    }
}

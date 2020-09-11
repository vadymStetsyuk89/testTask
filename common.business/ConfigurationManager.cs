using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace common.business
{
    public class ConfigurationManager
    {
        private static string _databaseConnectionString;

        private static string _rootDirectoryPath;

        public static void SetAppSettingsProperties(IConfiguration configuration)
        {
            _databaseConnectionString = configuration.GetConnectionString(ConnectionStringNames.DefaultConnection);
        }

        public static string DatabaseConnectionString => _databaseConnectionString;

        public static string LogDirectoryPath => Path.Combine(_rootDirectoryPath, "logs");
    }
}

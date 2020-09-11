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

        private static string _uploadingsDirectoryPath;

        private static string _uploadingDirectoryName;

        public static void SetAppSettingsProperties(IConfiguration configuration)
        {

            _databaseConnectionString = configuration.GetConnectionString(ConnectionStringNames.DefaultConnection);

            _uploadingDirectoryName = configuration.GetSection("ApplicationSettings")["FilesUploadDirectory"];
        }

        public static void SetContentRootDirectoryPath(string path)
        {
            _rootDirectoryPath = path;

            _uploadingsDirectoryPath = Path.Combine(_rootDirectoryPath, _uploadingDirectoryName);

            if (!Directory.Exists(ExportDirectoryPath)) Directory.CreateDirectory(ExportDirectoryPath);

            if (!Directory.Exists(_uploadingsDirectoryPath)) Directory.CreateDirectory(_uploadingsDirectoryPath);
        }

        public static string DatabaseConnectionString => _databaseConnectionString;

        public static string ContentRootPath => _rootDirectoryPath;

        public static string UploadsPath => _uploadingsDirectoryPath;

        public static string UploadsDirectoryName => _uploadingDirectoryName;

        public static string LogDirectoryPath => Path.Combine(_rootDirectoryPath, "logs");

        public static string ExportDirectoryPath => Path.Combine(_rootDirectoryPath, "exports");
    }
}

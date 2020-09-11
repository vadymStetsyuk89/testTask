using common.business;
using common.business.ResponseBuilder;
using common.business.ResponseBuilder.Contracts;
using domain.business.DbConnectionFactory;
using domain.business.Repositories;
using domain.business.Repositories.Contracts;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Formatting.Json;
using service.business.ProjectServices;
using service.business.ProjectServices.Contracts;

namespace data.business
{
    public class Startup {
        private readonly IWebHostEnvironment _environment;

        public IConfiguration Configuration { get; private set; }

        public Startup(IWebHostEnvironment env)
        {
            IConfigurationBuilder builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath);

            env.EnvironmentName = "Development";

            builder.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);
            builder.AddEnvironmentVariables();

            Configuration = builder.Build();

            ConfigurationManager.SetAppSettingsProperties(Configuration);

            _environment = env;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    t => t.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            services.AddLocalization(options => { options.ResourcesPath = "Resources"; });

            services.AddControllers();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });
            
            // Repositories and factories
            services.AddScoped<IResponseFactory, ResponseFactory>();
            services.AddScoped<IDbConnectionFactory, DbConnectionFactory>();
            services.AddScoped<IRepositoriesFactory, RepositoriesFactory>();

            // Services
            services.AddScoped<IProjectService, ProjectService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            LoggerConfiguration logger = new LoggerConfiguration();
            logger.Enrich.FromLogContext()
                .MinimumLevel.Information()
                .WriteTo.File(new JsonFormatter(), "logs\\devInfo.json");

            Log.Logger = logger.CreateLogger();

            // app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            
            app.UseCors("CorsPolicy");

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa => {
                spa.Options.SourcePath = "ClientApp/build";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
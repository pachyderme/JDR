using API.Context;
using API.GraphQL.Schemas;
using API.Repositories;
using AutoMapper;
using GraphQL;
using GraphQL.Server;
using GraphQL.Server.Ui.Playground;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            // TUTO : https://volosoft.com/blog/Building-GraphQL-APIs-with-ASP.NET-Core
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddDbContext<JDRDbContext>(options => options.UseSqlServer(JDRDbContext.DbConnectionString));
            services.AddTransient<ScenarioRepository>();

            // GraphQL
            services.AddScoped<IDependencyResolver>(x =>
                new FuncDependencyResolver(x.GetRequiredService));
            services.AddScoped<ScenarioSchema>();

            services.AddGraphQL(x =>
            {
                x.ExposeExceptions = true; //set true only in development mode. make it switchable.
            })
            .AddGraphTypes(ServiceLifetime.Scoped)
            .AddUserContextBuilder(httpContext => httpContext.User)
            .AddDataLoader();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseGraphQL<ScenarioSchema>();
            app.UseGraphQLPlayground(new GraphQLPlaygroundOptions());  //to explorer API navigate https://*DOMAIN*/ui/playground 

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
            app.UseHttpsRedirection();
            InitializeMapper();
        }

        private static void InitializeMapper()
        {
            //Mapper.Initialize(x =>
            //{
            //    x.CreateMap<Guest, GuestModel>();
            //    x.CreateMap<Room, RoomModel>();
            //    x.CreateMap<Reservation, ReservationModel>();
            //});
        }
    }
}

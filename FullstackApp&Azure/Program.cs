
using FullstackApp_Azure.Data;
using FullstackApp_Azure.Middleware;
using FullstackApp_Azure.Repositories;
using FullstackApp_Azure.Repositories.IRepository;
using FullstackApp_Azure.Services;
using FullstackApp_Azure.Services.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

namespace FullstackApp_Azure
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            builder.Services.AddDbContext<SubscriptionDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            // Added to service container
            builder.Services.AddScoped<ISubscriptionRepository, SubscriptionRepository>();
            builder.Services.AddScoped<ISubscriptionService, SubscriptionService>();
            
            builder.Services.AddIdentityApiEndpoints<IdentityUser>(options =>
                {
                    options.User.RequireUniqueEmail = true; // Require unique emails for identity email/login
                })
                .AddEntityFrameworkStores<SubscriptionDbContext>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
            
            var app = builder.Build();

            app.UseMiddleware<GlobalExceptionMiddleware>();
            
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.MapScalarApiReference();
            }

            app.UseHttpsRedirection();

            app.UseCors("CorsPolicy");
            
            app.UseAuthentication(); // who are you?
            app.UseAuthorization();  // are you allowed?
            
            app.MapIdentityApi<IdentityUser>(); // auto-generates /register, /login, /logout 

            app.MapControllers();

            app.Run();
        }
    }
}

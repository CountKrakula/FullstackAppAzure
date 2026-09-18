
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
            builder.Services.AddScoped<ICategoryService, CategoryService>();
            builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

            builder.Services.AddIdentityApiEndpoints<IdentityUser>(options =>
                {
                    options.User.RequireUniqueEmail = true; // Require unique emails for identity email/login
                })
                .AddEntityFrameworkStores<SubscriptionDbContext>();

           
                builder.Services.ConfigureApplicationCookie(option =>
                {
                    option.Cookie.SameSite = SameSiteMode.None;
                    option.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                });
            

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.WithOrigins("http://localhost:5173", 
                            "https://subscriptionappfrontend-faa4c6h0ddgcghak.norwayeast-01.azurewebsites.net")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });
            
            var app = builder.Build();

            app.UseMiddleware<GlobalExceptionMiddleware>();
            
            app.MapOpenApi();
            app.MapScalarApiReference();
            
            app.UseHttpsRedirection();

            app.UseCors("CorsPolicy");
            
            app.UseAuthentication(); // who are you?
            app.UseAuthorization();  // are you allowed?

            var api = app.MapGroup("/api");
            
            api.MapIdentityApi<IdentityUser>(); // auto-generates /register, /login

            // MapIdentityApi doesn't provide a /logout endpoint out of the box,
            // so this manually signs the user out and clears their auth cookie
            api.MapPost("/logout", async (SignInManager<IdentityUser> signInManager) =>
            {
                await signInManager.SignOutAsync();
                return Results.Ok();
            }).RequireAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}

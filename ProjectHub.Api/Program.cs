using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProjectHub.Api.Data.Context;
using ProjectHub.Api.Data.Interfaces;
using ProjectHub.Api.Helpers;
using ProjectHub.Api.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure DbContext with SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer("Server=NEZAM\\NEZAMSQL;Database=ProjectHub_DB;Integrated Security=true;TrustServerCertificate=True")
           .EnableSensitiveDataLogging()
           .LogTo(Console.WriteLine, LogLevel.Information);
});

// Add JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;  // Disable HTTPS requirement for local dev
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],   // Issuer from configuration
            ValidAudience = builder.Configuration["Jwt:Audience"], // Audience from configuration
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])) // Key from configuration
        };

        // Debugging events
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                Console.WriteLine("Authentication failed: " + context.Exception.Message);
                return Task.CompletedTask;
            },
            OnTokenValidated = context =>
            {
                Console.WriteLine("Token validated successfully.");
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:8080") // UI React شما
                  .AllowAnyHeader() // اجازه هر هدر
                  .AllowAnyMethod() // اجازه هر متد (GET, POST, PUT, DELETE)
                  .AllowCredentials(); // اجازه ارسال credentials مثل کوکی‌ها
        });
});

builder.Services.AddControllers();

// Add the app services (repositories, etc.)
builder.Services.AddScoped<JwtTokenHelper>();

builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPriorityRepository, PriorityRepository>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IStatusRepository, StatusRepository>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();

var app = builder.Build();
app.UseCors("AllowReactApp");

// Enable Swagger UI in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Map UserController endpoints here
app.MapGet("/users", async (IUserRepository userRepository) =>
{
    var users = await userRepository.GetAllUsers();
    return users;
})
.WithName("GetUsers")
.WithOpenApi();
app.UseHttpsRedirection();

app.MapControllers();
// Run the app
app.Run();

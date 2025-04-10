using Microsoft.EntityFrameworkCore;

using Funeral.Data;
using Funeral.Services;
using Funeral.Data.DataAccess;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();  // Support for API controllers
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// AppDbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Dependency Injection for Data Access
builder.Services.AddScoped<ICompanyDataAccess, CompanyDataAccess>();
builder.Services.AddScoped<IBranchDataAccess, BranchDataAccess>();

// Dependency Injection for Services
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<IBranchService, BranchService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();

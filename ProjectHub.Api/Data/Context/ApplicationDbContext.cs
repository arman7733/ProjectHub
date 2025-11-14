using Microsoft.EntityFrameworkCore;
using ProjectHub.Api.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace ProjectHub.Api.Data.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Models.Task> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasOne<Role>()
                .WithMany()
                .HasForeignKey("RoleId")
                .OnDelete(DeleteBehavior.Restrict);                    
    
            modelBuilder.Entity<Project>()
                .HasOne<Status>()
                .WithMany()
                .HasForeignKey("StatusId")
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Project>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey("ManagerId")
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<Models.Task>()
                .HasOne<Status>()
                .WithMany()
                .HasForeignKey("StatusId")
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Models.Task>()
                .HasOne<Priority>()
                .WithMany()
                .HasForeignKey("PriorityId")
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Project>()
                .HasMany<Models.Task>()             
                .WithOne()             
                .HasForeignKey(t => t.ProjectId)    
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Models.Task>()
                .HasOne<User>()           
                .WithMany()                          
                .HasForeignKey(t => t.AssigneeId)    
                .OnDelete(DeleteBehavior.SetNull);  
        }
    }
}

using FullstackApp_Azure.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace FullstackApp_Azure.Data
{
    public class SubscriptionDbContext : IdentityDbContext<IdentityUser>
    {
        public SubscriptionDbContext(DbContextOptions<SubscriptionDbContext> options) : base(options)
        {
            
        }

        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<PaymentHistory> PaymentHistories { get; set; }
    }
}



using FullstackApp_Azure.Models;
using Microsoft.EntityFrameworkCore;

namespace FullstackApp_Azure.Data
{
    public class SubscriptionDbContext : DbContext
    {
        public SubscriptionDbContext(DbContextOptions<SubscriptionDbContext> options) : base(options)
        {
            
        }

        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<PaymentHistory> PaymentHistories { get; set; }
    }
}



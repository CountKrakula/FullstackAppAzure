using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace FullstackApp_Azure.Models
{
    [Index(nameof(Name))] // Index the Name column
    public class Subscription
    {
        public int Id { get; set; } // Subscription ID 
        
        [Required]
        public string UserId { get; set; } // This will be used to filter on users
        
      
        public string Name { get; set; }

        public decimal Cost { get; set; }

        public int CategoryId { get; set; }

        public BillingIntervalType BillingInterval { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly? EndDate { get; set;  }
        public bool IsActive { get; set; }
        public DateOnly NextBillingDate { get; set; }

        public Category Category { get; set; }

        // 1 to many relationship, 1 subscription has many payments 
        public ICollection<PaymentHistory> PaymentHistories { get; set; }
    }
}

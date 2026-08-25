using FullstackApp_Azure.Models;

namespace FullstackApp_Azure.DTOs;

public class SubscriptionDTO
{
    public int Id { get; set; }
    public string Name { get; set; }

    public decimal Cost { get; set; }

    public int CategoryId { get; set; }
    
    public BillingIntervalType BillingInterval { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set;  }
    public bool IsActive { get; set; }
    public DateOnly NextBillingDate { get; set; }

}
using System.ComponentModel.DataAnnotations;
using FullstackApp_Azure.Models;

namespace FullstackApp_Azure.DTOs;

public class UpdateSubscriptionDTO
{
    [Required] // No empty strings
    [StringLength(100, MinimumLength = 2, ErrorMessage = "String must be between 2 and 100 characters in length.")]
    public string Name { get; set; }
    
    [Range(0, 2999, ErrorMessage ="Cost must be positive")]
    public decimal Cost { get; set; }
    
    public int CategoryId { get; set; }
    public BillingIntervalType BillingInterval { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly? EndDate { get; set;  } // A subscription might not have ended yet
    public bool IsActive { get; set; }
    public DateOnly NextBillingDate { get; set; }
}
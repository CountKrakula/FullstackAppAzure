using FullstackApp_Azure.DTOs;

namespace FullstackApp_Azure.Services.IServices;

public interface ISubscriptionService
{
    Task<List<SubscriptionDTO>> GetSubscriptions();
    Task<SubscriptionDTO> GetSubscriptionById(int id);
    
    Task<SubscriptionDTO> CreateSubscription(CreateSubscriptionDTO newSubscription);
    Task<bool> UpdateSubscription(int id, UpdateSubscriptionDTO subscription); // Update and Delete just needs to report success/failure, nothing to return
    Task<bool> DeleteSubscription(int id);
    
}
using FullstackApp_Azure.DTOs;

namespace FullstackApp_Azure.Services.IServices;

public interface ISubscriptionService
{
    Task<List<SubscriptionDTO>> GetSubscriptions(string userId);
    Task<SubscriptionDTO> GetSubscriptionById(int id, string userId);

    Task<SubscriptionDTO> CreateSubscription(CreateSubscriptionDTO newSubscription, string userId);
    Task<bool> UpdateSubscription(int id, UpdateSubscriptionDTO subscription, string userId); // Update and Delete just needs to report success/failure, nothing to return
    Task<bool> DeleteSubscription(int id, string userId);
    
}
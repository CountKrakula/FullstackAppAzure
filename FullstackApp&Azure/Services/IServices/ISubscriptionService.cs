using FullstackApp_Azure.DTOs;

namespace FullstackApp_Azure.Services.IServices;

public interface ISubscriptionService
{
    Task<List<SubscriptionDTO>> GetSubscriptions();
    Task<SubscriptionDTO> GetSubscriptionById(int id);
    
}
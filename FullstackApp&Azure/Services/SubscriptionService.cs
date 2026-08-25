using FullstackApp_Azure.DTOs;
using FullstackApp_Azure.Repositories.IRepository;
using FullstackApp_Azure.Services.IServices;

namespace FullstackApp_Azure.Services;

public class SubscriptionService : ISubscriptionService
{
    private ISubscriptionRepository _subscriptionRepository;
    
    public SubscriptionService(ISubscriptionRepository subscriptionRepository)
    {
        _subscriptionRepository =  subscriptionRepository;
    }
    
    public async Task<List<SubscriptionDTO>> GetSubscriptions()
    {
        var subscriptions = await _subscriptionRepository.GetSubscriptions();
        
        return subscriptions.Select(s => new SubscriptionDTO
        {
            Id = s.Id,
            Name = s.Name,
            Cost = s.Cost,
            CategoryId = s.CategoryId,
            BillingInterval = s.BillingInterval,
            StartDate = s.StartDate,
            EndDate = s.EndDate,
            IsActive = s.IsActive,
            NextBillingDate = s.NextBillingDate

        }).ToList();
    }
    
    public async Task<SubscriptionDTO> GetSubscriptionById(int id)
    {
        var subscription = await _subscriptionRepository.GetSubscriptionById(id);

        if (subscription == null)
            return null;

        return new SubscriptionDTO
        {
            Id = subscription.Id,
            Name = subscription.Name,
            Cost = subscription.Cost,
            CategoryId = subscription.CategoryId,
            BillingInterval = subscription.BillingInterval,
            StartDate = subscription.StartDate,
            EndDate = subscription.EndDate,
            IsActive = subscription.IsActive,
            NextBillingDate = subscription.NextBillingDate
        };
    }
}
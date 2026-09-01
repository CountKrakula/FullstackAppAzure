using FullstackApp_Azure.DTOs;
using FullstackApp_Azure.Models;
using FullstackApp_Azure.Repositories.IRepository;
using FullstackApp_Azure.Services.IServices;

namespace FullstackApp_Azure.Services;

public class SubscriptionService : ISubscriptionService
{
    private readonly ISubscriptionRepository _subscriptionRepository;
    
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

    public async Task<SubscriptionDTO> CreateSubscription(CreateSubscriptionDTO newSubscription)
    {
        var subscription = new Subscription
        {
            Name = newSubscription.Name,
            Cost = newSubscription.Cost,
            CategoryId = newSubscription.CategoryId,
            BillingInterval = newSubscription.BillingInterval,
            StartDate = newSubscription.StartDate,
            EndDate = newSubscription.EndDate,
            IsActive = newSubscription.IsActive,
            NextBillingDate = newSubscription.NextBillingDate
        };
        
        var createdSubscription = await _subscriptionRepository.CreateSubscription(subscription);

        return new SubscriptionDTO()
        {
            Id = createdSubscription.Id,
            Name = createdSubscription.Name,
            Cost = createdSubscription.Cost,
            CategoryId = createdSubscription.CategoryId,
            BillingInterval = createdSubscription.BillingInterval,
            StartDate = createdSubscription.StartDate,
            EndDate = createdSubscription.EndDate,
            IsActive = createdSubscription.IsActive,
            NextBillingDate = createdSubscription.NextBillingDate
        };
    }

    public Task<bool> UpdateSubscription(int id, UpdateSubscriptionDTO subscription)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteSubscription(int id)
    {
        throw new NotImplementedException();
    }
}
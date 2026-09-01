using FullstackApp_Azure.Models;

namespace FullstackApp_Azure.Repositories.IRepository;

public interface ISubscriptionRepository
{
    Task <Subscription> GetSubscriptionById(int id);
    Task <List<Subscription>> GetSubscriptions();
    Task<Subscription> CreateSubscription(Subscription newSubscription); // Repository talks only to database, it knows database entities and not DTOs
    Task<bool> UpdateSubscription(Subscription subscription);
    Task<bool> DeleteSubscription(int subscriptionId);
}
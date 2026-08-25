using FullstackApp_Azure.Models;

namespace FullstackApp_Azure.Repositories.IRepository;

public interface ISubscriptionRepository
{
    Task <Subscription> GetSubscriptionById(int id);
    Task <List<Subscription>> GetSubscriptions();
}
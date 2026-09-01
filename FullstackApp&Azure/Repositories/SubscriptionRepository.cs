using FullstackApp_Azure.Data;
using FullstackApp_Azure.Models;
using FullstackApp_Azure.Repositories.IRepository;
using Microsoft.EntityFrameworkCore;

namespace FullstackApp_Azure.Repositories;

public class SubscriptionRepository : ISubscriptionRepository
{
    private readonly SubscriptionDbContext _context;

    public SubscriptionRepository(SubscriptionDbContext context)
    {
        _context = context;
    }
    
    public async Task<Subscription> GetSubscriptionById(int id)
    {
        return await _context.Subscriptions.FirstOrDefaultAsync(s => s.Id == id);
        
    }

    public async Task<List<Subscription>> GetSubscriptions()
    {
        // AsNoTracking() skips EF's change-tracking overhead
        return await _context.Subscriptions.AsNoTracking().ToListAsync();
    }

    public async Task<Subscription> CreateSubscription(Subscription newSubscription)
    {
        _context.Subscriptions.Add(newSubscription);
        await  _context.SaveChangesAsync();
        return newSubscription;
    }

    public async Task<bool> UpdateSubscription(Subscription subscription)
    {
        _context.Subscriptions.Update(subscription);
        var result = await _context.SaveChangesAsync();
        return  result > 0;
    }

    public async Task<bool> DeleteSubscription(int subscriptionId)
    {
        var rowsAffected = await _context.Subscriptions.Where(s => s.Id == subscriptionId).ExecuteDeleteAsync();
        return rowsAffected > 0; 
    }
}
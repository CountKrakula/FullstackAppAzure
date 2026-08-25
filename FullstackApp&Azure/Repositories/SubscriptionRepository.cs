using FullstackApp_Azure.Data;
using FullstackApp_Azure.Models;
using FullstackApp_Azure.Repositories.IRepository;
using Microsoft.EntityFrameworkCore;

namespace FullstackApp_Azure.Repositories;

public class SubscriptionRepository : ISubscriptionRepository
{
    private SubscriptionDbContext _context;

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
        return await _context.Subscriptions.ToListAsync();
    }
}
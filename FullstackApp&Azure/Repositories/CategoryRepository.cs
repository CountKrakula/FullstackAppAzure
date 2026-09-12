using FullstackApp_Azure.Data;
using FullstackApp_Azure.Models;
using FullstackApp_Azure.Repositories.IRepository;
using Microsoft.EntityFrameworkCore;

namespace FullstackApp_Azure.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly SubscriptionDbContext _context;

        public CategoryRepository(SubscriptionDbContext context)
        {
            _context = context;
        }

        public async Task<Category> CreateCategory(Category newCategory)
        {
            _context.Categories.Add(newCategory);
            await _context.SaveChangesAsync();
            return newCategory;
        }

        public async Task<List<Category>> GetCategories(string userId)
        {
            return await _context.Categories.AsNoTracking().Where(c => c.UserId == userId).ToListAsync();
        }

        public async Task<Category> GetCategoryById(int id, string userId)
        {
            return await _context.Categories.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
        }
    }
}

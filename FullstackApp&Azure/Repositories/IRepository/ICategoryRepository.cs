using FullstackApp_Azure.Models;

namespace FullstackApp_Azure.Repositories.IRepository
{
    public interface ICategoryRepository
    {
        Task<Category> GetCategoryById(int id, string userId);
        Task<List<Category>> GetCategories(string userId);
        Task<Category> CreateCategory(Category newCategory); 
    }
}

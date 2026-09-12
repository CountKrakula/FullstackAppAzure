using FullstackApp_Azure.DTOs;

namespace FullstackApp_Azure.Services.IServices
{
    public interface ICategoryService
    {
        Task<List<CategoryDTO>> GetCategories(string userId);
        Task<CategoryDTO> GetCategoryById(int id, string userId);
        Task<CategoryDTO> CreateCategory(CreateCategoryDTO newCategory, string userId);
    }
}

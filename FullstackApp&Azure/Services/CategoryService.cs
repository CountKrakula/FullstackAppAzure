using FullstackApp_Azure.DTOs;
using FullstackApp_Azure.Models;
using FullstackApp_Azure.Repositories;
using FullstackApp_Azure.Repositories.IRepository;
using FullstackApp_Azure.Services.IServices;

namespace FullstackApp_Azure.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        public async Task<CategoryDTO> CreateCategory(CreateCategoryDTO newCategory, string userId)
        {
            var category = new Category
            {
                UserId = userId,
                Name = newCategory.Name
            };

            var createdCategory = await _categoryRepository.CreateCategory(category);

            return new CategoryDTO
            {
                Id = createdCategory.Id,
                Name = createdCategory.Name
            };
        }

        public async Task<List<CategoryDTO>> GetCategories(string userId)
        {
            var categories = await _categoryRepository.GetCategories(userId);

            return categories.Select(c => new CategoryDTO
            {
                Id = c.Id,
                Name = c.Name
            }).ToList();
        }   

  
        public async Task<CategoryDTO> GetCategoryById(int id, string userId)
        {
            var category = await _categoryRepository.GetCategoryById(id, userId);

            if (category == null)
                return null;

            return new CategoryDTO
            {
                Id = category.Id,
                Name = category.Name
            };
        }
    }
}

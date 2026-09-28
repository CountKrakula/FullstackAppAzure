using FullstackApp_Azure.DTOs;
using FullstackApp_Azure.Services;
using FullstackApp_Azure.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FullstackApp_Azure.Controllers
{

    [Authorize] // 
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly ILogger<CategoryController> _logger;

        public CategoryController(ICategoryService categoryService, ILogger<CategoryController> logger)
        {
            _categoryService = categoryService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<CategoryDTO>>> GetAllCategories()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                _logger.LogWarning("Missing user id claim on authenticated request to {Action}", nameof(GetAllCategories));
                return Unauthorized();
            }

            var categories = await _categoryService.GetCategories(userId);
            return Ok(categories);
        }


        [HttpGet]
        [Route("{id:int}")] // Route constraint — restricts {id} to only match integers.
        public async Task<ActionResult<CategoryDTO>> GetCategoryById(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                _logger.LogWarning("Missing user id claim on authenticated request to {Action}", nameof(GetCategoryById));
                return Unauthorized();
            }

            var category = await _categoryService.GetCategoryById(id, userId);
            if (category == null)
            {
                _logger.LogDebug("Category {CategoryId} not found for user {UserId}", id, userId);
                return NotFound();
            }

            return Ok(category);

        }

        [HttpPost]
        public async Task<ActionResult<CategoryDTO>> CreateCategory(CreateCategoryDTO newCategory)
        {
            // UserId makes sure that the category is associated with the user who created it.
            // This is important for multi-user applications where each user has their own categories.
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                _logger.LogWarning("Missing user id claim on authenticated request to {Action}", nameof(CreateCategory));
                return Unauthorized();
            }
            ;

            var createdCategory = await _categoryService.CreateCategory(newCategory, userId);

            // CreatedAtAction returns 201 + a Location header pointing to the new resource + the resource itself in the body.
            // nameof(GetCategoryById) gives the method name as a string

            return CreatedAtAction(nameof(GetCategoryById), new { id = createdCategory.Id }, createdCategory);

        }
    }
}

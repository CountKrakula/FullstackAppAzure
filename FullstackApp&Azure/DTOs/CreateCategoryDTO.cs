using System.ComponentModel.DataAnnotations;

namespace FullstackApp_Azure.DTOs
{
    public class CreateCategoryDTO
    {
        [Required] // No empty strings
        [StringLength(100, MinimumLength = 2, ErrorMessage = "String must be between 2 and 100 characters in length.")]
        public string Name { get; set; }
    }
}

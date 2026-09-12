using FullstackApp_Azure.DTOs;
using FullstackApp_Azure.Models;
using FullstackApp_Azure.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FullstackApp_Azure.Controllers
{
    [Authorize] // "Must be logged in" (any authenticated user), the placement means all 5 endpoints require login
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionService _subscriptionService;
        
        public SubscriptionController(ISubscriptionService subscriptionService)
        {
            _subscriptionService = subscriptionService;
        }
        
       
        [HttpGet]
        public async Task<ActionResult<List<SubscriptionDTO>>> GetAllSubscriptions()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();  
            }
            
            var subscriptions = await _subscriptionService.GetSubscriptions(userId);
            return Ok(subscriptions);
        }
        
      
        [HttpGet]
        [Route("{id:int}")] // Route constraint — restricts {id} to only match integers.
        public async Task<ActionResult<SubscriptionDTO>>  GetSubscriptionById(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();
            }

            var subscription = await _subscriptionService.GetSubscriptionById(id, userId);
            if (subscription == null)
                return NotFound();
            
            return Ok(subscription);
            
        }

        [HttpPost]
        public async Task<ActionResult<SubscriptionDTO>> CreateSubscription(CreateSubscriptionDTO newSubscription)
        {
            // UserId makes sure that the subscription is associated with the user who created it.
            // This is important for multi-user applications where each user has their own subscriptions.
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();
            };

            var createdSubscription = await _subscriptionService.CreateSubscription(newSubscription, userId);
            
            // CreatedAtAction returns 201 + a Location header pointing to the new resource + the resource itself in the body.
            // nameof(GetSubscriptionById) gives the method name as a string
           
            return CreatedAtAction(nameof(GetSubscriptionById), new { id = createdSubscription.Id }, createdSubscription);
            
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateSubscription(int id, UpdateSubscriptionDTO subscription)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();
            }
         
            var updated = await _subscriptionService.UpdateSubscription(id, subscription, userId);

            if (!updated)
            {
                return NotFound();
            }
            
            return NoContent();
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteSubscription(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();
            }

            var deleted = await _subscriptionService.DeleteSubscription(id, userId);

            if (!deleted)
            {
                return NotFound();
            }
            
            return NoContent();
        }

    }
}

using FullstackApp_Azure.DTOs;
using FullstackApp_Azure.Models;
using FullstackApp_Azure.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FullstackApp_Azure.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionService _subscriptionService;
        
        public SubscriptionController(ISubscriptionService subscriptionService)
        {
            _subscriptionService = subscriptionService;
        }
        
        [Authorize] // "Must be logged in" (any authenticated user)
        [HttpGet]
        public async Task<ActionResult<List<SubscriptionDTO>>> GetAllSubscriptions()
        {
            var subscriptions = await _subscriptionService.GetSubscriptions();
            return Ok(subscriptions);
        }
        
        [Authorize]  
        [HttpGet]
        [Route("{id:int}")] // Route constraint — restricts {id} to only match integers.
        public async Task<ActionResult<SubscriptionDTO>>  GetSubscriptionById(int id)
        {
            var subscription = await _subscriptionService.GetSubscriptionById(id);
            if (subscription == null)
                return NotFound();
            
            return Ok(subscription);
            
        }

        [HttpPost]
        public async Task<ActionResult<SubscriptionDTO>> CreateSubscription(CreateSubscriptionDTO newSubscription)
        {
            var createdSubscription = await _subscriptionService.CreateSubscription(newSubscription);
            
            // CreatedAtAction returns 201 + a Location header pointing to the new resource + the resource itself in the body.
            // nameof(GetSubscriptionById) gives the method name as a string
            return CreatedAtAction(nameof(GetSubscriptionById), new { id = createdSubscription.Id }, createdSubscription);
            
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateSubscription(int id, UpdateSubscriptionDTO subscription)
        {
            var updated = await _subscriptionService.UpdateSubscription(id, subscription);

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
            var deleted = await _subscriptionService.DeleteSubscription(id);

            if (!deleted)
            {
                return NotFound();
            }
            
            return NoContent();
        }

    }
}

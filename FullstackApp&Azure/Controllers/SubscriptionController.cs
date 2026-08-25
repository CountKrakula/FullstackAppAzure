using FullstackApp_Azure.DTOs;
using FullstackApp_Azure.Models;
using FullstackApp_Azure.Repositories;
using FullstackApp_Azure.Repositories.IRepository;
using FullstackApp_Azure.Services.IServices;
using Microsoft.AspNetCore.Http;
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
        [HttpGet]
        public async Task<ActionResult<List<SubscriptionDTO>>> GetAllSubscriptions()
        {
            var subscriptions = await _subscriptionService.GetSubscriptions();
            return Ok(subscriptions);
        }
        
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<SubscriptionDTO>>  GetSubscriptionById(int id)
        {
            var subscriptions = await _subscriptionService.GetSubscriptionById(id);
            if (subscriptions == null)
                return NotFound();
            
            return Ok(subscriptions);
            
        }

    }
}

using FullstackApp_Azure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FullstackApp_Azure.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        [HttpGet]
        [Route("ActionMovie")]
        public async Task<ActionResult<List<Subscription>>> GetAllSubscriptions()
        {
            await Task.Delay(1000);
            return Ok();
        }
    }
}

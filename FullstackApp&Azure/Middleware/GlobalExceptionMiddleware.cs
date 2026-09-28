using Microsoft.AspNetCore.Mvc;

namespace FullstackApp_Azure.Middleware;

public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            // Full exception (incl. stack trace) goes to the server log only — never to the client.
            // Only the path is logged; query string, headers and body may contain sensitive data.
            _logger.LogError(ex, "Unhandled exception for {Method} {Path}. TraceId: {TraceId}",
                context.Request.Method, context.Request.Path, context.TraceIdentifier);


            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            var problemDetails = new ProblemDetails
            {
                Status = StatusCodes.Status500InternalServerError,
                Title = "Internal Server Error",
                Detail =  "Unexpected server error occured. Please try again later.",
            };
            
            await context.Response.WriteAsJsonAsync(problemDetails);
        }
       
    }
}
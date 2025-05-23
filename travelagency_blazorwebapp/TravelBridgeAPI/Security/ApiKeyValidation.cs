﻿namespace TravelBridgeAPI.Security
{
    public class ApiKeyValidation : IApiKeyValidation
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<ApiKeyValidation> _logger;
        public ApiKeyValidation(IConfiguration configuration, ILogger<ApiKeyValidation> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }
        public bool IsValidApiKey(string userApiKey)
        {
            Console.WriteLine($"userApiKey: {userApiKey}");
            Console.WriteLine("userAPIKeyLength = " + userApiKey.Length);
            
            _logger.LogInformation
                ($"[LOG] Request started: {DateTime.Now}" +
                $" - Validating user-apiKey.");
            if(string.IsNullOrEmpty(userApiKey))
            {
                _logger.LogWarning(
                    $"[LOG] Request started: {DateTime.Now}" +
                    $" - user-apiKey is null or empty.");
                return false;
            }
            Console.WriteLine();
            Console.WriteLine($"userApiKey: {userApiKey}");
            Console.WriteLine("userAPIKeyLength = " + userApiKey.Length);
            Console.WriteLine();

            string? apiKey = _configuration.GetValue<string>(Constants.ApiKeyName);

            
            Console.WriteLine($"apiKey: {apiKey}");
            Console.WriteLine("apiKeyLength = " + apiKey.Length);
            Console.WriteLine();

            if (apiKey == null || apiKey != userApiKey)
            {
                _logger.LogWarning(
                    $"[LOG] Request started: {DateTime.Now}" +
                    $" - user-apiKey != apiKey.");
                return false;
            }
            _logger.LogInformation(
                $"[LOG] Request started: {DateTime.Now}" +
                $" - user-apiKey == apiKey.");    
            return true;
        }
    }
}

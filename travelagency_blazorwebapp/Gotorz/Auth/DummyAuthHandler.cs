using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Text.Encodings.Web;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Gotorz.Auth
{
    // Dummy authentication handler class that enables the use of AuthorizeView in razor components
    public class DummyAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        public DummyAuthHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock)
        : base(options, logger, encoder, clock) { }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            return Task.FromResult(AuthenticateResult.NoResult());
        }
    }
}

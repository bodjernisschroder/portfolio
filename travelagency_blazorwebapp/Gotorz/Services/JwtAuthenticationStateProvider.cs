using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.JSInterop;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

// Class that extends Blazor authentication system with custom provider
public class JwtAuthenticationStateProvider : AuthenticationStateProvider
{
    private readonly IJSRuntime _js;
    private ClaimsPrincipal _user = new(new ClaimsIdentity());

    public JwtAuthenticationStateProvider(IJSRuntime js)
    {
        _js = js;
    }

    // Method that identifies current user,
    // returns the current authentication state based on the token stored in sessionStorage
    // if user is authenticated, returns the _user, 
    // if user is not authenticated, restore token from sessionStorage
    public override async Task<AuthenticationState> GetAuthenticationStateAsync()
    {
        if (_user.Identity?.IsAuthenticated == true)
        {
            return new AuthenticationState(_user);
        }

        try
        {
            var token = await _js.InvokeAsync<string>("sessionStorage.getItem", "authToken");

            if (!string.IsNullOrWhiteSpace(token))
            {
                SetUserFromToken(token);
                Console.WriteLine("✅ Token restored from sessionStorage.");
            }
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine("⚠️ JSInterop unavailable during prerender: " + ex.Message);
        }

        return new AuthenticationState(_user);
    }

    // Parses the JWT and updates _user with claims and role, 
    // and notifies UI
    public void SetUserFromToken(string token)
    {
        var handler = new JwtSecurityTokenHandler();
        var jwt = handler.ReadJwtToken(token);

        // Ensures that the role claim is mapped correctly using the full URL for role claim
        var claims = jwt.Claims.Select(c =>
            c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ? new Claim(ClaimTypes.Role, c.Value)
            : c).ToList();


        var identity = new ClaimsIdentity(claims, "jwt");
        _user = new ClaimsPrincipal(identity);

        Console.WriteLine($"✅ Identity created. IsAuthenticated: {_user.Identity?.IsAuthenticated}, Name: {_user.Identity?.Name}");

        foreach (var claim in claims)
        {
            Console.WriteLine($"🧾 Claim: {claim.Type} = {claim.Value}");
        }


        NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(_user)));
    }

    // Saves the JWT in sessionStorage, 
    // parses and updates the current users id using the SetUserFromToken method
    public async Task MarkUserAsAuthenticated(string token)
    {
        await _js.InvokeVoidAsync("sessionStorage.setItem", "authToken", token);
        SetUserFromToken(token);
    }

    // Attempts to load and parse the token from sessionStorage without causing errors during prerender, 
    // is being used in AppRoot.razor
    public async Task TryLoadUserFromSessionAsync()
    {
        try
        {
            var token = await _js.InvokeAsync<string>("sessionStorage.getItem", "authToken");
            if (!string.IsNullOrWhiteSpace(token))
            {
                SetUserFromToken(token);
            }
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine("⚠️ JSInterop not available yet: " + ex.Message);
        }
    }

    // Clears the token from sessionStorage, 
    // resets _user to an unauthenticated identity, 
    // and notifies the UI
    public async Task LogoutAsync()
    {
        await _js.InvokeVoidAsync("sessionStorage.removeItem", "authToken");
        _user = new ClaimsPrincipal(new ClaimsIdentity());
        NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(_user)));
    }

}
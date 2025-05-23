using Gotorz.Models;

namespace Gotorz.Services
{
    public interface ITravelService
    {
        Task<List<TravelPackage>> SearchTravelPackagesAsync(string from, string to, DateTime departureDate, DateTime returnDate);
    }
}

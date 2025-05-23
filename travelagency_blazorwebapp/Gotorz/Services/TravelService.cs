using Gotorz.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Xml.Linq;

namespace Gotorz.Services
{
    public class TravelService : ITravelService
    {
        private readonly HttpClient _http;
        private readonly IConfiguration _configuration;

        public TravelService(HttpClient http, IConfiguration configuration)
        {
            _http = http;
            _configuration = configuration;
        }

        public async Task<List<TravelPackage>> SearchTravelPackagesAsync(string from, string to, DateTime departureDate, DateTime returnDate)
        {
            // Grabs our API key and base URL from appsettings.json and
            // stores it in local variables for use in our API calls
            string apiKey = _configuration["TravelApi:ApiKey"];
            string baseUrl = _configuration["TravelApi:BaseUrl"];

            // Convert the received DateTime parameters to strings
            // of the correct date format needed for the API calls below
            var departure = departureDate.ToString("yyyy-MM-dd");
            var returnFlight = returnDate.ToString("yyyy-MM-dd");

            // Looks for a header called x-api-key and if it finds it,
            // then it sets it to the API key from our appsettings.json
            if (!_http.DefaultRequestHeaders.Contains("x-api-key"))
            {
                _http.DefaultRequestHeaders.Add("x-api-key", apiKey);
            }

            try
            {
                // First we make a parallel API call for the URLs that don't require any additional input, 
                // besides the four inputs that came directly from the user.

                // Call SearchLocations with the from destination parameter in order to
                // get the Airport ID (BOM.AIRPORT for example) for further API calls
                var urlSearchLocationsFrom =
                    $"{baseUrl}/api/Flight/SearchLocations" +
                    $"?location={Uri.EscapeDataString(from)}" +
                    $"&language=da";
                var searchLocationsFrom = _http.GetFromJsonAsync<SearchLocationsFrom>(urlSearchLocationsFrom);

                Console.BackgroundColor = ConsoleColor.White;
                Console.ForegroundColor = ConsoleColor.Black;
                Console.WriteLine("\nFetching Data From API's:");
                Console.ResetColor();
                Console.ForegroundColor = ConsoleColor.Yellow;

                // Call SearchLocations with the to destination parameter in order to get
                // the Airport ID (BOM.AIRPORT for example) for further API calls
                var urlSearchLocationsTo =
                    $"{baseUrl}/api/Flight/SearchLocations" +
                    $"?location={Uri.EscapeDataString(to)}" +
                    $"&language=da";
                var searchLocationsTo = _http.GetFromJsonAsync<SearchLocationsTo>(urlSearchLocationsTo);

                // Fetch all hotel info with the following URL
                var urlSearchHotelDestination =
                    $"{baseUrl}/api/Hotel/SearchHotelDestination" +
                    $"?location={Uri.EscapeDataString(to)}";
                var searchHotelDestination = _http.GetFromJsonAsync<SearchHotelDestination>(urlSearchHotelDestination);

                //Fetch API data in parallel from the following three
                //sources and store the objects created in local variables
                await Task.WhenAll(searchLocationsFrom, searchLocationsTo, searchHotelDestination);

                var fromAirportInfo = searchLocationsFrom.Result;
                LogApiCallResult("SearchLocationsFrom", fromAirportInfo.data.values.Length, urlSearchLocationsFrom);

                var toAirportInfo = searchLocationsTo.Result;
                LogApiCallResult("SearchLocationsTo", toAirportInfo.data.values.Length, urlSearchLocationsTo);

                var hotelInfo = searchHotelDestination.Result;
                LogApiCallResult("SearchHotelDestination", hotelInfo.data.Length, urlSearchHotelDestination);

                // Use dest_type and dest_id to search for all hotels in the chosen destination
                var urlSearchHotels =
                    $"{baseUrl}/api/Hotel/SearchHotels" +
                    $"?dest_id={Uri.EscapeDataString(hotelInfo.data[0].dest_id)}" +
                    $"&search_type={Uri.EscapeDataString(hotelInfo.data[0].dest_type)}" +
                    $"&arrival={departure}" +
                    $"&departure={returnFlight}";
                var searchHotelsTask = _http.GetFromJsonAsync<SearchHotels>(urlSearchHotels);

                // Build FlightMinPrice API url and fetch data from it.
                // Then deserialize with GetFromJsonAsync and store the object in a local variable
                var urlFlightMinPrice =
                    $"{baseUrl}/api/flight/FlightMinPrice" +
                    $"?from={Uri.EscapeDataString(fromAirportInfo.data.values[0].id)}" +
                    $"&to={Uri.EscapeDataString(toAirportInfo.data.values[0].id)}" +
                    $"&departure={departure}" +
                    $"&returnFlight={returnFlight}";
                var flightMinPriceTask = _http.GetFromJsonAsync<FlightMinPrice>(urlFlightMinPrice);
                
                await Task.WhenAll(flightMinPriceTask, searchHotelsTask);

                var flightMinPrice = flightMinPriceTask.Result;
                LogApiCallResult("FlightMinPrice", flightMinPrice.data.Length, urlFlightMinPrice);

                var searchHotelsInfo = searchHotelsTask.Result;
                LogApiCallResult("SearchHotels", searchHotelsInfo.data.hotels.Length, urlSearchHotels);

                // Now we run all the following APIs in parallel that need the hotelId as a parameter

                var urlSearchHotelPhotos =
                    $"{baseUrl}/api/Hotel/SearchHotelPhotos" +
                    $"?hotelId={searchHotelsInfo.data.hotels[0].hotel_id}";
                var searchHotelPhotosTask = _http.GetFromJsonAsync<SearchHotelPhotos>(urlSearchHotelPhotos);

                // GetAvailability is currently commented out, since we're debugging the API call
                //var urlGetAvailability =
                //    $"{baseUrl}/api/Hotel/SearchRoomAvailability" +
                //    $"?hotel_id={searchHotelsInfo.data.hotels[0].hotel_id}" +
                //    $"&min_date={departure}" +
                //    $"&max_date={returnFlight}";
                //var getAvailabilityTask = _http.GetFromJsonAsync<GetAvailability>(urlGetAvailability);

                var urlSearchDirectFlights =
                    $"{baseUrl}/api/Flight/SearchDirectFlights" +
                    $"?departure={Uri.EscapeDataString(fromAirportInfo.data.values[0].id)}" +
                    $"&arrival={Uri.EscapeDataString(toAirportInfo.data.values[0].id)}" +
                    $"&date={departure}" +
                    $"&sort=best" +
                    $"&cabinClass=economy" +
                    $"&currency=eur";
                var searchDirectFlightsTask = _http.GetFromJsonAsync<SearchDirectFlights>(urlSearchDirectFlights);


                // GetHotelDetails is currently commented out, since we're debugging the API call
                //var urlGetHotelDetails =
                //    $"{baseUrl}/api/Flight/SearchDirectFlights" +
                //    $"?departure={Uri.EscapeDataString(fromAirportInfo.data.values[0].id)}" +
                //    $"&arrival={Uri.EscapeDataString(toAirportInfo.data.values[0].id)}" +
                //    $"&date={departure}" +
                //    $"&sort=best" +
                //    $"&cabinClass=economy" +
                //    $"&currency=eur";
                //var getHotelDetailsTask = _http.GetFromJsonAsync<GetHotelDetails>(urlGetHotelDetails);


                await Task.WhenAll(searchHotelPhotosTask, searchDirectFlightsTask);

                var hotelPhotos = searchHotelPhotosTask.Result;
                LogApiCallResult("SearchHotelPhotos", hotelPhotos.data.Length, urlSearchHotelPhotos);

                //var hotelRoomAvailability = getAvailabilityTask.Result;
                //LogApiCallResult("GetRoomAvailability", hotelRoomAvailability.data.lengthsOfStay.Count, urlGetAvailability);

                var directFlights = searchDirectFlightsTask.Result;
                LogApiCallResult("SearchDirectFlights", directFlights.data.flightOffers.Count, urlSearchDirectFlights);

                var urlSearchFlightDetails =
                    $"{baseUrl}/api/Flight/SearchFlightDetails" +
                    $"?token={directFlights.data.flightOffers[0].token}" +
                    $"&currencyCode=eur";
                var searchFlightDetailsTask = await _http.GetFromJsonAsync<SearchFlightDetails>(urlSearchFlightDetails);
                var searchFlightDetails = searchDirectFlightsTask.Result;
                LogApiCallResult("SearchFlightDetails", searchFlightDetails.data.flightOffers.Count, urlSearchFlightDetails);

                // Check if any of the created objects are null, and if they are then return
                // that no API data was returned, and return an empty travel package instead
                if
                (
                    flightMinPrice?.data == null || flightMinPrice.data.Length == 0 ||
                    fromAirportInfo?.data == null || fromAirportInfo.data.values.Length == 0 ||
                    toAirportInfo?.data == null || toAirportInfo.data.values.Length == 0 ||
                    hotelInfo?.data == null || hotelInfo.data.Length == 0 ||
                    searchHotelsInfo?.data == null || searchHotelsInfo?.data.hotels.Length == 0 ||
                    hotelPhotos?.data == null || hotelPhotos?.data.Length == 0 ||
                    //hotelRoomAvailability?.data == null || hotelRoomAvailability?.data.lengthsOfStay.Count == 0 ||
                    directFlights?.data == null || directFlights?.data.flightOffers.Count == 0 ||
                    searchFlightDetailsTask?.data == null || searchFlightDetails?.data.flightOffers.Count == 0
                )
                {
                    Console.WriteLine("⚠️ No data returned from API.");
                    return new List<TravelPackage>();
                }

                // For the single hotel currently shown in the package deal that people receive,
                // this variable finds the cheapest hotel for use in the package
                var bestHotel = searchHotelsInfo.data.hotels?
                    .Where(h => h?.property?.priceBreakdown?.grossPrice?.value != null)
                    .OrderBy(h => h.property.priceBreakdown.grossPrice.value)
                    .FirstOrDefault();

                // This is where the magic happens. We take all the relevant bits of information
                // from the different API calls and bundle it up into a single TravelPackage
                // that we then send to the SearchResults .razor page for use in the frontend
                var package = new TravelPackage
                {
                    // BASIC INFO
                    FromLocation = fromAirportInfo.data.values[0].name,
                    ToLocation = toAirportInfo.data.values[0].name,
                    DepartureDate = departure,
                    ReturnDate = returnFlight,
                    CurrencyCode = "EUR",

                    // FLIGHT
                    FlightCarrier = directFlights.data.flightOffers[0].segments[0].legs?.FirstOrDefault()?.carriersData?.FirstOrDefault()?.name ?? "Unknown Carrier",
                    FlightDepartureTime = directFlights.data.flightOffers[0].segments[0].departureTime ?? "Unknown Departure",
                    FlightArrivalTime = directFlights.data.flightOffers[0].segments[0].arrivalTime ?? "Unknown Arrival",
                    FlightStops = (directFlights.data.flightOffers[0].segments[0].legs?.Count ?? 1) - 1,
                    FlightDurationMinutes = directFlights.data.flightOffers[0].segments[0].totalTime / 60,
                    FlightPrice = directFlights.data.flightOffers[0].priceBreakdown.total.units
                                + directFlights.data.flightOffers[0].priceBreakdown.total.nanos / 1_000_000_000m,

                    // HOTEL
                    HotelId = bestHotel?.hotel_id ?? 0,
                    HotelName = bestHotel?.property?.name ?? "Unknown Hotel",
                    HotelPhotoUrl = bestHotel?.property?.photoUrls?.FirstOrDefault() ?? "",
                    HotelPrice = (decimal)(bestHotel?.property?.priceBreakdown?.grossPrice?.value ?? 0f),

                    // SUMMARY
                    NumberOfNights = (returnDate - departureDate).Days,
                };

                // Final total package price
                package.TotalPrice = package.FlightPrice + package.HotelPrice;

                // Return the one TravelPackage inside a list
                return new List<TravelPackage> { package };
            }

            // This catch block builds an empty TravelPackage in case the try block fails.
            // This prevents the UI from breaking if the API calls fail
            catch (Exception ex)
            {
                Console.WriteLine($"❌ TravelService error: {ex.Message}");
                return new List<TravelPackage>();
            }
        }

        // Here's a little helper method we made for logging the results of each API call
        private void LogApiCallResult(string apiName, int resultCount, string url)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"API CALL SUCCESSFUL: {apiName} returned {resultCount} result(s)");
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine(url);
            Console.ResetColor();
        }
    }
}

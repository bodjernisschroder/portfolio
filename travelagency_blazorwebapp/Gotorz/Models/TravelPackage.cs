namespace Gotorz.Models
{
    // This model class is where we assemble the Travel Package object
    // for use in the frontend part of the program. It contains properties
    // for all the bits of information we'd like to display to the user
    public class TravelPackage
    {
        //Basic Info
        public string FromLocation { get; set; }
        public string ToLocation { get; set; }
        public string DepartureDate { get; set; }
        public string ReturnDate { get; set; }
        public string CurrencyCode { get; set; } = "EUR";

        // Flight Info
        public FlightMinPriceDatum FlightMinPrice { get; set; }
        public string FlightCarrier { get; set; }
        public string FlightDepartureTime { get; set; }
        public string FlightArrivalTime { get; set; }
        public int FlightStops { get; set; }
        public int FlightDurationMinutes { get; set; }
        public decimal FlightPrice { get; set; }

        // Hotel Info
        public int HotelId { get; set; } 
        public string HotelName { get; set; }
        public string HotelPhotoUrl { get; set; }
        public decimal HotelPrice { get; set; }

        // Summary Info
        public decimal TotalPrice { get; set; }
        public int NumberOfNights { get; set; }
    }
}
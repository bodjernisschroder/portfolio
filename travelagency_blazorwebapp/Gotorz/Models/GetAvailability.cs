namespace Gotorz.Models
{
    public class GetAvailability
    {
        public bool status { get; set; }
        public string message { get; set; }
        public long timestamp { get; set; }
        public GetAvailabilityData data { get; set; }
    }

    public class GetAvailabilityData
    {
        public string currency { get; set; }

        // NEW: use List<LengthsOfStayItem> instead of List<Dictionary>
        public List<LengthsOfStayItem> lengthsOfStay { get; set; }

        public List<AvDatesItem> avDates { get; set; }
    }

    public class LengthsOfStayItem
    {
        [System.Text.Json.Serialization.JsonExtensionData]
        public Dictionary<string, System.Text.Json.JsonElement> Dates { get; set; }
    }

    public class AvDatesItem
    {
        [System.Text.Json.Serialization.JsonExtensionData]
        public Dictionary<string, System.Text.Json.JsonElement> Prices { get; set; }
    }
}

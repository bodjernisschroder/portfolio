using System.Text.Json.Serialization;
namespace Gotorz.Models
{
    public class SearchLocationsTo
    {
        public string id { get; set; }
        public bool status { get; set; }
        public string message { get; set; }
        public long timestamp { get; set; }
        public SearchLocationsToData data { get; set; }
    }

    public class SearchLocationsToData
    {
        public string id { get; set; }
        [JsonPropertyName("$values")]
        public SearchLocationsToValues[] values { get; set; }
    }

    public class SearchLocationsToValues
    {
        public string id { get; set; }
        public string type { get; set; }
        public string name { get; set; }
        public string code { get; set; }
        public string city { get; set; }
        public string cityName { get; set; }
        public string regionName { get; set; }
        public string country { get; set; }
        public string countryName { get; set; }
        public string countryNameShort { get; set; }
        public string photoUri { get; set; }
        public SearchLocationsToDistancetocity distanceToCity { get; set; }
        public string parent { get; set; }
        public object region { get; set; }
    }

    public class SearchLocationsToDistancetocity
    {
        public string id { get; set; }
        public float value { get; set; }
        public string unit { get; set; }
    }
}
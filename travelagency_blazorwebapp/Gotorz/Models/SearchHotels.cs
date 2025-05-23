namespace Gotorz.Models
{
    public class SearchHotels
    {
        public bool status { get; set; }
        public string message { get; set; }
        public long timestamp { get; set; }
        public SearchHotelsData data { get; set; }
    }

    public class SearchHotelsData
    {
        public SearchHotelsHotel[] hotels { get; set; }
    }

    public class SearchHotelsHotel
    {
        public int hotel_id { get; set; } 
        public string accessibilityLabel { get; set; }
        public SearchHotelsProperty property { get; set; }
    }

    public class SearchHotelsProperty
    {
        public string name { get; set; }
        public float latitude { get; set; }
        public float longitude { get; set; }
        public string[] photoUrls { get; set; }
        public SearchHotelsPriceBreakdown priceBreakdown { get; set; }
    }

    public class SearchHotelsPriceBreakdown
    {
        public SearchHotelsGrossPrice grossPrice { get; set; }
    }

    public class SearchHotelsGrossPrice
    {
        public string currency { get; set; }
        public float value { get; set; }
    }
}

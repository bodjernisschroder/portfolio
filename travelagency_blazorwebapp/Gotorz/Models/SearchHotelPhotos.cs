namespace Gotorz.Models
{
    public class SearchHotelPhotos
    {
        public bool status { get; set; }
        public string message { get; set; }
        public long timestamp { get; set; }
        public SearchHotelPhoto[] data { get; set; }
    }

    public class SearchHotelPhoto
    {
        public int id { get; set; }
        public string url { get; set; }
    }
}
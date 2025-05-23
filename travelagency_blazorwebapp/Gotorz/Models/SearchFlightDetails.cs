namespace Gotorz.Models
{
    public class SearchFlightDetails
    {
        public bool status { get; set; }
        public string message { get; set; }
        public long timestamp { get; set; }
        public SearchFlightDetailsData data { get; set; }
    }

    public class SearchFlightDetailsData
    {
        public string token { get; set; }
        public object segments { get; set; }
        public object priceBreakdown { get; set; }
        public object travellerPrices { get; set; }
        public object priceDisplayRequirements { get; set; }
        public object pointOfSale { get; set; }
        public object tripType { get; set; }
        public object offerReference { get; set; }
        public object travellerDataRequirements { get; set; }
        public object bookerDataRequirement { get; set; }
        public object travellers { get; set; }
        public object posMismatch { get; set; }
        public object includedProductsBySegment { get; set; }
        public object includedProducts { get; set; }
        public object extraProducts { get; set; }
        public object offerExtras { get; set; }
        public object ancillaries { get; set; }
        public object brandedFareInfo { get; set; }
        public object appliedDiscounts { get; set; }
        public object offerKeyToHighlight { get; set; }
        public object baggagePolicies { get; set; }
        public object extraProductDisplayRequirements { get; set; }
        public object unifiedPriceBreakdown { get; set; }
        public object carbonEmissions { get; set; }
        public object displayOptions { get; set; }
    }
}
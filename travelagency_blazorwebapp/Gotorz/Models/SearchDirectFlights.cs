namespace Gotorz.Models
{
    public class SearchDirectFlights
    {
        public bool status { get; set; }
        public string message { get; set; }
        public long timestamp { get; set; }
        public SearchDirectFlightsData data { get; set; }
    }

    public class SearchDirectFlightsData
    {
        public SearchDirectFlightsAggregation aggregation { get; set; }
        public List<SearchDirectFlightsOffer> flightOffers { get; set; }
    }

    public class SearchDirectFlightsAggregation
    {
        public int totalCount { get; set; }
        public int filteredTotalCount { get; set; }
        public List<SearchDirectFlightsStop> stops { get; set; }
        public List<SearchDirectFlightsAirline> airlines { get; set; }
        public List<SearchDirectFlightsDepartureInterval> departureIntervals { get; set; }
        public List<SearchDirectFlightsFlightTimes> flightTimes { get; set; }
        public SearchDirectFlightsShortLayoverConnection shortLayoverConnection { get; set; }
        public int durationMin { get; set; }
        public int durationMax { get; set; }
        public SearchDirectFlightsPrice minPrice { get; set; }
        public SearchDirectFlightsPrice minRoundPrice { get; set; }
        public SearchDirectFlightsPrice minPriceFiltered { get; set; }
        public List<SearchDirectFlightsBaggage> baggage { get; set; }
        public SearchDirectFlightsBudget budget { get; set; }
        public SearchDirectFlightsBudget budgetPerAdult { get; set; }
        public List<SearchDirectFlightsDuration> duration { get; set; }
        public List<string> filtersOrder { get; set; }
    }

    public class SearchDirectFlightsStop
    {
        public int numberOfStops { get; set; }
        public int count { get; set; }
        public SearchDirectFlightsPrice minPrice { get; set; }
        public SearchDirectFlightsPrice minPriceRound { get; set; }
    }

    public class SearchDirectFlightsPrice
    {
        public string currencyCode { get; set; }
        public int units { get; set; }
        public int nanos { get; set; }
    }

    public class SearchDirectFlightsAirline
    {
        public string name { get; set; }
        public string logoUrl { get; set; }
        public string iataCode { get; set; }
        public int count { get; set; }
        public SearchDirectFlightsPrice minPrice { get; set; }
    }

    public class SearchDirectFlightsDepartureInterval
    {
        public string start { get; set; }
        public string end { get; set; }
    }

    public class SearchDirectFlightsFlightTimes
    {
        public List<SearchDirectFlightsFlightTimeSlot> arrival { get; set; }
        public List<SearchDirectFlightsFlightTimeSlot> departure { get; set; }
    }

    public class SearchDirectFlightsFlightTimeSlot
    {
        public string start { get; set; }
        public string end { get; set; }
        public int count { get; set; }
    }

    public class SearchDirectFlightsShortLayoverConnection
    {
        public int count { get; set; }
    }

    public class SearchDirectFlightsBaggage
    {
        public string paramName { get; set; }
        public int count { get; set; }
        public bool enabled { get; set; }
        public string baggageType { get; set; }
    }

    public class SearchDirectFlightsBudget
    {
        public string paramName { get; set; }
        public SearchDirectFlightsPrice min { get; set; }
        public SearchDirectFlightsPrice max { get; set; }
    }

    public class SearchDirectFlightsDuration
    {
        public int min { get; set; }
        public int max { get; set; }
        public string durationType { get; set; }
        public bool enabled { get; set; }
        public string paramName { get; set; }
    }

    public class SearchDirectFlightsOffer
    {
        public string token { get; set; }
        public List<SearchDirectFlightsSegment> segments { get; set; }
        public SearchDirectFlightsPriceBreakdown priceBreakdown { get; set; }
        public List<SearchDirectFlightsTravellerPrice> travellerPrices { get; set; }
    }

    public class SearchDirectFlightsSegment
    {
        public SearchDirectFlightsAirport departureAirport { get; set; }
        public SearchDirectFlightsAirport arrivalAirport { get; set; }
        public string departureTime { get; set; }
        public string arrivalTime { get; set; }
        public List<SearchDirectFlightsLeg> legs { get; set; }
        public int totalTime { get; set; }
        public List<SearchDirectFlightsTravellerLuggage> travellerCheckedLuggage { get; set; }
        public List<SearchDirectFlightsTravellerLuggage> travellerCabinLuggage { get; set; }
        public bool isAtolProtected { get; set; }
        public bool showWarningDestinationAirport { get; set; }
        public bool showWarningOriginAirport { get; set; }
    }

    public class SearchDirectFlightsAirport
    {
        public string type { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public string city { get; set; }
        public string cityName { get; set; }
        public string country { get; set; }
        public string countryName { get; set; }
        public string province { get; set; }
    }

    public class SearchDirectFlightsLeg
    {
        public string departureTime { get; set; }
        public string arrivalTime { get; set; }
        public SearchDirectFlightsAirport departureAirport { get; set; }
        public SearchDirectFlightsAirport arrivalAirport { get; set; }
        public string cabinClass { get; set; }
        public SearchDirectFlightsFlightInfo flightInfo { get; set; }
        public List<string> carriers { get; set; }
        public List<SearchDirectFlightsCarrierData> carriersData { get; set; }
        public int totalTime { get; set; }
        public List<object> flightStops { get; set; }
        public List<object> amenities { get; set; }
        public string departureTerminal { get; set; }
        public string arrivalTerminal { get; set; }
    }

    public class SearchDirectFlightsFlightInfo
    {
        public List<object> facilities { get; set; }
        public int flightNumber { get; set; }
        public string planeType { get; set; }
        public SearchDirectFlightsCarrierInfo carrierInfo { get; set; }
    }

    public class SearchDirectFlightsCarrierInfo
    {
        public string operatingCarrier { get; set; }
        public string marketingCarrier { get; set; }
        public string operatingCarrierDisclosureText { get; set; }
    }

    public class SearchDirectFlightsCarrierData
    {
        public string name { get; set; }
        public string code { get; set; }
        public string logo { get; set; }
    }

    public class SearchDirectFlightsTravellerLuggage
    {
        public string travellerReference { get; set; }
        public SearchDirectFlightsLuggageAllowance luggageAllowance { get; set; }
        public bool personalItem { get; set; }
    }

    public class SearchDirectFlightsLuggageAllowance
    {
        public string luggageType { get; set; }
        public string ruleType { get; set; }
        public int maxPiece { get; set; }
        public float maxWeightPerPiece { get; set; }
        public string massUnit { get; set; }
        public float maxTotalWeight { get; set; }
        public SearchDirectFlightsSizeRestrictions sizeRestrictions { get; set; }
    }

    public class SearchDirectFlightsSizeRestrictions
    {
        public float maxLength { get; set; }
        public float maxWidth { get; set; }
        public float maxHeight { get; set; }
        public string sizeUnit { get; set; }
    }

    public class SearchDirectFlightsPriceBreakdown
    {
        public SearchDirectFlightsPrice total { get; set; }
        public SearchDirectFlightsPrice baseFare { get; set; }
        public SearchDirectFlightsPrice fee { get; set; }
        public SearchDirectFlightsPrice tax { get; set; }
        public SearchDirectFlightsPrice totalRounded { get; set; }
        public SearchDirectFlightsPrice discount { get; set; }
        public SearchDirectFlightsPrice totalWithoutDiscount { get; set; }
        public SearchDirectFlightsPrice totalWithoutDiscountRounded { get; set; }
        public List<SearchDirectFlightsCarrierTaxBreakdown> carrierTaxBreakdown { get; set; }
    }

    public class SearchDirectFlightsCarrierTaxBreakdown
    {
        public SearchDirectFlightsCarrierData carrier { get; set; }
        public SearchDirectFlightsPrice avgPerAdult { get; set; }
        public object avgPerChild { get; set; }
        public object avgPerInfant { get; set; }
    }

    public class SearchDirectFlightsTravellerPrice
    {
        public SearchDirectFlightsTravellerPriceBreakdown travellerPriceBreakdown { get; set; }
    }

    public class SearchDirectFlightsTravellerPriceBreakdown
    {
        public SearchDirectFlightsPrice total { get; set; }
        public SearchDirectFlightsPrice baseFare { get; set; }
        public SearchDirectFlightsPrice fee { get; set; }
    }
}
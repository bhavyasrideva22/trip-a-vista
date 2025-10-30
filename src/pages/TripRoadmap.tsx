import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, MapPin, Clock, Users, Plane, Hotel, Utensils, 
  Activity, Car, Phone, Mail, Download, Printer, CheckCircle2,
  Sun, Moon, Coffee, Camera, Waves, Mountain, Building2, 
  Compass, Luggage, Ticket, Shield, CreditCard, ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BookingData {
  name: string;
  email: string;
  date: string;
  travelers: string;
  destination: string;
  price: string;
}

interface DayActivity {
  time: string;
  activity: string;
  description: string;
  icon: React.ReactNode;
  location?: string;
}

interface DayItinerary {
  day: number;
  title: string;
  date: string;
  activities: DayActivity[];
  meals: string[];
  accommodation: string;
}

const TripRoadmap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  useEffect(() => {
    if (location.state) {
      setBookingData(location.state as BookingData);
    } else {
      toast.error("No booking information found");
      setTimeout(() => navigate("/"), 2000);
    }
  }, [location, navigate]);

  const generateItinerary = (destination: string, startDate: string): DayItinerary[] => {
    const start = new Date(startDate);
    const days: DayItinerary[] = [];
    
    const destinationData: Record<string, any> = {
      "Bali": {
        activities: [
          { time: "09:00", activity: "Arrival & Check-in", description: "Transfer from airport to hotel", icon: <Luggage className="h-4 w-4" />, location: "Ngurah Rai Airport → Ubud Resort" },
          { time: "12:00", activity: "Lunch", description: "Traditional Balinese cuisine", icon: <Utensils className="h-4 w-4" /> },
          { time: "14:00", activity: "Monkey Forest Visit", description: "Explore Ubud Monkey Forest Sanctuary", icon: <Activity className="h-4 w-4" />, location: "Ubud Monkey Forest" },
          { time: "18:00", activity: "Sunset at Tegalalang", description: "Rice terraces and dinner", icon: <Sun className="h-4 w-4" />, location: "Tegalalang Rice Terraces" },
        ],
        hotel: "Ubud Luxury Resort & Spa"
      },
      "Paris": {
        activities: [
          { time: "10:00", activity: "Arrival & Check-in", description: "Transfer from Charles de Gaulle Airport", icon: <Luggage className="h-4 w-4" />, location: "CDG Airport → Paris Center" },
          { time: "14:00", activity: "Eiffel Tower Tour", description: "Guided tour of Eiffel Tower", icon: <Building2 className="h-4 w-4" />, location: "Eiffel Tower" },
          { time: "16:00", activity: "Seine River Cruise", description: "Scenic boat tour along the Seine", icon: <Waves className="h-4 w-4" />, location: "Seine River" },
          { time: "19:00", activity: "Dinner Cruise", description: "Fine dining experience", icon: <Utensils className="h-4 w-4" /> },
        ],
        hotel: "Hotel des Invalides - Luxury Collection"
      },
      "Tokyo": {
        activities: [
          { time: "11:00", activity: "Arrival & Check-in", description: "Transfer from Narita Airport", icon: <Luggage className="h-4 w-4" />, location: "Narita Airport → Shibuya" },
          { time: "14:00", activity: "Shibuya Crossing", description: "World's busiest intersection", icon: <Activity className="h-4 w-4" />, location: "Shibuya District" },
          { time: "16:00", activity: "Senso-ji Temple", description: "Ancient Buddhist temple", icon: <Building2 className="h-4 w-4" />, location: "Asakusa" },
          { time: "18:00", activity: "Sushi Dinner", description: "Authentic sushi experience", icon: <Utensils className="h-4 w-4" /> },
        ],
        hotel: "The Ritz-Carlton Tokyo"
      },
      "New York": {
        activities: [
          { time: "10:00", activity: "Arrival & Check-in", description: "Transfer from JFK Airport", icon: <Luggage className="h-4 w-4" />, location: "JFK Airport → Manhattan" },
          { time: "14:00", activity: "Statue of Liberty", description: "Ferry tour to Liberty Island", icon: <Activity className="h-4 w-4" />, location: "Liberty Island" },
          { time: "16:00", activity: "Central Park Walk", description: "Guided walking tour", icon: <Mountain className="h-4 w-4" />, location: "Central Park" },
          { time: "19:00", activity: "Broadway Show", description: "Evening theater performance", icon: <Ticket className="h-4 w-4" />, location: "Broadway" },
        ],
        hotel: "The Plaza New York"
      },
      "Santorini": {
        activities: [
          { time: "12:00", activity: "Arrival & Check-in", description: "Transfer from airport to Oia", icon: <Luggage className="h-4 w-4" />, location: "Thira Airport → Oia" },
          { time: "15:00", activity: "Wine Tasting", description: "Local winery tour", icon: <Coffee className="h-4 w-4" />, location: "Santo Wines" },
          { time: "17:00", activity: "Oia Sunset", description: "Witness famous sunset views", icon: <Sun className="h-4 w-4" />, location: "Oia Village" },
          { time: "20:00", activity: "Greek Dinner", description: "Traditional Greek cuisine", icon: <Utensils className="h-4 w-4" /> },
        ],
        hotel: "Katikies Hotel Oia"
      },
      "Maldives": {
        activities: [
          { time: "13:00", activity: "Arrival & Check-in", description: "Seaplane transfer to resort", icon: <Luggage className="h-4 w-4" />, location: "Velana Airport → Resort" },
          { time: "15:00", activity: "Snorkeling", description: "Coral reef exploration", icon: <Waves className="h-4 w-4" />, location: "House Reef" },
          { time: "17:00", activity: "Spa Treatment", description: "Relaxing overwater spa", icon: <Activity className="h-4 w-4" /> },
          { time: "19:00", activity: "Overwater Dinner", description: "Dining over the lagoon", icon: <Utensils className="h-4 w-4" /> },
        ],
        hotel: "Conrad Maldives Rangali Island"
      }
    };

    const defaultData = {
      activities: [
        { time: "10:00", activity: "Arrival & Check-in", description: "Hotel check-in and welcome", icon: <Luggage className="h-4 w-4" /> },
        { time: "14:00", activity: "City Tour", description: "Guided exploration of the city", icon: <Compass className="h-4 w-4" /> },
        { time: "18:00", activity: "Welcome Dinner", description: "Local cuisine experience", icon: <Utensils className="h-4 w-4" /> },
      ],
      hotel: "Premium Hotel"
    };

    const data = destinationData[destination] || defaultData;

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      
      const dayActivities = i === 0 ? data.activities : [
        { time: "09:00", activity: "Breakfast", description: "Hotel breakfast buffet", icon: <Coffee className="h-4 w-4" /> },
        { time: "10:00", activity: `${destination} Exploration`, description: i === 1 ? "Historical sites tour" : i === 2 ? "Cultural experiences" : i === 3 ? "Adventure activities" : i === 4 ? "Local markets & shopping" : i === 5 ? "Beach/nature activities" : "Free time & relaxation", icon: <Activity className="h-4 w-4" /> },
        { time: "13:00", activity: "Lunch", description: "Local restaurant", icon: <Utensils className="h-4 w-4" /> },
        { time: "15:00", activity: destination === "Bali" ? "Temple Visit" : destination === "Paris" ? "Museum Tour" : destination === "Tokyo" ? "Garden Visit" : destination === "New York" ? "Museum Visit" : destination === "Santorini" ? "Beach Time" : "Water Activities", description: destination === "Bali" ? "Sacred temple tour" : destination === "Paris" ? "Louvre Museum" : destination === "Tokyo" ? "Imperial Gardens" : destination === "New York" ? "MoMA" : destination === "Santorini" ? "Red Beach" : "Water sports", icon: <Camera className="h-4 w-4" /> },
        { time: "19:00", activity: "Dinner", description: "Fine dining experience", icon: <Utensils className="h-4 w-4" /> },
      ];

      if (i === 6) {
        dayActivities.push(
          { time: "11:00", activity: "Check-out", description: "Hotel departure", icon: <Luggage className="h-4 w-4" /> },
          { time: "14:00", activity: "Airport Transfer", description: "Transfer to airport", icon: <Plane className="h-4 w-4" /> }
        );
      }

      days.push({
        day: i + 1,
        title: i === 0 ? "Arrival & Welcome" : i === 6 ? "Departure" : `Day ${i + 1}`,
        date: currentDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        activities: dayActivities as DayActivity[],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: data.hotel
      });
    }

    return days;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success("Trip roadmap will be sent to your email");
  };

  if (!bookingData) {
    return null;
  }

  const itinerary = generateItinerary(bookingData.destination, bookingData.date);
  const endDate = new Date(bookingData.date);
  endDate.setDate(endDate.getDate() + 6);

  const getFlightInfo = (destination: string, date: string, isReturn: boolean = false) => {
    const flightData: Record<string, any> = {
      "Bali": {
        outbound: {
          airline: "Singapore Airlines",
          flight: "SQ" + (681 + Math.floor(Math.random() * 20)),
          departure: { airport: "JFK International", terminal: "Terminal 4", code: "JFK", time: "11:30 AM" },
          arrival: { airport: "Ngurah Rai International", terminal: "Terminal I", code: "DPS", time: "09:15 AM+1" },
          duration: "18h 15m",
          stops: 1,
          aircraft: "Boeing 777-300ER",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
          class: "Economy",
          seat: Math.floor(Math.random() * 40) + 1 + String.fromCharCode(65 + Math.floor(Math.random() * 6))
        },
        return: {
          airline: "Singapore Airlines",
          flight: "SQ" + (682 + Math.floor(Math.random() * 20)),
          departure: { airport: "Ngurah Rai International", terminal: "Terminal I", code: "DPS", time: "10:45 PM" },
          arrival: { airport: "JFK International", terminal: "Terminal 4", code: "JFK", time: "09:30 AM+1" },
          duration: "17h 30m",
          stops: 1,
          aircraft: "Boeing 777-300ER",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
          class: "Economy",
          seat: Math.floor(Math.random() * 40) + 1 + String.fromCharCode(65 + Math.floor(Math.random() * 6))
        }
      },
      "Paris": {
        outbound: {
          airline: "Air France",
          flight: "AF" + (83 + Math.floor(Math.random() * 10)),
          departure: { airport: "JFK International", terminal: "Terminal 1", code: "JFK", time: "10:45 PM" },
          arrival: { airport: "Charles de Gaulle", terminal: "Terminal 2E", code: "CDG", time: "12:30 PM+1" },
          duration: "8h 45m",
          stops: 0,
          aircraft: "Airbus A350",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
          class: "Economy",
          seat: Math.floor(Math.random() * 40) + 1 + String.fromCharCode(65 + Math.floor(Math.random() * 6))
        },
        return: {
          airline: "Air France",
          flight: "AF" + (84 + Math.floor(Math.random() * 10)),
          departure: { airport: "Charles de Gaulle", terminal: "Terminal 2E", code: "CDG", time: "2:20 PM" },
          arrival: { airport: "JFK International", terminal: "Terminal 1", code: "JFK", time: "4:30 PM" },
          duration: "9h 10m",
          stops: 0,
          aircraft: "Airbus A350",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
          class: "Economy",
          seat: Math.floor(Math.random() * 40) + 1 + String.fromCharCode(65 + Math.floor(Math.random() * 6))
        }
      },
      "Tokyo": {
        outbound: {
          airline: "Japan Airlines",
          flight: "JL" + (4 + Math.floor(Math.random() * 10)),
          departure: { airport: "JFK International", terminal: "Terminal 1", code: "JFK", time: "11:15 AM" },
          arrival: { airport: "Narita International", terminal: "Terminal 1", code: "NRT", time: "2:45 PM+1" },
          duration: "14h 30m",
          stops: 0,
          aircraft: "Boeing 787-9",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
          class: "Economy",
          seat: Math.floor(Math.random() * 40) + 1 + String.fromCharCode(65 + Math.floor(Math.random() * 6))
        },
        return: {
          airline: "Japan Airlines",
          flight: "JL" + (3 + Math.floor(Math.random() * 10)),
          departure: { airport: "Narita International", terminal: "Terminal 1", code: "NRT", time: "4:25 PM" },
          arrival: { airport: "JFK International", terminal: "Terminal 1", code: "JFK", time: "3:10 PM" },
          duration: "13h 45m",
          stops: 0,
          aircraft: "Boeing 787-9",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
          class: "Economy",
          seat: Math.floor(Math.random() * 40) + 1 + String.fromCharCode(65 + Math.floor(Math.random() * 6))
        }
      },
      "New York": {
        outbound: {
          airline: "Delta Airlines",
          flight: "DL" + (2847 + Math.floor(Math.random() * 10)),
          departure: { airport: "LAX International", terminal: "Terminal 3", code: "LAX", time: "8:00 AM" },
          arrival: { airport: "JFK International", terminal: "Terminal 4", code: "JFK", time: "4:30 PM" },
          duration: "6h 30m",
          stops: 0,
          aircraft: "Boeing 737-900",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
          class: "Economy",
          seat: Math.floor(Math.random() * 40) + 1 + String.fromCharCode(65 + Math.floor(Math.random() * 6))
        },
        return: {
          airline: "Delta Airlines",
          flight: "DL" + (2848 + Math.floor(Math.random() * 10)),
          departure: { airport: "JFK International", terminal: "Terminal 4", code: "JFK", time: "7:15 AM" },
          arrival: { airport: "LAX International", terminal: "Terminal 3", code: "LAX", time: "10:30 AM" },
          duration: "6h 15m",
          stops: 0,
          aircraft: "Boeing 737-900",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
          class: "Economy",
          seat: Math.floor(Math.random() * 40) + 1 + String.fromCharCode(65 + Math.floor(Math.random() * 6))
        }
      },
      "Santorini": {
        outbound: {
          airline: "Aegean Airlines",
          flight: "A3" + (716 + Math.floor(Math.random() * 10)),
          departure: { airport: "Athens International", terminal: "Terminal A", code: "ATH", time: "9:45 AM" },
          arrival: { airport: "Thira National", terminal: "Main Terminal", code: "JTR", time: "10:45 AM" },
          duration: "11h 20m",
          stops: 1,
          aircraft: "Airbus A320",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
          class: "Economy",
          seat: Math.floor(Math.random() * 40) + 1 + String.fromCharCode(65 + Math.floor(Math.random() * 6))
        },
        return: {
          airline: "Aegean Airlines",
          flight: "A3" + (717 + Math.floor(Math.random() * 10)),
          departure: { airport: "Thira National", terminal: "Main Terminal", code: "JTR", time: "11:30 AM" },
          arrival: { airport: "Athens International", terminal: "Terminal A", code: "ATH", time: "12:25 PM" },
          duration: "10h 45m",
          stops: 1,
          aircraft: "Airbus A320",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
          class: "Economy",
          seat: Math.floor(Math.random() * 40) + 1 + String.fromCharCode(65 + Math.floor(Math.random() * 6))
        }
      },
      "Maldives": {
        outbound: {
          airline: "Emirates",
          flight: "EK" + (203 + Math.floor(Math.random() * 10)),
          departure: { airport: "JFK International", terminal: "Terminal 4", code: "JFK", time: "10:30 PM" },
          arrival: { airport: "Velana International", terminal: "International Terminal", code: "MLE", time: "11:45 PM+2" },
          duration: "12h 45m",
          stops: 1,
          aircraft: "Airbus A380",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
          class: "Economy",
          seat: Math.floor(Math.random() * 40) + 1 + String.fromCharCode(65 + Math.floor(Math.random() * 6))
        },
        return: {
          airline: "Emirates",
          flight: "EK" + (204 + Math.floor(Math.random() * 10)),
          departure: { airport: "Velana International", terminal: "International Terminal", code: "MLE", time: "2:15 AM" },
          arrival: { airport: "JFK International", terminal: "Terminal 4", code: "JFK", time: "4:30 PM+1" },
          duration: "12h 15m",
          stops: 1,
          aircraft: "Airbus A380",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
          class: "Economy",
          seat: Math.floor(Math.random() * 40) + 1 + String.fromCharCode(65 + Math.floor(Math.random() * 6))
        }
      }
    };

    return flightData[destination]?.[isReturn ? "return" : "outbound"] || {
      airline: "TravelWise Airlines",
      flight: "TW" + Math.floor(Math.random() * 9000 + 1000),
      departure: { airport: "Your Local Airport", terminal: "Terminal 1", code: "XXX", time: "10:30 AM" },
      arrival: { airport: `${destination} Airport`, terminal: "Terminal 1", code: "XXX", time: "2:00 PM" },
      duration: "6h 30m",
      stops: 0,
      aircraft: "Boeing 737",
      bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
      class: "Economy",
      seat: "12A"
    };
  };

  const getHotelInfo = (destination: string) => {
    const hotelData: Record<string, any> = {
      "Bali": {
        name: "Ubud Luxury Resort & Spa",
        address: "Jl. Raya Ubud No. 88, Ubud, Bali 80571, Indonesia",
        phone: "+62 361 971759",
        email: "reservations@ubudluxuryresort.com",
        rating: 5,
        roomType: "Deluxe Garden View Room",
        amenities: ["Free WiFi", "Breakfast Included", "Swimming Pool", "Spa & Wellness", "Restaurant", "24/7 Concierge", "Airport Shuttle", "Room Service"],
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        bookingRef: "HTL" + Math.floor(Math.random() * 900000 + 100000),
        cancellationPolicy: "Free cancellation until 7 days before arrival"
      },
      "Paris": {
        name: "Hotel des Invalides - Luxury Collection",
        address: "129 Rue de Grenelle, 75007 Paris, France",
        phone: "+33 1 44 42 38 00",
        email: "reservations@hoteldinvalides.com",
        rating: 5,
        roomType: "Superior City View Room",
        amenities: ["Free WiFi", "Breakfast Included", "Fitness Center", "Business Center", "Restaurant", "Room Service", "Concierge", "Laundry Service"],
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        bookingRef: "HTL" + Math.floor(Math.random() * 900000 + 100000),
        cancellationPolicy: "Free cancellation until 3 days before arrival"
      },
      "Tokyo": {
        name: "The Ritz-Carlton Tokyo",
        address: "9-7-1 Akasaka, Minato City, Tokyo 107-0052, Japan",
        phone: "+81 3 3423 8000",
        email: "reservations.tokyo@ritzcarlton.com",
        rating: 5,
        roomType: "Deluxe City View Room",
        amenities: ["Free WiFi", "Breakfast Included", "Spa", "Fitness Center", "Multiple Restaurants", "Concierge", "Valet Parking", "Room Service"],
        checkIn: "3:00 PM",
        checkOut: "12:00 PM",
        bookingRef: "HTL" + Math.floor(Math.random() * 900000 + 100000),
        cancellationPolicy: "Free cancellation until 5 days before arrival"
      },
      "New York": {
        name: "The Plaza New York",
        address: "768 Fifth Avenue, New York, NY 10019, USA",
        phone: "+1 (212) 759-3000",
        email: "reservations@theplaza.com",
        rating: 5,
        roomType: "Classic Room with City View",
        amenities: ["Free WiFi", "Breakfast Included", "Fitness Center", "Spa", "Multiple Restaurants", "Concierge", "Room Service", "Business Center"],
        checkIn: "4:00 PM",
        checkOut: "12:00 PM",
        bookingRef: "HTL" + Math.floor(Math.random() * 900000 + 100000),
        cancellationPolicy: "Free cancellation until 7 days before arrival"
      },
      "Santorini": {
        name: "Katikies Hotel Oia",
        address: "Oia 847 02, Greece",
        phone: "+30 2286 071401",
        email: "reservations@katikies.com",
        rating: 5,
        roomType: "Superior Suite with Caldera View",
        amenities: ["Free WiFi", "Breakfast Included", "Infinity Pool", "Spa", "Restaurant", "24/7 Concierge", "Room Service", "Private Balcony"],
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        bookingRef: "HTL" + Math.floor(Math.random() * 900000 + 100000),
        cancellationPolicy: "Free cancellation until 14 days before arrival"
      },
      "Maldives": {
        name: "Conrad Maldives Rangali Island",
        address: "Rangali Island, Alifu Dhaalu Atoll, Maldives",
        phone: "+960 668 0629",
        email: "conradmaldives@hilton.com",
        rating: 5,
        roomType: "Water Villa with Private Pool",
        amenities: ["Free WiFi", "Breakfast Included", "Underwater Restaurant", "Spa", "Water Sports", "Multiple Restaurants", "Private Beach", "Room Service"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        bookingRef: "HTL" + Math.floor(Math.random() * 900000 + 100000),
        cancellationPolicy: "Free cancellation until 30 days before arrival"
      }
    };

    return hotelData[destination] || {
      name: "Premium Hotel",
      address: `${destination} City Center`,
      phone: "+1 (555) 000-0000",
      email: "reservations@premiumhotel.com",
      rating: 4,
      roomType: "Standard Room",
      amenities: ["Free WiFi", "Breakfast Included"],
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      bookingRef: "HTL" + Math.floor(Math.random() * 900000 + 100000),
      cancellationPolicy: "Standard cancellation policy applies"
    };
  };

  const flightInfo = {
    outbound: getFlightInfo(bookingData.destination, bookingData.date, false),
    return: getFlightInfo(bookingData.destination, endDate.toISOString().split('T')[0], true)
  };

  const hotelInfo = getHotelInfo(bookingData.destination);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {/* Header Section */}
          <div className="mb-8 print:mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                {bookingData && bookingData.name && bookingData.email ? (
                  <Badge className="mb-3" variant="default">
                    <CheckCircle2 className="mr-2 h-3 w-3" />
                    Booking Information Provided
                  </Badge>
                ) : (
                  <Badge className="mb-3" variant="outline">
                    Preview
                  </Badge>
                )}
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  Your Trip Roadmap
                </h1>
                <p className="text-muted-foreground">
                  Complete itinerary for your {bookingData.destination} adventure
                  {bookingData && bookingData.name && bookingData.email 
                    ? " - Review your trip details before payment"
                    : " - Preview your itinerary"}
                </p>
              </div>
              <div className="flex gap-2 print:hidden">
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
              </div>
            </div>
          </div>

          {/* Trip Overview Card */}
          <Card className="mb-6 print:mb-4">
            <CardHeader>
              <CardTitle>Trip Overview</CardTitle>
              <CardDescription>Your booking details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Destination</p>
                    <p className="font-semibold">{bookingData.destination}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Travel Date</p>
                    <p className="font-semibold">
                      {new Date(bookingData.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })} - {endDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Travelers</p>
                    <p className="font-semibold">{bookingData.travelers} {bookingData.travelers === "1" ? "Person" : "People"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">7 Days & 6 Nights</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flight Information */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-6">Flight Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Plane className="h-5 w-5" />
                      Outbound Flight
                    </CardTitle>
                    <Badge variant="default">{flightInfo.outbound.airline}</Badge>
                  </div>
                  <CardDescription>
                    {new Date(bookingData.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="text-2xl font-bold">{flightInfo.outbound.departure.time}</p>
                        <p className="text-sm text-muted-foreground">{flightInfo.outbound.departure.airport}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{flightInfo.outbound.arrival.time}</p>
                        <p className="text-sm text-muted-foreground">{flightInfo.outbound.arrival.airport}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Flight Number</p>
                        <p className="font-semibold">{flightInfo.outbound.flight}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Booking Reference</p>
                        <p className="font-semibold">{flightInfo.outbound.bookingRef}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Terminal</p>
                        <p className="font-semibold">{flightInfo.outbound.departure.terminal} → {flightInfo.outbound.arrival.terminal}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Duration</p>
                        <p className="font-semibold">{flightInfo.outbound.duration}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Aircraft</p>
                        <p className="font-semibold">{flightInfo.outbound.aircraft}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Class & Seat</p>
                        <p className="font-semibold">{flightInfo.outbound.class} - {flightInfo.outbound.seat}</p>
                      </div>
                    </div>
                    {flightInfo.outbound.stops > 0 && (
                      <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg">
                        <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                          ⚠️ {flightInfo.outbound.stops} Stop{flightInfo.outbound.stops > 1 ? "s" : ""} - Connection flight included
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Plane className="h-5 w-5" />
                      Return Flight
                    </CardTitle>
                    <Badge variant="default">{flightInfo.return.airline}</Badge>
                  </div>
                  <CardDescription>
                    {new Date(endDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="text-2xl font-bold">{flightInfo.return.departure.time}</p>
                        <p className="text-sm text-muted-foreground">{flightInfo.return.departure.airport}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{flightInfo.return.arrival.time}</p>
                        <p className="text-sm text-muted-foreground">{flightInfo.return.arrival.airport}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Flight Number</p>
                        <p className="font-semibold">{flightInfo.return.flight}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Booking Reference</p>
                        <p className="font-semibold">{flightInfo.return.bookingRef}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Terminal</p>
                        <p className="font-semibold">{flightInfo.return.departure.terminal} → {flightInfo.return.arrival.terminal}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Duration</p>
                        <p className="font-semibold">{flightInfo.return.duration}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Aircraft</p>
                        <p className="font-semibold">{flightInfo.return.aircraft}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Class & Seat</p>
                        <p className="font-semibold">{flightInfo.return.class} - {flightInfo.return.seat}</p>
                      </div>
                    </div>
                    {flightInfo.return.stops > 0 && (
                      <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg">
                        <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                          ⚠️ {flightInfo.return.stops} Stop{flightInfo.return.stops > 1 ? "s" : ""} - Connection flight included
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Accommodation */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hotel className="h-5 w-5" />
                  Accommodation Details
                </CardTitle>
                <Badge variant="secondary">Booking Ref: {hotelInfo.bookingRef}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold text-xl mb-1">{hotelInfo.name}</p>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{hotelInfo.address}</p>
                </div>
                <div className="flex items-center gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{hotelInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{hotelInfo.email}</span>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Room Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room Type</span>
                      <span className="font-semibold">{hotelInfo.roomType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-in</span>
                      <span className="font-semibold">
                        {new Date(bookingData.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - {hotelInfo.checkIn}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-out</span>
                      <span className="font-semibold">
                        {endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - {hotelInfo.checkOut}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guests</span>
                      <span className="font-semibold">{bookingData.travelers} {bookingData.travelers === "1" ? "Guest" : "Guests"}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Hotel Amenities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {hotelInfo.amenities.map((amenity: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Separator />
              <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                <p className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-1">Cancellation Policy</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">{hotelInfo.cancellationPolicy}</p>
              </div>
            </CardContent>
          </Card>

          {/* Car Rental Information (if applicable) */}
          {location.state?.travelType === "car-rentals" && (
            <Card className="mb-6 border-blue-200 bg-blue-50/50 dark:bg-blue-950/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Car Rental Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Pick-up Location</p>
                      <p className="font-semibold">{flightInfo.outbound.arrival.airport} Airport</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Drop-off Location</p>
                      <p className="font-semibold">{flightInfo.return.departure.airport} Airport</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Pick-up Date</p>
                      <p className="font-semibold">
                        {new Date(bookingData.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} - 10:00 AM
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Drop-off Date</p>
                      <p className="font-semibold">
                        {endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} - 2:00 PM
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Vehicle Details</p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <span className="font-semibold ml-2">Compact SUV</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Transmission:</span>
                        <span className="font-semibold ml-2">Automatic</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Insurance:</span>
                        <span className="font-semibold ml-2 text-green-600">Full Coverage</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Booking Ref:</span>
                        <span className="font-semibold ml-2">CAR{Math.floor(Math.random() * 900000 + 100000)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Transfers Information */}
          {location.state?.travelType !== "car-rentals" && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Transfers & Transportation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Airport to Hotel Transfer</p>
                      <p className="text-sm text-muted-foreground">
                        Private transfer from {flightInfo.outbound.arrival.airport} to {hotelInfo.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Driver will meet you at Arrivals with a name board
                      </p>
                    </div>
                    <Badge variant="outline">Included</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Hotel to Airport Transfer</p>
                      <p className="text-sm text-muted-foreground">
                        Private transfer from {hotelInfo.name} to {flightInfo.return.departure.airport}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Pickup time will be confirmed 24 hours before departure
                      </p>
                    </div>
                    <Badge variant="outline">Included</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Day-by-Day Itinerary */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-6">Detailed Itinerary</h2>
            <div className="space-y-6">
              {itinerary.map((day, index) => (
                <Card key={day.day}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-3">
                          <Badge variant="default" className="text-lg px-3 py-1">
                            Day {day.day}
                          </Badge>
                          <span>{day.title}</span>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {day.date}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">
                        <Hotel className="h-3 w-3 mr-1" />
                        {day.accommodation}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex gap-4">
                          <div className="flex flex-col items-center pt-1">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                              {activity.time}
                            </div>
                            {actIndex < day.activities.length - 1 && (
                              <div className="w-0.5 h-full bg-border my-2"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-1 text-primary">
                                {activity.icon}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1">{activity.activity}</h4>
                                <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                                {activity.location && (
                                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {activity.location}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Utensils className="h-4 w-4 text-primary" />
                          <span className="font-semibold">Meals Included:</span>
                          <span className="text-muted-foreground">{day.meals.join(", ")}</span>
                        </div>
                        {day.activities.some(a => a.activity.includes("Tour") || a.activity.includes("Visit") || a.activity.includes("Activity")) && (
                          <div className="bg-green-50 dark:bg-green-950/20 p-2 rounded text-xs">
                            <span className="font-semibold text-green-800 dark:text-green-200">✓ Guided tours and activities are pre-booked and confirmed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Important Information */}
          <Card className="mb-6 border-blue-200 bg-blue-50/50 dark:bg-blue-950/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">Travel Documents</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Valid passport (minimum 6 months validity)</li>
                  <li>Travel insurance recommended</li>
                  <li>Visa requirements checked (if applicable)</li>
                  <li>COVID-19 vaccination certificate (if required)</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">What's Included</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Round-trip flights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>6 nights hotel accommodation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Daily breakfast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Airport transfers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Guided tours & activities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>24/7 travel support</span>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Contact & Support</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>Emergency: +1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>support@tripavista.com</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Our support team is available 24/7 during your trip. Save these contacts!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 print:hidden">
            <Button onClick={() => navigate("/")} variant="outline" className="flex-1">
              Back to Home
            </Button>
            {bookingData && bookingData.name && bookingData.email ? (
              <Button 
                onClick={() => navigate("/payment", { state: bookingData })} 
                className="flex-1"
                size="lg"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Proceed to Payment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button onClick={() => navigate("/profile")} className="flex-1">
                View Profile
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TripRoadmap;


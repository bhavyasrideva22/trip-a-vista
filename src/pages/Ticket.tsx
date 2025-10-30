import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Plane, Hotel, Calendar, Users, MapPin, Clock, CheckCircle2,
  Download, Printer, Mail, Phone, Ticket as TicketIcon, QrCode,
  CreditCard, Shield, ArrowRight, Home
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

const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [bookingReference] = useState(`TWV${Date.now().toString().slice(-8)}`);
  const [qrCode] = useState(Math.random().toString(36).substring(2, 15));

  useEffect(() => {
    if (location.state?.bookingData) {
      setBookingData(location.state.bookingData);
    } else if (location.state) {
      setBookingData(location.state as BookingData);
    } else {
      toast.error("No booking information found");
      setTimeout(() => navigate("/"), 2000);
    }
  }, [location, navigate]);

  const getFlightInfo = (destination: string, date: string, isReturn: boolean = false) => {
    const flightData: Record<string, any> = {
      "Bali": {
        outbound: {
          airline: "Singapore Airlines",
          flight: "SQ" + (681 + Math.floor(Math.random() * 20)),
          departure: { airport: "JFK International", terminal: "Terminal 4", code: "JFK", time: "11:30 AM" },
          arrival: { airport: "Ngurah Rai International", terminal: "Terminal I", code: "DPS", time: "09:15 AM+1" },
          duration: "18h 15m",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
        },
        return: {
          airline: "Singapore Airlines",
          flight: "SQ" + (682 + Math.floor(Math.random() * 20)),
          departure: { airport: "Ngurah Rai International", terminal: "Terminal I", code: "DPS", time: "10:45 PM" },
          arrival: { airport: "JFK International", terminal: "Terminal 4", code: "JFK", time: "09:30 AM+1" },
          duration: "17h 30m",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
        }
      },
      "Paris": {
        outbound: {
          airline: "Air France",
          flight: "AF" + (83 + Math.floor(Math.random() * 10)),
          departure: { airport: "JFK International", terminal: "Terminal 1", code: "JFK", time: "10:45 PM" },
          arrival: { airport: "Charles de Gaulle", terminal: "Terminal 2E", code: "CDG", time: "12:30 PM+1" },
          duration: "8h 45m",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
        },
        return: {
          airline: "Air France",
          flight: "AF" + (84 + Math.floor(Math.random() * 10)),
          departure: { airport: "Charles de Gaulle", terminal: "Terminal 2E", code: "CDG", time: "2:20 PM" },
          arrival: { airport: "JFK International", terminal: "Terminal 1", code: "JFK", time: "4:30 PM" },
          duration: "9h 10m",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
        }
      },
      "Tokyo": {
        outbound: {
          airline: "Japan Airlines",
          flight: "JL" + (4 + Math.floor(Math.random() * 10)),
          departure: { airport: "JFK International", terminal: "Terminal 1", code: "JFK", time: "11:15 AM" },
          arrival: { airport: "Narita International", terminal: "Terminal 1", code: "NRT", time: "2:45 PM+1" },
          duration: "14h 30m",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
        },
        return: {
          airline: "Japan Airlines",
          flight: "JL" + (3 + Math.floor(Math.random() * 10)),
          departure: { airport: "Narita International", terminal: "Terminal 1", code: "NRT", time: "4:25 PM" },
          arrival: { airport: "JFK International", terminal: "Terminal 1", code: "JFK", time: "3:10 PM" },
          duration: "13h 45m",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
        }
      },
      "New York": {
        outbound: {
          airline: "Delta Airlines",
          flight: "DL" + (2847 + Math.floor(Math.random() * 10)),
          departure: { airport: "LAX International", terminal: "Terminal 3", code: "LAX", time: "8:00 AM" },
          arrival: { airport: "JFK International", terminal: "Terminal 4", code: "JFK", time: "4:30 PM" },
          duration: "6h 30m",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
        },
        return: {
          airline: "Delta Airlines",
          flight: "DL" + (2848 + Math.floor(Math.random() * 10)),
          departure: { airport: "JFK International", terminal: "Terminal 4", code: "JFK", time: "7:15 AM" },
          arrival: { airport: "LAX International", terminal: "Terminal 3", code: "LAX", time: "10:30 AM" },
          duration: "6h 15m",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
        }
      },
      "Santorini": {
        outbound: {
          airline: "Aegean Airlines",
          flight: "A3" + (716 + Math.floor(Math.random() * 10)),
          departure: { airport: "Athens International", terminal: "Terminal A", code: "ATH", time: "9:45 AM" },
          arrival: { airport: "Thira National", terminal: "Main Terminal", code: "JTR", time: "10:45 AM" },
          duration: "1h 00m",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
        },
        return: {
          airline: "Aegean Airlines",
          flight: "A3" + (717 + Math.floor(Math.random() * 10)),
          departure: { airport: "Thira National", terminal: "Main Terminal", code: "JTR", time: "11:30 AM" },
          arrival: { airport: "Athens International", terminal: "Terminal A", code: "ATH", time: "12:25 PM" },
          duration: "55m",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
        }
      },
      "Maldives": {
        outbound: {
          airline: "Emirates",
          flight: "EK" + (203 + Math.floor(Math.random() * 10)),
          departure: { airport: "JFK International", terminal: "Terminal 4", code: "JFK", time: "10:30 PM" },
          arrival: { airport: "Velana International", terminal: "International Terminal", code: "MLE", time: "11:45 PM+2" },
          duration: "12h 45m",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
        },
        return: {
          airline: "Emirates",
          flight: "EK" + (204 + Math.floor(Math.random() * 10)),
          departure: { airport: "Velana International", terminal: "International Terminal", code: "MLE", time: "2:15 AM" },
          arrival: { airport: "JFK International", terminal: "Terminal 4", code: "JFK", time: "4:30 PM+1" },
          duration: "12h 15m",
          bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
        }
      }
    };

    return flightData[destination]?.[isReturn ? "return" : "outbound"] || {
      airline: "TravelWise Airlines",
      flight: "TW" + Math.floor(Math.random() * 9000 + 1000),
      departure: { airport: "Your Local Airport", terminal: "Terminal 1", code: "XXX", time: "10:30 AM" },
      arrival: { airport: `${destination} Airport`, terminal: "Terminal 1", code: "XXX", time: "2:00 PM" },
      duration: "6h 30m",
      bookingRef: "TW" + Math.floor(Math.random() * 900000 + 100000),
    };
  };

  const getHotelInfo = (destination: string) => {
    const hotelData: Record<string, any> = {
      "Bali": {
        name: "Ubud Luxury Resort & Spa",
        address: "Jl. Raya Ubud No. 88, Ubud, Bali 80571, Indonesia",
        bookingRef: "HTL" + Math.floor(Math.random() * 900000 + 100000),
      },
      "Paris": {
        name: "Hotel des Invalides - Luxury Collection",
        address: "129 Rue de Grenelle, 75007 Paris, France",
        bookingRef: "HTL" + Math.floor(Math.random() * 900000 + 100000),
      },
      "Tokyo": {
        name: "The Ritz-Carlton Tokyo",
        address: "9-7-1 Akasaka, Minato City, Tokyo 107-0052, Japan",
        bookingRef: "HTL" + Math.floor(Math.random() * 900000 + 100000),
      },
      "New York": {
        name: "The Plaza New York",
        address: "768 Fifth Avenue, New York, NY 10019, USA",
        bookingRef: "HTL" + Math.floor(Math.random() * 900000 + 100000),
      },
      "Santorini": {
        name: "Katikies Hotel Oia",
        address: "Oia 847 02, Greece",
        bookingRef: "HTL" + Math.floor(Math.random() * 900000 + 100000),
      },
      "Maldives": {
        name: "Conrad Maldives Rangali Island",
        address: "Rangali Island, Alifu Dhaalu Atoll, Maldives",
        bookingRef: "HTL" + Math.floor(Math.random() * 900000 + 100000),
      }
    };

    return hotelData[destination] || {
      name: "Premium Hotel",
      address: `${destination} City Center`,
      bookingRef: "HTL" + Math.floor(Math.random() * 900000 + 100000),
    };
  };

  if (!bookingData) {
    return null;
  }

  const endDate = new Date(bookingData.date);
  endDate.setDate(endDate.getDate() + 6);
  
  const flightInfo = {
    outbound: getFlightInfo(bookingData.destination, bookingData.date, false),
    return: getFlightInfo(bookingData.destination, endDate.toISOString().split('T')[0], true)
  };

  const hotelInfo = getHotelInfo(bookingData.destination);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success("Ticket will be sent to your email: " + bookingData.email);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8 print:mb-4">
            <div className="flex items-center justify-center gap-2 mb-4 print:hidden">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Booking Confirmed!
              </h1>
            </div>
            <p className="text-muted-foreground mb-6">
              Your travel ticket has been generated. Save or print this page for your records.
            </p>
            <div className="flex gap-4 justify-center print:hidden">
              <Button variant="outline" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Email Ticket
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print Ticket
              </Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </div>

          {/* Main Booking Ticket */}
          <Card className="mb-6 border-2 border-primary/20 print:border-2">
            <CardHeader className="bg-primary/5 print:bg-primary/5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <TicketIcon className="h-6 w-6 text-primary" />
                    E-Ticket
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Booking Reference: <span className="font-bold text-foreground">{bookingReference}</span>
                  </CardDescription>
                </div>
                <div className="text-right print:hidden">
                  <div className="w-24 h-24 bg-white border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
                    <QrCode className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Scan at Check-in</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              {/* Traveler Information */}
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Traveler Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-semibold">{bookingData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">{bookingData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Travelers</p>
                    <p className="font-semibold">{bookingData.travelers} {bookingData.travelers === "1" ? "Person" : "People"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Destination</p>
                    <p className="font-semibold">{bookingData.destination}</p>
                  </div>
                </div>
              </div>

              {/* Outbound Flight Ticket */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Plane className="h-5 w-5 text-primary" />
                    Outbound Flight Ticket
                  </h3>
                  <Badge variant="default">{flightInfo.outbound.airline}</Badge>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-3xl font-bold">{flightInfo.outbound.departure.time}</p>
                      <p className="text-sm font-semibold">{flightInfo.outbound.departure.code}</p>
                      <p className="text-xs text-muted-foreground">{flightInfo.outbound.departure.airport}</p>
                      <p className="text-xs text-muted-foreground mt-1">{flightInfo.outbound.departure.terminal}</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center px-4">
                      <div className="w-full h-0.5 bg-primary/30 mb-2"></div>
                      <p className="text-xs text-muted-foreground mb-1">{flightInfo.outbound.duration}</p>
                      <div className="w-full h-0.5 bg-primary/30"></div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">{flightInfo.outbound.arrival.time}</p>
                      <p className="text-sm font-semibold">{flightInfo.outbound.arrival.code}</p>
                      <p className="text-xs text-muted-foreground">{flightInfo.outbound.arrival.airport}</p>
                      <p className="text-xs text-muted-foreground mt-1">{flightInfo.outbound.arrival.terminal}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Flight Number</p>
                    <p className="font-semibold">{flightInfo.outbound.flight}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Date</p>
                    <p className="font-semibold">
                      {new Date(bookingData.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Booking Reference</p>
                    <p className="font-semibold">{flightInfo.outbound.bookingRef}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Status</p>
                    <Badge className="bg-green-500">Confirmed</Badge>
                  </div>
                </div>
              </div>

              {/* Return Flight Ticket */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Plane className="h-5 w-5 text-primary" />
                    Return Flight Ticket
                  </h3>
                  <Badge variant="default">{flightInfo.return.airline}</Badge>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-3xl font-bold">{flightInfo.return.departure.time}</p>
                      <p className="text-sm font-semibold">{flightInfo.return.departure.code}</p>
                      <p className="text-xs text-muted-foreground">{flightInfo.return.departure.airport}</p>
                      <p className="text-xs text-muted-foreground mt-1">{flightInfo.return.departure.terminal}</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center px-4">
                      <div className="w-full h-0.5 bg-primary/30 mb-2"></div>
                      <p className="text-xs text-muted-foreground mb-1">{flightInfo.return.duration}</p>
                      <div className="w-full h-0.5 bg-primary/30"></div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">{flightInfo.return.arrival.time}</p>
                      <p className="text-sm font-semibold">{flightInfo.return.arrival.code}</p>
                      <p className="text-xs text-muted-foreground">{flightInfo.return.arrival.airport}</p>
                      <p className="text-xs text-muted-foreground mt-1">{flightInfo.return.arrival.terminal}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Flight Number</p>
                    <p className="font-semibold">{flightInfo.return.flight}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Date</p>
                    <p className="font-semibold">
                      {endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Booking Reference</p>
                    <p className="font-semibold">{flightInfo.return.bookingRef}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Status</p>
                    <Badge className="bg-green-500">Confirmed</Badge>
                  </div>
                </div>
              </div>

              {/* Hotel Confirmation */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Hotel className="h-5 w-5 text-primary" />
                    Hotel Confirmation
                  </h3>
                  <Badge variant="secondary">Booking Ref: {hotelInfo.bookingRef}</Badge>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Hotel Name</p>
                      <p className="font-semibold text-lg">{hotelInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Location</p>
                      <p className="font-semibold">{bookingData.destination}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Check-in</p>
                      <p className="font-semibold">
                        {new Date(bookingData.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - 3:00 PM
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Check-out</p>
                      <p className="font-semibold">
                        {endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - 11:00 AM
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-1">Address</p>
                    <p className="font-semibold text-sm">{hotelInfo.address}</p>
                  </div>
                  <div className="pt-2">
                    <Badge className="bg-green-500">Confirmed</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="mb-6 border-blue-200 bg-blue-50/50 dark:bg-blue-950/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p>Keep this ticket accessible during your journey. You may be asked to present it at check-in.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p>Arrive at the airport at least 3 hours before international flights and 2 hours before domestic flights.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p>Hotel check-in requires a valid ID. Early check-in and late check-out are subject to availability.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p>For support, contact us at <strong>support@tripavista.com</strong> or <strong>+1 (555) 123-4567</strong></p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="print:hidden">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Need assistance? Our support team is available 24/7
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Support
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ticket;


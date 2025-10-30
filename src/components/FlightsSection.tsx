import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, MapPin, ArrowRight } from "lucide-react";

interface Flight {
  id: string;
  airline: string;
  flight: string;
  from: { city: string; code: string; time: string };
  to: { city: string; code: string; time: string };
  duration: string;
  price: string;
  stops: number;
  date: string;
}

const flights: Flight[] = [
  {
    id: "1",
    airline: "Singapore Airlines",
    flight: "SQ681",
    from: { city: "New York", code: "JFK", time: "11:30 AM" },
    to: { city: "Bali", code: "DPS", time: "09:15 AM+1" },
    duration: "18h 15m",
    price: "$899",
    stops: 1,
    date: "2024-03-15"
  },
  {
    id: "2",
    airline: "Air France",
    flight: "AF83",
    from: { city: "New York", code: "JFK", time: "10:45 PM" },
    to: { city: "Paris", code: "CDG", time: "12:30 PM+1" },
    duration: "8h 45m",
    price: "$649",
    stops: 0,
    date: "2024-03-20"
  },
  {
    id: "3",
    airline: "Japan Airlines",
    flight: "JL4",
    from: { city: "New York", code: "JFK", time: "11:15 AM" },
    to: { city: "Tokyo", code: "NRT", time: "2:45 PM+1" },
    duration: "14h 30m",
    price: "$1,149",
    stops: 0,
    date: "2024-03-18"
  },
  {
    id: "4",
    airline: "Emirates",
    flight: "EK203",
    from: { city: "New York", code: "JFK", time: "10:30 PM" },
    to: { city: "Maldives", code: "MLE", time: "11:45 PM+2" },
    duration: "12h 45m",
    price: "$1,099",
    stops: 1,
    date: "2024-03-22"
  },
  {
    id: "5",
    airline: "Delta Airlines",
    flight: "DL2847",
    from: { city: "Los Angeles", code: "LAX", time: "8:00 AM" },
    to: { city: "New York", code: "JFK", time: "4:30 PM" },
    duration: "6h 30m",
    price: "$399",
    stops: 0,
    date: "2024-03-16"
  },
  {
    id: "6",
    airline: "Aegean Airlines",
    flight: "A3716",
    from: { city: "Athens", code: "ATH", time: "9:45 AM" },
    to: { city: "Santorini", code: "JTR", time: "10:45 AM" },
    duration: "55m",
    price: "$199",
    stops: 0,
    date: "2024-03-19"
  }
];

const FlightsSection = () => {
  const navigate = useNavigate();

  const handleFlightSelect = (flight: Flight) => {
    navigate("/destinations", {
      state: {
        travelType: "flights",
        destination: flight.to.city,
        departureDate: flight.date
      }
    });
  };

  return (
    <section id="flights" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Flights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing flight deals to your favorite destinations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flights.map((flight) => (
            <Card key={flight.id} className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover animate-scale-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="default">{flight.airline}</Badge>
                  <span className="text-2xl font-bold text-primary">{flight.price}</span>
                </div>

                <div className="space-y-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">{flight.from.time}</p>
                      <p className="text-sm font-semibold">{flight.from.city}</p>
                      <p className="text-xs text-muted-foreground">{flight.from.code}</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center px-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <Clock className="h-3 w-3" />
                        <span>{flight.duration}</span>
                      </div>
                      <div className="w-full h-0.5 bg-primary/30 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2">
                          <ArrowRight className="h-3 w-3 text-primary" />
                        </div>
                      </div>
                      {flight.stops > 0 && (
                        <p className="text-xs text-yellow-600 mt-1">{flight.stops} stop{flight.stops > 1 ? "s" : ""}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{flight.to.time}</p>
                      <p className="text-sm font-semibold">{flight.to.city}</p>
                      <p className="text-xs text-muted-foreground">{flight.to.code}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm pt-4 border-t">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Plane className="h-4 w-4" />
                    <span>{flight.flight}</span>
                  </div>
                  <Badge variant="outline">Round Trip Available</Badge>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={() => handleFlightSelect(flight)}
                >
                  Select Flight
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/destinations", { state: { travelType: "flights" } })}
          >
            View All Flights
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FlightsSection;


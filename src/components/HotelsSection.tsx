import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hotel, Star, MapPin, Wifi, Utensils, Waves, ArrowRight } from "lucide-react";

interface HotelOption {
  id: string;
  name: string;
  location: string;
  destination: string;
  price: string;
  rating: number;
  reviews: number;
  amenities: string[];
  image?: string;
}

const hotels: HotelOption[] = [
  {
    id: "1",
    name: "Ubud Luxury Resort & Spa",
    location: "Ubud, Bali",
    destination: "Bali",
    price: "$189",
    rating: 5,
    reviews: 1234,
    amenities: ["Free WiFi", "Breakfast", "Pool", "Spa"]
  },
  {
    id: "2",
    name: "Hotel des Invalides",
    location: "Paris, France",
    destination: "Paris",
    price: "$299",
    rating: 5,
    reviews: 892,
    amenities: ["Free WiFi", "Breakfast", "Fitness", "Spa"]
  },
  {
    id: "3",
    name: "The Ritz-Carlton Tokyo",
    location: "Tokyo, Japan",
    destination: "Tokyo",
    price: "$449",
    rating: 5,
    reviews: 2156,
    amenities: ["Free WiFi", "Breakfast", "Spa", "Concierge"]
  },
  {
    id: "4",
    name: "The Plaza New York",
    location: "Manhattan, NYC",
    destination: "New York",
    price: "$399",
    rating: 5,
    reviews: 3421,
    amenities: ["Free WiFi", "Breakfast", "Fitness", "Spa"]
  },
  {
    id: "5",
    name: "Katikies Hotel Oia",
    location: "Oia, Santorini",
    destination: "Santorini",
    price: "$349",
    rating: 5,
    reviews: 1543,
    amenities: ["Free WiFi", "Breakfast", "Infinity Pool", "Spa"]
  },
  {
    id: "6",
    name: "Conrad Maldives Rangali",
    location: "Rangali Island",
    destination: "Maldives",
    price: "$599",
    rating: 5,
    reviews: 987,
    amenities: ["Free WiFi", "Breakfast", "Water Villa", "Underwater Restaurant"]
  }
];

const getAmenityIcon = (amenity: string) => {
  if (amenity.toLowerCase().includes("wifi")) return <Wifi className="h-3 w-3" />;
  if (amenity.toLowerCase().includes("breakfast") || amenity.toLowerCase().includes("food")) return <Utensils className="h-3 w-3" />;
  if (amenity.toLowerCase().includes("pool") || amenity.toLowerCase().includes("water")) return <Waves className="h-3 w-3" />;
  return <Star className="h-3 w-3" />;
};

const HotelsSection = () => {
  const navigate = useNavigate();

  const handleHotelSelect = (hotel: HotelOption) => {
    navigate("/destinations", {
      state: {
        travelType: "hotels",
        destination: hotel.destination
      }
    });
  };

  return (
    <section id="hotels" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Top Rated Hotels
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience luxury and comfort at the world's finest hotels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover animate-scale-in">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Hotel className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-bold text-card-foreground">{hotel.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{hotel.location}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < hotel.rating ? "fill-secondary text-secondary" : "text-muted-foreground"}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-card-foreground ml-1">{hotel.rating}</span>
                      <span className="text-sm text-muted-foreground">({hotel.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary mb-1">{hotel.price}</p>
                    <p className="text-xs text-muted-foreground">per night</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground">Amenities:</p>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {getAmenityIcon(amenity)}
                        <span className="ml-1">{amenity}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={() => handleHotelSelect(hotel)}
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/destinations", { state: { travelType: "hotels" } })}
          >
            View All Hotels
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HotelsSection;


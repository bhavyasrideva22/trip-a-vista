import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight, Star, Camera, Waves, Mountain, Building2, Sun } from "lucide-react";
import baliImg from "@/assets/destination-bali.jpg";
import parisImg from "@/assets/destination-paris.jpg";
import tokyoImg from "@/assets/destination-tokyo.jpg";
import newyorkImg from "@/assets/destination-newyork.jpg";
import santoriniImg from "@/assets/destination-santorini.jpg";
import maldivesImg from "@/assets/destination-maldives.jpg";

interface Place {
  id: string;
  name: string;
  location: string;
  image: string;
  highlights: string[];
  icon: React.ReactNode;
  bestTime: string;
  rating: number;
}

const places: Place[] = [
  {
    id: "1",
    name: "Bali",
    location: "Indonesia",
    image: baliImg,
    highlights: ["Rice Terraces", "Temples", "Beaches", "Culture"],
    icon: <Sun className="h-6 w-6" />,
    bestTime: "April - October",
    rating: 4.8
  },
  {
    id: "2",
    name: "Paris",
    location: "France",
    image: parisImg,
    highlights: ["Eiffel Tower", "Louvre", "Seine", "Cuisine"],
    icon: <Building2 className="h-6 w-6" />,
    bestTime: "May - September",
    rating: 4.9
  },
  {
    id: "3",
    name: "Tokyo",
    location: "Japan",
    image: tokyoImg,
    highlights: ["Temples", "Shibuya", "Sushi", "Technology"],
    icon: <Building2 className="h-6 w-6" />,
    bestTime: "March - May, September - November",
    rating: 4.8
  },
  {
    id: "4",
    name: "New York",
    location: "USA",
    image: newyorkImg,
    highlights: ["Statue of Liberty", "Broadway", "Central Park", "Shopping"],
    icon: <Building2 className="h-6 w-6" />,
    bestTime: "April - June, September - November",
    rating: 4.7
  },
  {
    id: "5",
    name: "Santorini",
    location: "Greece",
    image: santoriniImg,
    highlights: ["Sunsets", "Wine", "Beaches", "Architecture"],
    icon: <Sun className="h-6 w-6" />,
    bestTime: "May - October",
    rating: 4.9
  },
  {
    id: "6",
    name: "Maldives",
    location: "Indian Ocean",
    image: maldivesImg,
    highlights: ["Overwater Villas", "Snorkeling", "Spa", "Privacy"],
    icon: <Waves className="h-6 w-6" />,
    bestTime: "November - April",
    rating: 5.0
  }
];

const PlacesSection = () => {
  const navigate = useNavigate();

  const handlePlaceSelect = (place: Place) => {
    navigate("/destinations", {
      state: {
        destination: place.name,
        travelType: "packages"
      }
    });
  };

  return (
    <section id="places" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Top Places to Visit
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore breathtaking destinations around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {places.map((place) => (
            <Card 
              key={place.id} 
              className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover animate-scale-in cursor-pointer"
              onClick={() => handlePlaceSelect(place)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{place.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/90 backdrop-blur-sm rounded-lg">
                      {place.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary-foreground">{place.name}</h3>
                      <div className="flex items-center gap-2 text-primary-foreground/80">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{place.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Best Time to Visit:</p>
                  <Badge variant="secondary">{place.bestTime}</Badge>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2">Highlights:</p>
                  <div className="flex flex-wrap gap-2">
                    {place.highlights.map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Camera className="h-3 w-3 mr-1" />
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button 
                  variant="default" 
                  className="w-full mt-4"
                  onClick={() => handlePlaceSelect(place)}
                >
                  Explore {place.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/destinations")}
          >
            Discover More Places
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PlacesSection;

